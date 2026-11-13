'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { getProjectsByUser, getProjects, getUser } from '@/lib/queries';
import { useAuth } from '@/lib/auth-context';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import SkillBadge from '@/components/ui/skill-badge';
import Modal from '@/components/ui/modal';
import { FolderGit2, ExternalLink, GitBranch, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { Project, User } from '@/types';

export default function ProjectsPage() {
  return (
    <AppShell>
      <ProjectsContent />
    </AppShell>
  );
}

function ProjectsContent() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [authors, setAuthors] = useState<Record<string, User>>({});

  useEffect(() => {
    getProjectsByUser(user?.id || '').then(setMyProjects);
  }, [user?.id]);

  useEffect(() => {
    getProjects().then(async (list) => {
      setAllProjects(list);
      const ids = [...new Set(list.map((p) => p.userId).filter(Boolean))] as string[];
      const users = await Promise.all(ids.map((id) => getUser(id)));
      const map: Record<string, User> = {};
      users.forEach((u) => { if (u) map[u.id] = u; });
      setAuthors(map);
    });
  }, []);

  const handleCreate = () => {
    toast('success', 'Project created successfully!');
    setShowCreate(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-600 mt-1">Build your portfolio with real projects</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4" /> New Project
        </Button>
      </div>

      {/* My Projects */}
      {myProjects.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">My Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProjects.map(project => (
              <Card key={project.id} hover>
                <CardContent className="space-y-3">
                  <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                    <FolderGit2 className="h-10 w-10 text-slate-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{project.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.skillsUsed.slice(0, 4).map(s => (
                      <SkillBadge key={s} name={s} />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{project.duration}</span>
                    <span>•</span>
                    <span>{project.role}</span>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-slate-100">
                    {project.repositoryUrl && (
                      <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1">
                        <GitBranch className="h-4 w-4" /> Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" /> Demo
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Projects */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Community Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map(project => {
            const author = authors[project.userId];
            return (
              <Card key={project.id} hover>
                <CardContent className="space-y-3">
                  <div className="h-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <FolderGit2 className="h-10 w-10 text-indigo-300" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{project.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.skillsUsed.slice(0, 3).map(s => (
                      <SkillBadge key={s} name={s} />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-semibold">
                      {author?.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-slate-600">{author?.name}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Project" size="lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Title</label>
            <input type="text" placeholder="My awesome project" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea rows={3} placeholder="Describe your project..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
              <input type="text" placeholder="Full-Stack Developer" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
              <input type="text" placeholder="3 weeks" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Repository URL</label>
              <input type="url" placeholder="https://github.com/..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Demo URL</label>
              <input type="url" placeholder="https://..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create Project</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
