'use client';

import { use, useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { getCourseById } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import ProgressBar from '@/components/ui/progress-bar';
import { ArrowLeft, ArrowRight, CheckCircle2, Play, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Course } from '@/types';

export default function LearnPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  return (
    <AppShell>
      <LearnContent courseId={courseId} />
    </AppShell>
  );
}

function LearnContent({ courseId }: { courseId: string }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['l1', 'l2', 'l3']);

  useEffect(() => {
    getCourseById(courseId).then((c) => setCourse(c));
  }, [courseId]);

  const handleToggleComplete = (lessonId: string) => {
    setCompletedLessons(prev =>
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    );
  };

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Course not found.</p>
      </div>
    );
  }

  const progress = Math.round((completedLessons.length / course.lessons.length) * 100);
  const currentLesson = course.lessons[activeLesson];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href={`/courses/${courseId}`} className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to course
          </Link>
          <h1 className="text-xl font-bold text-slate-900 mt-2">{course.title}</h1>
        </div>
        <div className="hidden sm:block">
          <ProgressBar value={progress} showLabel className="w-48" />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - Lesson List */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Lessons</h3>
              <div className="space-y-1">
                {course.lessons.map((lesson, i) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(i)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors ${
                      activeLesson === i ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {completedLessons.includes(lesson.id) ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        activeLesson === i ? 'border-indigo-500' : 'border-slate-300'
                      }`}>
                        <span className="text-[10px] font-medium">{i + 1}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{lesson.title}</p>
                      <p className="text-xs text-slate-500">{lesson.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {currentLesson && (
            <>
              {/* Video Placeholder */}
              <div className="bg-slate-900 rounded-xl aspect-video flex items-center justify-center relative">
                <div className="text-center">
                  <Play className="h-16 w-16 text-white/80 mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Video: {currentLesson.title}</p>
                </div>
              </div>

              <Card>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">{currentLesson.title}</h2>
                    <Button
                      size="sm"
                      variant={completedLessons.includes(currentLesson.id) ? 'success' : 'outline'}
                      onClick={() => handleToggleComplete(currentLesson.id)}
                    >
                      {completedLessons.includes(currentLesson.id) ? (
                        <><CheckCircle2 className="h-4 w-4" /> Completed</>
                      ) : 'Mark Complete'}
                    </Button>
                  </div>
                  <p className="text-sm text-slate-500">{currentLesson.description}</p>
                  <div className="prose prose-sm max-w-none text-slate-700">
                    <p>{currentLesson.content}</p>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <Button
                      variant="outline"
                      disabled={activeLesson === 0}
                      onClick={() => setActiveLesson(prev => prev - 1)}
                    >
                      <ArrowLeft className="h-4 w-4" /> Previous
                    </Button>
                    <span className="text-sm text-slate-500">
                      Lesson {activeLesson + 1} of {course.lessons.length}
                    </span>
                    <Button
                      disabled={activeLesson === course.lessons.length - 1}
                      onClick={() => setActiveLesson(prev => prev + 1)}
                    >
                      Next <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card>
                <CardContent>
                  <h3 className="font-semibold text-slate-900 mb-3">Resources</h3>
                  <div className="space-y-2">
                    {['Lesson slides (PDF)', 'Practice exercises', 'Reference documentation'].map((resource, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 cursor-pointer">
                        <BookOpen className="h-4 w-4" />
                        {resource}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
