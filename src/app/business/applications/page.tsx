'use client';

import AppShell from '@/components/layout/app-shell';
import { useAuth } from '@/lib/auth-context';
import { getMicroInternships, getApplications, getUser, getStudentProfiles, updateApplicationStatus } from '@/lib/queries';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import Avatar from '@/components/ui/avatar';
import { Briefcase } from 'lucide-react';
import { formatINR, formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import { MicroInternship, Application, StudentProfile, User } from '@/types';

export default function BusinessApplicationsPage() {
  return (
    <AppShell>
      <BusinessApplicationsContent />
    </AppShell>
  );
}

function BusinessApplicationsContent() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [students, setStudents] = useState<Record<string, StudentProfile>>({});

  useEffect(() => {
    if (!user?.id) return;
    getMicroInternships().then(async (list) => {
      const mine = list.filter((mi) => mi.businessId === user.id);
      const apps = await getApplications();
      const ids = new Set(mine.map((mi) => mi.id));
      setMyApplications(apps.filter((a) => ids.has(a.microInternshipId)));
    });
  }, [user?.id]);

  useEffect(() => {
    const ids = [...new Set(myApplications.map((a) => a.studentId).filter(Boolean))] as string[];
    Promise.all(ids.map((id) => getUser(id))).then((found) => {
      const map: Record<string, User> = {};
      found.forEach((u) => { if (u) map[u.id] = u; });
      setUsers(map);
    });
    getStudentProfiles().then((list) => {
      const map: Record<string, StudentProfile> = {};
      list.forEach((sp) => { map[sp.userId] = sp; });
      setStudents(map);
    });
  }, [myApplications]);

  if (!user) return null;

  const myProjects: MicroInternship[] = [];

  const handleStatusChange = async (appId: string, status: string) => {
    await updateApplicationStatus(appId, status);
    toast('success', `Application ${status}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Applications</h1>
        <p className="text-sm text-slate-600 mt-1">Manage applications for your projects</p>
      </div>

      {myApplications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No applications received yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {myApplications.map(app => {
            const student = users[app.studentId];
            const project = myProjects.find((mi) => mi.id === app.microInternshipId);
            const studentProfile = students[app.studentId];

            return (
              <Card key={app.id}>
                <CardContent className="flex flex-col sm:flex-row items-start gap-4">
                  <Avatar name={student?.name || 'Unknown'} size="lg" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{student?.name}</p>
                        <p className="text-sm text-slate-500">Applied for: {project?.title}</p>
                      </div>
                      <Badge variant={
                        app.status === 'accepted' ? 'success' :
                        app.status === 'shortlisted' ? 'purple' :
                        app.status === 'rejected' ? 'danger' : 'default'
                      }>
                        {app.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">{app.proposal}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {studentProfile?.skills.slice(0, 4).map(s => (
                        <span key={s} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full">{s}</span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-3">
                      {app.status === 'applied' && (
                        <>
                          <Button size="sm" onClick={() => handleStatusChange(app.id, 'shortlisted')}>Shortlist</Button>
                          <Button size="sm" variant="danger" onClick={() => handleStatusChange(app.id, 'rejected')}>Reject</Button>
                        </>
                      )}
                      {app.status === 'shortlisted' && (
                        <Button size="sm" onClick={() => handleStatusChange(app.id, 'accepted')}>Accept</Button>
                      )}
                      {app.status === 'accepted' && (
                        <Button size="sm" variant="success" onClick={() => handleStatusChange(app.id, 'completed')}>Mark Complete</Button>
                      )}
                      <Button size="sm" variant="outline">View Profile</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
