'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { useAuth } from '@/lib/auth-context';
import { getAllUsers, getAllPayments, getApplications, getCourses, getMicroInternships, getAllSkillSwaps, getReviews } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Users, Briefcase, BookOpen, FolderGit2, DollarSign, TrendingUp } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import Link from 'next/link';
import { User, Application, Course, MicroInternship, SkillSwap, Review, Payment } from '@/types';

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [microInternships, setMicroInternships] = useState<MicroInternship[]>([]);
  const [skillSwaps, setSkillSwaps] = useState<SkillSwap[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
    getAllPayments().then(setPayments);
    getApplications().then(setApplications);
    getCourses().then(setCourses);
    getMicroInternships().then(setMicroInternships);
    getAllSkillSwaps().then(setSkillSwaps);
    getReviews().then(setReviews);
  }, []);

  const students = users.filter((u) => u.role === 'student');
  const businesses = users.filter((u) => u.role === 'business');
  const totalRevenue = payments.reduce((sum: number, p: Payment) => sum + (p.platformFee || 0), 0);
  const completedProjects = applications.filter((a) => a.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-sm text-slate-600 mt-1">Platform overview and management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: students.length, icon: Users, color: 'text-indigo-600 bg-indigo-50', link: '/admin/users' },
          { label: 'Businesses', value: businesses.length, icon: Briefcase, color: 'text-amber-600 bg-amber-50', link: '/admin/users' },
          { label: 'Courses', value: courses.length, icon: BookOpen, color: 'text-emerald-600 bg-emerald-50', link: '/admin/courses' },
          { label: 'Platform Revenue', value: formatINR(totalRevenue), icon: DollarSign, color: 'text-green-600 bg-green-50', link: '/admin/analytics' },
        ].map((stat, i) => (
          <Link key={i} href={stat.link}>
            <Card hover>
              <CardContent className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Recent Users</h2>
              <Link href="/admin/users" className="text-sm text-indigo-600 hover:text-indigo-700">View all</Link>
            </div>
            <div className="space-y-3">
              {users.slice(0, 5).map(u => (
                <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold">
                    {u.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{u.name}</p>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 capitalize">{u.role}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Stats */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Platform Overview</h2>
            <div className="space-y-4">
              {[
                { label: 'Micro-Internships', value: microInternships.length },
                { label: 'Applications', value: applications.length },
                { label: 'Completed Projects', value: completedProjects },
                { label: 'Skill Swaps', value: skillSwaps.length },
                { label: 'Reviews', value: reviews.length },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{item.label}</span>
                  <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
