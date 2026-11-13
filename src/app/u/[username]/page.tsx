'use client';

import { use, useEffect, useState } from 'react';
import { getUserByUsername, getStudentProfile, getProjectsByUser, getCertificatesByUser, getReviewsByUser, getXPByUser, getUser } from '@/lib/queries';
import Avatar from '@/components/ui/avatar';
import Badge from '@/components/ui/badge';
import SkillBadge from '@/components/ui/skill-badge';
import Rating from '@/components/ui/rating';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { MapPin, Star, Award, FolderGit2, BookOpen, Briefcase, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { User, StudentProfile, Project, Certificate, Review, ExperiencePointTransaction } from '@/types';

export default function PublicPortfolioPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [xp, setXp] = useState<ExperiencePointTransaction[]>([]);
  const [reviewers, setReviewers] = useState<Record<string, User>>({});

  useEffect(() => {
    getUserByUsername(username).then(setUser);
  }, [username]);

  useEffect(() => {
    if (user?.id) {
      getStudentProfile(user.id).then(setProfile);
      getProjectsByUser(user.id).then(setProjects);
      getCertificatesByUser(user.id).then(setCertificates);
      getReviewsByUser(user.id).then(setReviews);
      getXPByUser(user.id).then(setXp);
    }
  }, [user?.id]);

  useEffect(() => {
    const ids = [...new Set(reviews.map((r) => r.reviewerId).filter(Boolean))] as string[];
    Promise.all(ids.map((id) => getUser(id))).then((found) => {
      const map: Record<string, User> = {};
      found.forEach((u) => { if (u) map[u.id] = u; });
      setReviewers(map);
    });
  }, [reviews]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-900">User not found</p>
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 text-sm mt-2 inline-block">Go home</Link>
        </div>
      </div>
    );
  }

  const totalXP = xp.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">LW</span>
            </div>
            <span className="font-bold text-slate-900">LearnWorks</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Hero */}
        <Card>
          <CardContent className="flex flex-col sm:flex-row items-center gap-6 py-8">
            <Avatar name={user.name} size="xl" />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
              <p className="text-slate-600">{user.headline}</p>
              {user.location && (
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1 justify-center sm:justify-start">
                  <MapPin className="h-3.5 w-3.5" /> {user.location}
                </p>
              )}
              {user.bio && <p className="text-sm text-slate-600 mt-2">{user.bio}</p>}
            </div>
            <div className="text-center">
              <Rating value={profile?.rating || 0} count={profile?.reviewCount || 0} />
              <p className="text-xs text-slate-500 mt-1">{totalXP} XP</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <Card>
              <CardContent>
                <h2 className="font-semibold text-slate-900 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profile?.skills.map(s => <SkillBadge key={s} name={s} />)}
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardContent>
                <h2 className="font-semibold text-slate-900 mb-4">Projects</h2>
                {projects.length === 0 ? (
                  <p className="text-sm text-slate-500">No projects yet.</p>
                ) : (
                  <div className="space-y-4">
                    {projects.map(p => (
                      <div key={p.id} className="p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-medium text-slate-900">{p.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{p.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {p.skillsUsed.map(s => <SkillBadge key={s} name={s} />)}
                        </div>
                        <p className="text-xs text-slate-500 mt-2">{p.role} • {p.duration}</p>
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
                <div className="space-y-2">
                  {certificates.map(c => (
                    <div key={c.id} className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span className="text-slate-700">{c.title}</span>
                    </div>
                  ))}
                </div>
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
                    {reviews.map(r => {
                      const reviewer = reviewers[r.reviewerId];
                      return (
                        <div key={r.id} className="p-3 bg-slate-50 rounded-lg">
                          <Rating value={r.rating} size="sm" showValue={false} />
                          <p className="text-sm text-slate-700 mt-1">{r.comment}</p>
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
    </div>
  );
}
