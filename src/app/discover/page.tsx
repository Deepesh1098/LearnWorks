'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { getStudentProfiles, getUser, getCourses, getProjects, getMicroInternships } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Avatar from '@/components/ui/avatar';
import SkillBadge from '@/components/ui/skill-badge';
import Rating from '@/components/ui/rating';
import { Search, Users, BookOpen, Briefcase, FolderGit2 } from 'lucide-react';
import Link from 'next/link';
import { StudentProfile, User, Course, Project, MicroInternship } from '@/types';

export default function DiscoverPage() {
  return (
    <AppShell>
      <DiscoverContent />
    </AppShell>
  );
}

function DiscoverContent() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'students' | 'courses' | 'projects' | 'internships'>('students');
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [internships, setInternships] = useState<MicroInternship[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});

  useEffect(() => {
    getStudentProfiles().then(setStudents);
    getCourses().then(setCourses);
    getProjects().then(setProjects);
    getMicroInternships().then(setInternships);
  }, []);

  useEffect(() => {
    const ids = [...new Set(students.map((s) => s.userId).filter(Boolean))] as string[];
    Promise.all(ids.map((id) => getUser(id))).then((found) => {
      const map: Record<string, User> = {};
      found.forEach((u) => { if (u) map[u.id] = u; });
      setUsers(map);
    });
  }, [students]);

  const q = query.toLowerCase();

  const studentsFiltered = students.filter(p => {
    const user = users[p.userId];
    if (!user) return false;
    if (!q) return true;
    return user.name.toLowerCase().includes(q) || p.skills.some(s => s.toLowerCase().includes(q)) || (user.headline || '').toLowerCase().includes(q);
  });

  const coursesFiltered = courses.filter(c => {
    if (!q) return true;
    return c.title.toLowerCase().includes(q) || c.skills.some(s => s.toLowerCase().includes(q));
  });

  const projectsFiltered = projects.filter(p => {
    if (!q) return true;
    return p.title.toLowerCase().includes(q) || p.skillsUsed.some(s => s.toLowerCase().includes(q));
  });

  const internshipsFiltered = internships.filter(mi => {
    if (!q) return true;
    return mi.title.toLowerCase().includes(q) || mi.skills.some(s => s.toLowerCase().includes(q));
  });

  const tabs = [
    { id: 'students' as const, label: 'Students', icon: Users, count: studentsFiltered.length },
    { id: 'courses' as const, label: 'Courses', icon: BookOpen, count: coursesFiltered.length },
    { id: 'projects' as const, label: 'Projects', icon: FolderGit2, count: projectsFiltered.length },
    { id: 'internships' as const, label: 'Internships', icon: Briefcase, count: internshipsFiltered.length },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Discover</h1>
        <p className="text-sm text-slate-600 mt-1">Find students, courses, projects, and opportunities</p>
      </div>

      {/* Search */}
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, skill, or keyword..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              tab === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
            <span className="text-xs bg-slate-200 px-1.5 py-0.5 rounded-full">{t.count}</span>
          </button>
        ))}
      </div>

      {/* Results */}
      {tab === 'students' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studentsFiltered.map(p => {
            const user = users[p.userId];
            if (!user) return null;
            return (
              <Link key={p.userId} href={`/u/${user.username}`}>
                <Card hover>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} size="lg" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{user.name}</p>
                        <p className="text-sm text-slate-500 truncate">{user.headline}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {p.skills.slice(0, 4).map(s => <SkillBadge key={s} name={s} />)}
                      {p.skills.length > 4 && <span className="text-xs text-slate-500">+{p.skills.length - 4}</span>}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <Rating value={p.rating} count={p.reviewCount} size="sm" />
                      <span>{p.experienceLevel}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {tab === 'courses' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map(course => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <Card hover>
                <CardContent className="space-y-3">
                  <div className="h-28 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{course.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2">{course.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {course.skills.slice(0, 3).map(s => <SkillBadge key={s} name={s} />)}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {tab === 'projects' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectsFiltered.map(project => {
            const author = users[project.userId];
            return (
              <Card key={project.id} hover>
                <CardContent className="space-y-3">
                  <h3 className="font-semibold text-slate-900">{project.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.skillsUsed.map(s => <SkillBadge key={s} name={s} />)}
                  </div>
                  <p className="text-xs text-slate-500">by {author?.name}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {tab === 'internships' && (
        <div className="grid md:grid-cols-2 gap-4">
          {internships.map(mi => (
            <Link key={mi.id} href="/micro-internships">
              <Card hover>
                <CardContent className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{mi.title}</h3>
                      <p className="text-sm text-slate-500">{mi.businessName}</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-600">₹{mi.budget.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {mi.skills.map(s => <SkillBadge key={s} name={s} />)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{mi.duration}</span>
                    <span>•</span>
                    <span className="capitalize">{mi.difficulty}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
