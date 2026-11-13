'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { useAuth } from '@/lib/auth-context';
import { getStudentProfile, getEnrollmentsByUser, getApplicationsByStudent, getXPByUser, getNotificationsByUser, getSkillSwapsByUser, getUserSkills } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Avatar from '@/components/ui/avatar';
import Badge from '@/components/ui/badge';
import ProgressBar from '@/components/ui/progress-bar';
import SkillBadge from '@/components/ui/skill-badge';
import { TrendingUp, BookOpen, ArrowLeftRight, Briefcase, Trophy, DollarSign, Star, ArrowRight, Clock, Award } from 'lucide-react';
import Link from 'next/link';
import { StudentProfile, CourseEnrollment, Application, ExperiencePointTransaction, Notification, SkillSwap, Course, MicroInternship } from '@/types';

interface EnrollmentWithCourse extends CourseEnrollment {
  course?: Course;
}

interface ApplicationWithInternship extends Application {
  microInternship?: MicroInternship;
}

export default function DashboardPage() {
  return (
    <AppShell>
      <DashboardContent />
    </AppShell>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [enrollments, setEnrollments] = useState<EnrollmentWithCourse[]>([]);
  const [applications, setApplications] = useState<ApplicationWithInternship[]>([]);
  const [xp, setXp] = useState<ExperiencePointTransaction[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [swaps, setSwaps] = useState<SkillSwap[]>([]);
  const [userSkills, setUserSkills] = useState<{ name: string; type: string }[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    getStudentProfile(user.id).then((p) => setProfile(p as StudentProfile | null));
    getEnrollmentsByUser(user.id).then((rows) => setEnrollments(rows as unknown as EnrollmentWithCourse[]));
    getApplicationsByStudent(user.id).then((rows) => setApplications(rows as unknown as ApplicationWithInternship[]));
    getXPByUser(user.id).then((rows) => setXp(rows as unknown as ExperiencePointTransaction[]));
    getNotificationsByUser(user.id).then((rows) => setNotifications(rows as unknown as Notification[]));
    getSkillSwapsByUser(user.id).then((rows) => setSwaps(rows as unknown as SkillSwap[]));
    getUserSkills(user.id).then((rows) => setUserSkills(rows as unknown as { name: string; type: string }[]));
  }, [user?.id]);

  if (!user) return null;

  const totalXP = xp.reduce((sum, t) => sum + (t.amount || 0), 0);
  const unreadNotifications = notifications.filter((n) => !n.read);
  const knownSkills = userSkills.filter((us) => us.type === 'known').map((us) => us.name);
  const learningSkills = userSkills.filter((us) => us.type === 'learning').map((us) => us.name);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{greeting}, {firstName} 👋</h1>
          <p className="text-sm text-slate-600 mt-1">Here&apos;s your career progress</p>
        </div>
        <Link href="/onboarding" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          Complete your profile →
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Profile', value: `${profile?.profileCompletion || 0}%`, icon: TrendingUp, color: 'text-indigo-600 bg-indigo-50', link: '/portfolio' },
          { label: 'Skill Credits', value: profile?.skillCredits || 0, icon: Award, color: 'text-amber-600 bg-amber-50', link: '/earnings' },
          { label: 'Experience Points', value: `${totalXP} XP`, icon: Star, color: 'text-purple-600 bg-purple-50', link: '/portfolio' },
          { label: 'Applications', value: applications.length, icon: Briefcase, color: 'text-emerald-600 bg-emerald-50', link: '/micro-internships' },
        ].map((stat, i) => (
          <Link key={i} href={stat.link}>
            <Card hover>
              <CardContent className="flex items-center gap-4">
                <div className={`p-2.5 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Current Courses */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Current Courses</h2>
            <Link href="/courses" className="text-sm text-indigo-600 hover:text-indigo-700">View all</Link>
          </div>
          {enrollments.length === 0 ? (
            <Card>
              <CardContent>
                <p className="text-sm text-slate-500 text-center py-4">No courses enrolled yet. Browse courses to get started.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {enrollments.map(enrollment => {
                const course = enrollment.course;
                if (!course) return null;
                return (
                  <Link key={enrollment.id} href={`/learn/${course.id}`}>
                    <Card hover>
                      <CardContent className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900 truncate">{course.title}</p>
                          <p className="text-sm text-slate-500">{course.instructorName}</p>
                          <ProgressBar value={enrollment.progress} className="mt-2" size="sm" />
                        </div>
                        <span className="text-sm font-medium text-slate-600">{enrollment.progress}%</span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Recent Applications */}
          <div className="flex items-center justify-between mt-6">
            <h2 className="text-lg font-semibold text-slate-900">Applications</h2>
            <Link href="/micro-internships" className="text-sm text-indigo-600 hover:text-indigo-700">View all</Link>
          </div>
          {applications.length === 0 ? (
            <Card>
              <CardContent>
                <p className="text-sm text-slate-500 text-center py-4">No applications yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {applications.slice(0, 3).map(app => {
                const internship = app.microInternship;
                return (
                  <Card key={app.id}>
                    <CardContent className="flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">{internship?.title}</p>
                        <p className="text-sm text-slate-500">{internship?.businessName}</p>
                      </div>
                      <Badge variant={app.status === 'accepted' ? 'success' : app.status === 'shortlisted' ? 'purple' : 'default'}>
                        {app.status.replace('_', ' ')}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          <Card>
            <CardContent>
              <h3 className="font-semibold text-slate-900 mb-3">Your Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {knownSkills.map(skill => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>
              <h3 className="font-semibold text-slate-900 mt-4 mb-3">Learning</h3>
              <div className="flex flex-wrap gap-1.5">
                {learningSkills.map(skill => (
                  <SkillBadge key={skill} name={skill} variant="learning" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardContent>
              <h3 className="font-semibold text-slate-900 mb-3">Recent Activity</h3>
              {unreadNotifications.length === 0 ? (
                <p className="text-sm text-slate-500">All caught up!</p>
              ) : (
                <div className="space-y-3">
                  {unreadNotifications.slice(0, 4).map(n => (
                    <Link key={n.id} href={n.link || '#'} className="flex items-start gap-2 group">
                      <div className="h-2 w-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-slate-700 group-hover:text-indigo-600">{n.title}</p>
                        <p className="text-xs text-slate-500">{n.message}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent>
              <h3 className="font-semibold text-slate-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { href: '/skillswap', label: 'Find SkillSwap', icon: ArrowLeftRight },
                  { href: '/courses', label: 'Browse Courses', icon: BookOpen },
                  { href: '/challenges', label: 'Take a Challenge', icon: Trophy },
                  { href: '/micro-internships', label: 'Find Projects', icon: Briefcase },
                ].map(action => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 py-1.5"
                  >
                    <action.icon className="h-4 w-4" />
                    {action.label}
                    <ArrowRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
