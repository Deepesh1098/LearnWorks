'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { getMicroInternships, getApplicationsByStudent } from '@/lib/queries';
import { useAuth } from '@/lib/auth-context';
import { MicroInternship, Application } from '@/types';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import SkillBadge from '@/components/ui/skill-badge';
import Modal from '@/components/ui/modal';
import { Briefcase, Clock, IndianRupee, Calendar, Filter, Search } from 'lucide-react';
import { formatINR, getDifficultyColor, getStatusColor, formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';

export default function MicroInternshipsPage() {
  return (
    <AppShell>
      <MicroInternshipsContent />
    </AppShell>
  );
}

function MicroInternshipsContent() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tab, setTab] = useState<'browse' | 'applications'>('browse');
  const [search, setSearch] = useState('');
  const [showApply, setShowApply] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<MicroInternship | null>(null);
  const [internships, setInternships] = useState<MicroInternship[]>([]);
  const [myApplicationsState, setMyApplicationsState] = useState<Application[]>([]);

  useEffect(() => {
    getMicroInternships().then((list) => setInternships(list));
  }, []);

  useEffect(() => {
    if (user?.id) getApplicationsByStudent(user.id).then(setMyApplicationsState);
  }, [user?.id]);

  const myApplications = myApplicationsState;
  const filteredInternships = internships.filter(mi => {
    const matchSearch = !search || mi.title.toLowerCase().includes(search.toLowerCase()) || mi.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchSearch;
  });

  const handleApply = () => {
    toast('success', 'Application submitted!');
    setShowApply(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Micro-Internships</h1>
        <p className="text-sm text-slate-600 mt-1">Short paid projects from real businesses</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setTab('browse')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === 'browse' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
          }`}
        >
          Browse Projects
        </button>
        <button
          onClick={() => setTab('applications')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === 'applications' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
          }`}
        >
          My Applications ({myApplications.length})
        </button>
      </div>

      {tab === 'browse' && (
        <>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects or skills..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredInternships.map(internship => (
              <Card key={internship.id} hover>
                <CardContent className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{internship.title}</h3>
                      <p className="text-sm text-slate-500">{internship.businessName}</p>
                    </div>
                    <Badge variant={getDifficultyColor(internship.difficulty) as 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'}>{internship.difficulty}</Badge>
                  </div>
                  <p className="text-sm text-slate-600">{internship.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {internship.skills.map(s => (
                      <SkillBadge key={s} name={s} />
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-100">
                    <div className="text-center">
                      <Clock className="h-4 w-4 text-slate-400 mx-auto mb-1" />
                      <p className="text-xs font-medium text-slate-900">{internship.duration}</p>
                    </div>
                    <div className="text-center">
                      <IndianRupee className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
                      <p className="text-xs font-medium text-emerald-600">{formatINR(internship.budget)}</p>
                    </div>
                    <div className="text-center">
                      <Calendar className="h-4 w-4 text-slate-400 mx-auto mb-1" />
                      <p className="text-xs font-medium text-slate-900">Due {formatDate(internship.deadline)}</p>
                    </div>
                  </div>
                  {internship.deliverables.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-slate-700 mb-1">Deliverables:</p>
                      <div className="text-xs text-slate-600 space-y-0.5">
                        {internship.deliverables.slice(0, 3).map((d, i) => (
                          <p key={i}>• {d}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  <Button
                    onClick={() => { setSelectedInternship(internship); setShowApply(true); }}
                    className="w-full"
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {tab === 'applications' && (
        <div className="space-y-3">
          {myApplications.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Briefcase className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">No applications yet. Browse projects to get started.</p>
              </CardContent>
            </Card>
          ) : (
            myApplications.map(app => {
              const internship = internships.find(mi => mi.id === app.microInternshipId);
              return (
                <Card key={app.id}>
                  <CardContent className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900">{internship?.title}</p>
                      <p className="text-sm text-slate-500">{internship?.businessName} • {formatINR(internship?.budget || 0)}</p>
                    </div>
                    <Badge variant={getStatusColor(app.status).includes('emerald') ? 'success' : getStatusColor(app.status).includes('purple') ? 'purple' : getStatusColor(app.status).includes('amber') ? 'warning' : 'default'}>
                      {app.status.replace('_', ' ')}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}

      <Modal open={showApply} onClose={() => setShowApply(false)} title="Apply for Project">
        <div className="space-y-4">
          <p className="text-sm text-slate-600">Applying for: <strong>{selectedInternship?.title}</strong></p>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Your Proposal</label>
            <textarea
              rows={4}
              placeholder="Explain why you're a great fit for this project..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Relevant Experience</label>
            <textarea
              rows={2}
              placeholder="Share relevant past work..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowApply(false)}>Cancel</Button>
            <Button onClick={handleApply}>Submit Application</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
