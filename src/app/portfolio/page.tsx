'use client';

import AppShell from '@/components/layout/app-shell';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getStudentProfile, getProjectsByUser, getCertificatesByUser, getReviewsByUser, getXPByUser, getUser } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Avatar from '@/components/ui/avatar';
import Badge from '@/components/ui/badge';
import SkillBadge from '@/components/ui/skill-badge';
import Rating from '@/components/ui/rating';
import ProgressBar from '@/components/ui/progress-bar';
import { FolderGit2, BookOpen, Award, Star, Briefcase, MapPin, Edit } from 'lucide-react';
import { StudentProfile, Project, Certificate, Review, ExperiencePointTransaction, User } from '@/types';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <AppShell>
      <PortfolioContent />
    </AppShell>
  );
}

function PortfolioContent() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [xp, setXp] = useState<ExperiencePointTransaction[]>([]);
  const [reviewers, setReviewers] = useState<Record<string, User>>({});

  useEffect(() => {
    if (!user?.id) return;
    getStudentProfile(user.id).then(setProfile);
    getProjectsByUser(user.id).then(setProjects);
    getCertificatesByUser(user.id).then(setCertificates);
    getReviewsByUser(user.id).then(setReviews);
    getXPByUser(user.id).then(setXp);
  }, [user?.id]);

  useEffect(() => {
    const ids = [...new Set(reviews.map((r) => r.reviewerId).filter(Boolean))] as string[];
    Promise.all(ids.map((id) => getUser(id))).then((users) => {
      const map: Record<string, User> = {};
      users.forEach((u) => { if (u) map[u.id] = u; });
      setReviewers(map);
    });
  }, [reviews]);

  if (!user) return null;

  const totalXP = xp.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero */}
      <Card>
        <CardContent className="flex flex-col sm:flex-row items-center gap-6 py-8">
          <Avatar name={user.name} size="xl" />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
            <p className="text-slate-600">{user.headline || 'Student at LearnWorks'}</p>
            {user.location && (
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1 justify-center sm:justify-start">
                <MapPin className="h-3.5 w-3.5" /> {user.location}
              </p>
            )}
            {user.bio && <p className="text-sm text-slate-600 mt-2">{user.bio}</p>}
          </div>
          <div className="flex flex-col items-center gap-2">
            <Rating value={profile?.rating || 0} count={profile?.reviewCount || 0} />
            <Link href="/onboarding" className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              <Edit className="h-3.5 w-3.5" /> Edit Profile
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Skill Credits', value: profile?.skillCredits || 0, icon: Award, color: 'text-amber-600 bg-amber-50' },
          { label: 'Experience', value: `${totalXP} XP`, icon: Star, color: 'text-purple-600 bg-purple-50' },
          { label: 'Projects', value: projects.length, icon: FolderGit2, color: 'text-indigo-600 bg-indigo-50' },
          { label: 'Certifications', value: certificates.length, icon: BookOpen, color: 'text-emerald-600 bg-emerald-50' },
        ].map((stat, i) => (
          <Card key={i}>
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
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Skills */}
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile?.skills.map(s => <SkillBadge key={s} name={s} />)}
              </div>
              <h3 className="font-medium text-slate-700 mt-4 mb-2">Learning</h3>
              <div className="flex flex-wrap gap-2">
                {profile?.learningGoals.map(s => <SkillBadge key={s} name={s} variant="learning" />)}
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Projects</h2>
              {projects.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">No projects yet. <Link href="/projects" className="text-indigo-600">Create one</Link></p>
              ) : (
                <div className="space-y-4">
                  {projects.map(project => (
                    <div key={project.id} className="p-4 bg-slate-50 rounded-lg">
                      <h3 className="font-medium text-slate-900">{project.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.skillsUsed.map(s => <SkillBadge key={s} name={s} />)}
                      </div>
                      <div className="flex gap-3 mt-2 text-xs text-slate-500">
                        <span>{project.role}</span>
                        <span>•</span>
                        <span>{project.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Experience */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-slate-900 mb-3">Experience Points</h2>
              <div className="space-y-2">
                {xp.slice(0, 5).map(t => (
                  <div key={t.id} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 truncate">{t.description}</span>
                    <span className="text-emerald-600 font-medium">+{t.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-slate-900 mb-3">Certifications</h2>
              {certificates.length === 0 ? (
                <p className="text-sm text-slate-500">No certifications yet.</p>
              ) : (
                <div className="space-y-3">
                  {certificates.map(cert => (
                    <div key={cert.id} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-amber-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{cert.title}</p>
                        <p className="text-xs text-slate-500">{cert.type === 'course' ? 'Course' : cert.type === 'challenge' ? 'Challenge' : 'Micro-Internship'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardContent>
              <h2 className="font-semibold text-slate-900 mb-3">Reviews</h2>
              {reviews.length === 0 ? (
                <p className="text-sm text-slate-500">No reviews yet.</p>
              ) : (
                <div className="space-y-3">
                  {reviews.map(review => {
                    const reviewer = reviewers[review.reviewerId];
                    return (
                      <div key={review.id} className="p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Rating value={review.rating} size="sm" showValue={false} />
                          <span className="text-xs text-slate-500">{review.context}</span>
                        </div>
                        <p className="text-sm text-slate-700">{review.comment}</p>
                        <p className="text-xs text-slate-500 mt-1">— {reviewer?.name}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
