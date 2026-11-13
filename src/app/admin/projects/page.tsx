'use client';

import AppShell from '@/components/layout/app-shell';
import { getMicroInternships, getApplicationsByInternship } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Badge from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { formatINR, formatDate } from '@/lib/utils';
import { MicroInternship, Application } from '@/types';
import { useEffect, useState } from 'react';

export default function AdminProjectsPage() {
  return (
    <AppShell>
      <AdminProjectsContent />
    </AppShell>
  );
}

function AdminProjectsContent() {
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState<MicroInternship[]>([]);
  const [appsByProject, setAppsByProject] = useState<Record<string, Application[]>>({});

  useEffect(() => {
    getMicroInternships().then(async (list) => {
      const filtered = list.filter((p) => !search || p.title.toLowerCase().includes(search.toLowerCase()));
      setProjects(filtered);
      const entries = await Promise.all(filtered.map((p) => getApplicationsByInternship(p.id)));
      const map: Record<string, Application[]> = {};
      filtered.forEach((p, i) => { map[p.id] = entries[i]; });
      setAppsByProject(map);
    });
  }, [search]);


  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
        <p className="text-sm text-slate-600 mt-1">Manage micro-internship projects</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm"
        />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Project</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Business</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Budget</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Applications</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => {
                const apps = appsByProject[p.id] || [];
                return (
                  <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-900">{p.title}</p>
                      <p className="text-xs text-slate-500">{p.duration} • {p.difficulty}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{p.businessName}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{formatINR(p.budget)}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{apps.length}</td>
                    <td className="px-6 py-4">
                      <Badge variant={p.status === 'open' ? 'success' : p.status === 'completed' ? 'info' : 'default'}>
                        {p.status}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
