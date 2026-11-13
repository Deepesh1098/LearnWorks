'use client';

import AppShell from '@/components/layout/app-shell';
import { getCourses } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Badge from '@/components/ui/badge';
import { BookOpen, Search } from 'lucide-react';
import { formatINR, getDifficultyColor } from '@/lib/utils';
import { Course } from '@/types';
import { useEffect, useState } from 'react';

export default function AdminCoursesPage() {
  return (
    <AppShell>
      <AdminCoursesContent />
    </AppShell>
  );
}

function AdminCoursesContent() {
  const [search, setSearch] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses().then((list) => setCourses(list.filter((c) => !search || c.title.toLowerCase().includes(search.toLowerCase()))));
  }, [search]);

  const filteredCourses = courses.filter((c) => !search || c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Courses</h1>
        <p className="text-sm text-slate-600 mt-1">Manage platform courses</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search courses..."
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
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Course</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Instructor</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Price</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Enrollments</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Rating</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map(c => (
                <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{c.title}</p>
                      <p className="text-xs text-slate-500">{c.category}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{c.instructorName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{formatINR(c.price)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{c.enrollmentCount}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{c.rating}</td>
                  <td className="px-6 py-4">
                    <Badge variant={c.status === 'published' ? 'success' : c.status === 'review' ? 'warning' : 'default'}>
                      {c.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
