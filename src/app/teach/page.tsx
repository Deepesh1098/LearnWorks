'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { useAuth } from '@/lib/auth-context';
import { getCoursesByInstructor } from '@/lib/queries';
import { Course } from '@/types';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import Input from '@/components/ui/input';
import { BookOpen, Plus, DollarSign, Users, Star, ArrowLeft } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import Link from 'next/link';

export default function TeachPage() {
  return (
    <AppShell>
      <TeachContent />
    </AppShell>
  );
}

function TeachContent() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [myCourses, setMyCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (user?.id) getCoursesByInstructor(user.id).then(setMyCourses);
  }, [user?.id]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Teach on LearnWorks</h1>
          <p className="text-sm text-slate-600 mt-1">Create and sell your courses</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4" /> Create Course
        </Button>
      </div>

      {/* Instructor Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Courses', value: myCourses.length, icon: BookOpen },
          { label: 'Total Students', value: myCourses.reduce((sum, c) => sum + c.enrollmentCount, 0), icon: Users },
          { label: 'Avg Rating', value: myCourses.length > 0 ? (myCourses.reduce((sum, c) => sum + c.rating, 0) / myCourses.length).toFixed(1) : '0', icon: Star },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
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

      {/* My Courses */}
      {myCourses.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">My Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myCourses.map(course => (
              <Card key={course.id}>
                <CardContent className="space-y-3">
                  <div className="h-28 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-indigo-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">{course.title}</h3>
                    <Badge variant={course.status === 'published' ? 'success' : course.status === 'review' ? 'warning' : 'default'}>
                      {course.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{course.enrollmentCount} students</span>
                    <span className="font-medium text-slate-900">{formatINR(course.price)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{course.lessons.length} lessons</span>
                    <span className="text-sm text-amber-600">★ {course.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {myCourses.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 mb-4">You haven&apos;t created any courses yet.</p>
            <Button onClick={() => setShowCreate(true)}>Create Your First Course</Button>
          </CardContent>
        </Card>
      )}

      {showCreate && (
        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Create Course</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowCreate(false)}>×</Button>
            </div>
            <Input label="Course Title" placeholder="e.g., React Fundamentals" />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea rows={3} placeholder="Describe your course..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Category" placeholder="Web Development" />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Difficulty</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Duration" placeholder="8 hours" />
              <Input label="Price (₹)" placeholder="499" type="number" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button onClick={() => { toast('success', 'Course created!'); setShowCreate(false); }}>Create Course</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
