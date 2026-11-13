'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { getCourses } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import Rating from '@/components/ui/rating';
import SkillBadge from '@/components/ui/skill-badge';
import { BookOpen, Clock, Users, Search, Filter } from 'lucide-react';
import { formatINR, getDifficultyColor } from '@/lib/utils';
import Link from 'next/link';
import { Course } from '@/types';

export default function CoursesPage() {
  return (
    <AppShell>
      <CoursesContent />
    </AppShell>
  );
}

function CoursesContent() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses().then((c) => setCourses(c));
  }, []);

  const categories = ['all', ...new Set(courses.map(c => c.category))];
  const filtered = courses.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === 'all' || c.category === category;
    const matchDiff = difficulty === 'all' || c.difficulty === difficulty;
    return matchSearch && matchCat && matchDiff;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Courses</h1>
        <p className="text-sm text-slate-600 mt-1">Learn from student instructors and professionals</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses or skills..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
          />
        </div>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All categories' : cat}</option>)}
        </select>
        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
        >
          <option value="all">All levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Course Grid */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No courses found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(course => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <Card hover className="h-full">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="info">{course.category}</Badge>
                    <Badge variant={course.difficulty === 'beginner' ? 'default' : course.difficulty === 'intermediate' ? 'purple' : 'success'}>{course.difficulty}</Badge>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">{course.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {course.skills.map(skill => (
                      <SkillBadge key={skill} name={skill} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</span>
                      <span className="flex items-center gap-1"><Users className="h-4 w-4" />{course.enrollmentCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Rating value={course.rating} size="sm" />
                      <span className="text-sm font-semibold text-slate-900">{course.rating}</span>
                    </div>
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
