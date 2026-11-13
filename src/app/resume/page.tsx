'use client';

import AppShell from '@/components/layout/app-shell';
import { useAuth } from '@/lib/auth-context';
import { getStudentProfile, getProjectsByUser, getCertificatesByUser, getXPByUser } from '@/lib/queries';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import SkillBadge from '@/components/ui/skill-badge';
import { FileText, Download, Printer } from 'lucide-react';
import { StudentProfile, Project, Certificate, ExperiencePointTransaction } from '@/types';

export default function ResumePage() {
  return (
    <AppShell>
      <ResumeContent />
    </AppShell>
  );
}

function ResumeContent() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [xp, setXp] = useState<ExperiencePointTransaction[]>([]);

  useEffect(() => {
    if (user?.id) {
      getStudentProfile(user.id).then(setProfile);
      getProjectsByUser(user.id).then(setProjects);
      getCertificatesByUser(user.id).then(setCertificates);
      getXPByUser(user.id).then(setXp);
    }
  }, [user?.id]);

  if (!user) return null;

  const totalXP = xp.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Resume</h1>
          <p className="text-sm text-slate-600 mt-1">Generated from your LearnWorks profile</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4" /> Print
          </Button>
        </div>
      </div>

      {/* Resume Preview */}
      <Card className="no-print">
        <CardContent className="py-2">
          <p className="text-xs text-slate-500 text-center">Preview — Use Print to save as PDF</p>
        </CardContent>
      </Card>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-8" id="resume">
        {/* Header */}
        <div className="text-center border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
          <p className="text-lg text-slate-600 mt-1">{user.headline || 'Student at LearnWorks'}</p>
          <div className="flex items-center justify-center gap-4 mt-3 text-sm text-slate-500">
            {user.location && <span>{user.location}</span>}
            <span>{user.email}</span>
          </div>
        </div>

        {/* Summary */}
        {user.bio && (
          <section>
            <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-1 mb-3">Summary</h2>
            <p className="text-sm text-slate-700 leading-relaxed">{user.bio}</p>
          </section>
        )}

        {/* Skills */}
        {profile && (
          <section>
            <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map(s => <SkillBadge key={s} name={s} />)}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-1 mb-3">Projects</h2>
            <div className="space-y-4">
              {projects.map(project => (
                <div key={project.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-semibold text-slate-900">{project.title}</h3>
                    <span className="text-xs text-slate-500">{project.duration}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.skillsUsed.map(s => (
                      <span key={s} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Points */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-1 mb-3">Experience & Achievements</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-700">Total Experience Points</span>
              <span className="font-semibold text-slate-900">{totalXP} XP</span>
            </div>
            {xp.slice(0, 5).map(t => (
              <div key={t.id} className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{t.description}</span>
                <span className="text-emerald-600">+{t.amount} XP</span>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        {certificates.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-1 mb-3">Certifications</h2>
            <div className="space-y-2">
              {certificates.map(cert => (
                <div key={cert.id} className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">{cert.title}</span>
                  <span className="text-slate-500">{cert.type === 'course' ? 'Course' : cert.type === 'challenge' ? 'Challenge' : 'Micro-Internship'}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
