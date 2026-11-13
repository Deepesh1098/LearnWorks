'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { useAuth } from '@/lib/auth-context';
import { getMicroInternships, getApplicationsByInternship } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import Modal from '@/components/ui/modal';
import { FolderGit2, Plus, Clock, IndianRupee } from 'lucide-react';
import { formatINR, getDifficultyColor } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import { MicroInternship, Application } from '@/types';

export default function BusinessProjectsPage() {
  return (
    <AppShell>
      <BusinessProjectsContent />
    </AppShell>
  );
}

function BusinessProjectsContent() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [myProjects, setMyProjects] = useState<MicroInternship[]>([]);
  const [appsByProject, setAppsByProject] = useState<Record<string, Application[]>>({});

  useEffect(() => {
    if (user?.id) {
      getMicroInternships().then(async (list) => {
        const mine = list.filter((mi) => mi.businessId === user.id);
        setMyProjects(mine);
        const entries = await Promise.all(mine.map((mi) => getApplicationsByInternship(mi.id)));
        const map: Record<string, Application[]> = {};
        mine.forEach((mi, i) => { map[mi.id] = entries[i]; });
        setAppsByProject(map);
      });
    }
  }, [user?.id]);

  if (!user) return null;

  const handleCreate = () => {
    toast('success', 'Project posted successfully!');
    setShowCreate(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-600 mt-1">Manage your micro-internship projects</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4" /> Post Project
        </Button>
      </div>

      {myProjects.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <FolderGit2 className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 mb-4">No projects yet. Post your first micro-internship!</p>
            <Button onClick={() => setShowCreate(true)}>Post a Project</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {myProjects.map(project => {
            const apps = appsByProject[project.id] || [];
            return (
              <Card key={project.id}>
                <CardContent className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{project.title}</h3>
                      <p className="text-sm text-slate-500">{project.duration}</p>
                    </div>
                    <Badge variant={getDifficultyColor(project.difficulty) as 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'}>{project.difficulty}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{project.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" />{formatINR(project.budget)}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{project.duration}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-sm text-slate-500">{apps.length} application{apps.length !== 1 ? 's' : ''}</span>
                    <Button size="sm" variant="outline">Manage</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Post a Project" size="lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Title</label>
            <input type="text" placeholder="e.g., Build a landing page" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea rows={3} placeholder="Describe the project requirements..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Required Skills</label>
              <input type="text" placeholder="React, CSS, HTML" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Difficulty</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
              <input type="text" placeholder="10 days" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Budget (₹)</label>
              <input type="number" placeholder="5000" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Post Project</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
