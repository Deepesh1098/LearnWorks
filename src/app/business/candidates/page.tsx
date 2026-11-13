'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { useAuth } from '@/lib/auth-context';
import { getStudentProfiles, getUser, getProjects } from '@/lib/queries';
import { calculateCandidateScore } from '@/lib/utils';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import Avatar from '@/components/ui/avatar';
import SkillBadge from '@/components/ui/skill-badge';
import Rating from '@/components/ui/rating';
import { Search, Filter, Star, Briefcase } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { StudentProfile, User, Project } from '@/types';

export default function BusinessCandidatesPage() {
  return (
    <AppShell>
      <BusinessCandidatesContent />
    </AppShell>
  );
}

function BusinessCandidatesContent() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState('all');
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getStudentProfiles().then(setStudents);
    getProjects().then(setProjects);
  }, []);

  useEffect(() => {
    const ids = [...new Set(students.map((s) => s.userId).filter(Boolean))] as string[];
    Promise.all(ids.map((id) => getUser(id))).then((found) => {
      const map: Record<string, User> = {};
      found.forEach((u) => { if (u) map[u.id] = u; });
      setUsers(map);
    });
  }, [students]);

  const allSkills = [...new Set(students.flatMap(p => p.skills))];

  const candidates = students
    .map(p => {
      const u = users[p.userId];
      if (!u) return null;
      const { score, reasons } = calculateCandidateScore(
        ['React', 'HTML', 'CSS'],
        'intermediate',
        p.skills,
        p.experienceLevel,
        p.rating,
        projects.filter((pr) => pr.userId === p.userId).length,
        true
      );
      return { ...p, user: u, matchScore: score, reasons };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null)
    .filter(c => {
      if (!search) return true;
      return c.user.name.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Discover Candidates</h1>
        <p className="text-sm text-slate-600 mt-1">Find the best student talent for your projects</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or skill..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm"
          />
        </div>
        <select
          value={skillFilter}
          onChange={e => setSkillFilter(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
        >
          <option value="all">All Skills</option>
          {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {candidates.map(c => (
          <Card key={c.userId} hover>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={c.user.name} size="lg" />
                  <div>
                    <p className="font-semibold text-slate-900">{c.user.name}</p>
                    <p className="text-sm text-slate-500">{c.user.headline}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">{c.matchScore}%</div>
                  <p className="text-[10px] text-slate-500">match</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {c.skills.slice(0, 4).map(s => <SkillBadge key={s} name={s} />)}
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <Rating value={c.rating} count={c.reviewCount} size="sm" />
                <span className="capitalize">{c.experienceLevel}</span>
                <span>{c.experiencePoints} XP</span>
              </div>

              <div className="space-y-1">
                {c.reasons.slice(0, 3).map((r, i) => (
                  <p key={i} className="text-xs text-emerald-600 flex items-center gap-1">
                    <Star className="h-3 w-3" /> {r}
                  </p>
                ))}
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <Button size="sm" className="flex-1" onClick={() => toast('success', `Shortlisted ${c.user.name}`)}>
                  Shortlist
                </Button>
                <Button size="sm" variant="outline">Profile</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
