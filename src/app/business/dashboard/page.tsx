'use client';

import AppShell from '@/components/layout/app-shell';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getBusinessProfile, getMicroInternships, getApplications, getPaymentsByUser, getUser } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { FolderGit2, Users, Briefcase, DollarSign, TrendingUp, CheckCircle2 } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { MicroInternship, Application, Payment, BusinessProfile, User } from '@/types';
import Link from 'next/link';

export default function BusinessDashboardPage() {
  return (
    <AppShell>
      <BusinessDashboardContent />
    </AppShell>
  );
}

function BusinessDashboardContent() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [myProjects, setMyProjects] = useState<MicroInternship[]>([]);
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [totalSpend, setTotalSpend] = useState(0);
  const [users, setUsers] = useState<Record<string, User>>({});

  useEffect(() => {
    if (!user?.id) return;
    getBusinessProfile(user.id).then(setProfile);
    getMicroInternships().then(async (list) => {
      const mine = list.filter((mi) => mi.businessId === user.id);
      setMyProjects(mine);
      const apps = await getApplications();
      const ids = new Set(mine.map((mi) => mi.id));
      setMyApplications(apps.filter((a) => ids.has(a.microInternshipId)));
    });
    getPaymentsByUser(user.id).then((payments) => setTotalSpend(payments.filter((p) => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0)));
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    getUser(user.id).then((u) => { const m: Record<string, User> = {}; if (u) m[u.id] = u; setUsers(m); });
  }, [user?.id]);

  if (!user) return null;

  const shortlisted = myApplications.filter((a) => a.status === 'shortlisted' || a.status === 'accepted');
  const completed = myApplications.filter((a) => a.status === 'completed');

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Business Dashboard</h1>
        <p className="text-sm text-slate-600 mt-1">Welcome, {profile?.companyName || user.name}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Projects', value: myProjects.filter(p => p.status === 'open').length, icon: FolderGit2, color: 'text-indigo-600 bg-indigo-50' },
          { label: 'Applications', value: myApplications.length, icon: Briefcase, color: 'text-blue-600 bg-blue-50' },
          { label: 'Shortlisted', value: shortlisted.length, icon: Users, color: 'text-purple-600 bg-purple-50' },
          { label: 'Total Spend', value: formatINR(totalSpend), icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Your Projects</h2>
              <Link href="/business/projects" className="text-sm text-indigo-600 hover:text-indigo-700">View all</Link>
            </div>
            {myProjects.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">No projects posted yet.</p>
            ) : (
              <div className="space-y-3">
                {myProjects.slice(0, 4).map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <FolderGit2 className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{p.title}</p>
                      <p className="text-xs text-slate-500">{formatINR(p.budget)} • {p.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Recent Applications</h2>
              <Link href="/business/applications" className="text-sm text-indigo-600 hover:text-indigo-700">View all</Link>
            </div>
            {myApplications.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">No applications received yet.</p>
            ) : (
              <div className="space-y-3">
                {myApplications.slice(0, 4).map(app => {
                  const student = users[app.studentId];
                  const project = myProjects.find((mi) => mi.id === app.microInternshipId);
                  return (
                    <div key={app.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold">
                        {student?.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">{student?.name}</p>
                        <p className="text-xs text-slate-500">for {project?.title}</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        app.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                        app.status === 'shortlisted' ? 'bg-purple-100 text-purple-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {app.status.replace('_', ' ')}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Talent Pipeline */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Talent Pipeline</h2>
          <div className="grid grid-cols-5 gap-4">
            {['Applied', 'Shortlisted', 'Accepted', 'In Progress', 'Completed'].map((status, i) => {
              const count = myApplications.filter(a => {
                const map: Record<string, string[]> = {
                  'Applied': ['applied'],
                  'Shortlisted': ['shortlisted'],
                  'Accepted': ['accepted'],
                  'In Progress': ['in_progress'],
                  'Completed': ['completed'],
                };
                return map[status]?.includes(a.status);
              }).length;
              return (
                <div key={status} className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-2xl font-bold text-slate-900">{count}</p>
                  <p className="text-xs text-slate-500 mt-1">{status}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
