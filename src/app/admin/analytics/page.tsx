'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { getAllUsers, getAllPayments, getApplications, getCourses, getMicroInternships, getReviews, getAllSkillSwaps, getStudentProfiles } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Users, Briefcase, BookOpen, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { User, StudentProfile, Application, Course, MicroInternship, SkillSwap, Review, Payment } from '@/types';

export default function AdminAnalyticsPage() {
  const [students, setStudents] = useState<User[]>([]);
  const [businesses, setBusinesses] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [studentProfiles, setStudentProfiles] = useState<StudentProfile[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [microInternships, setMicroInternships] = useState<MicroInternship[]>([]);
  const [allSkillSwaps, setAllSkillSwaps] = useState<SkillSwap[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getAllUsers().then((users) => {
      setStudents(users.filter((u) => u.role === 'student'));
      setBusinesses(users.filter((u) => u.role === 'business'));
    });
  }, []);

  useEffect(() => {
    getAllPayments().then(setPayments);
  }, []);

  useEffect(() => {
    getApplications().then(setApplications);
  }, []);

  useEffect(() => {
    getStudentProfiles().then(setStudentProfiles);
  }, []);

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  useEffect(() => {
    getMicroInternships().then(setMicroInternships);
  }, []);

  useEffect(() => {
    getAllSkillSwaps().then(setAllSkillSwaps);
  }, []);

  useEffect(() => {
    getReviews().then(setReviews);
  }, []);

  const totalRevenue = payments.reduce((sum, p) => sum + p.platformFee, 0);
  const completedProjects = applications.filter((a) => a.status === 'completed').length;
  const activeStudents = studentProfiles.filter((p) => p.experiencePoints > 0).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-600 mt-1">Platform metrics and insights</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: students.length, color: 'text-indigo-600 bg-indigo-50' },
          { label: 'Businesses', value: businesses.length, color: 'text-amber-600 bg-amber-50' },
          { label: 'Active Students', value: activeStudents, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Platform Revenue', value: formatINR(totalRevenue), color: 'text-green-600 bg-green-50' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Platform Health</h2>
            <div className="space-y-4">
              {[
                { label: 'Courses', value: courses.length, total: 50 },
                { label: 'Micro-Internships', value: microInternships.length, total: 20 },
                { label: 'Applications', value: applications.length, total: 100 },
                { label: 'Skill Swaps', value: allSkillSwaps.length, total: 50 },
                { label: 'Reviews', value: reviews.length, total: 100 },
              ].map((item, i) => {
                const pct = (item.value / item.total) * 100;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600">{item.label}</span>
                      <span className="text-sm font-medium text-slate-900">{item.value}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Completion Rates</h2>
            <div className="space-y-4">
              {[
                { label: 'Course Completion', rate: 45 },
                { label: 'Challenge Pass Rate', rate: 72 },
                { label: 'Micro-Internship Completion', rate: 68 },
                { label: 'SkillSwap Success', rate: 85 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-600">{item.label}</span>
                    <span className="text-sm font-medium text-slate-900">{item.rate}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.rate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Revenue Overview</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Micro-Internship Commissions', amount: formatINR(totalRevenue) },
              { label: 'Course Sales Revenue', amount: formatINR(courses.reduce((sum, c) => sum + (c.price * c.enrollmentCount * 0.1), 0)) },
              { label: 'Total Platform Revenue', amount: formatINR(totalRevenue + courses.reduce((sum, c) => sum + (c.price * c.enrollmentCount * 0.1), 0)) },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-slate-900">{item.amount}</p>
                <p className="text-sm text-slate-500 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
