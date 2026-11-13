'use client';

import { use, useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { getCourseById, getEnrollmentsByUser, getReviews } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import Rating from '@/components/ui/rating';
import SkillBadge from '@/components/ui/skill-badge';
import { BookOpen, Clock, Users, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { formatINR, getDifficultyColor } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Course, CourseEnrollment, Review } from '@/types';
import Link from 'next/link';

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <AppShell>
      <CourseDetailContent courseId={id} />
    </AppShell>
  );
}

function CourseDetailContent({ courseId }: { courseId: string }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<CourseEnrollment | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getCourseById(courseId).then((c) => setCourse(c));
    getEnrollmentsByUser(user?.id || '').then((rows) => setEnrollment(rows.find((e) => e.courseId === courseId) || null));
    getReviews('course').then((r) => setReviews(r));
  }, [courseId, user?.id]);

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Course not found.</p>
        <Link href="/courses" className="text-indigo-600 hover:text-indigo-700 text-sm mt-2 inline-block">Back to courses</Link>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!user) return;
    toast('success', `Enrolled in ${course.title}!`);
    router.push(`/learn/${courseId}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Link href="/courses" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" /> Back to courses
      </Link>

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="info" className="bg-white/20 text-white border-white/30">{course.difficulty}</Badge>
              <span className="text-sm text-white/70">{course.category}</span>
            </div>
            <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
            <p className="text-white/80 mb-4">{course.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {course.skills.map(s => (
                <span key={s} className="px-2.5 py-1 bg-white/20 text-white text-sm rounded-full">{s}</span>
              ))}
            </div>
            <div className="flex items-center gap-6 text-sm text-white/70">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" />{course.enrollmentCount} students</span>
              <Rating value={course.rating} count={course.reviewCount} />
            </div>
          </div>
          <div className="lg:w-72">
            <Card className="bg-white">
              <CardContent className="space-y-4">
                <p className="text-3xl font-bold text-slate-900">{course.price === 0 ? 'Free' : formatINR(course.price)}</p>
                {enrollment ? (
                  <Link href={`/learn/${courseId}`}>
                    <Button className="w-full">Continue Learning</Button>
                  </Link>
                ) : (
                  <Button onClick={handleEnroll} className="w-full">Enroll Now</Button>
                )}
                <div className="text-sm text-slate-600 space-y-2">
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />{course.lessons.length} lessons</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />Certificate of completion</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" />Lifetime access</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Instructor */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Instructor</h2>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
              {course.instructorName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-medium text-slate-900">{course.instructorName}</p>
              <p className="text-sm text-slate-500">Instructor</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Curriculum */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Curriculum</h2>
          <div className="space-y-3">
            {course.lessons.map((lesson, i) => (
              <div key={lesson.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900">{lesson.title}</p>
                  <p className="text-sm text-slate-500">{lesson.description}</p>
                </div>
                <span className="text-sm text-slate-500 flex-shrink-0">{lesson.duration}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
