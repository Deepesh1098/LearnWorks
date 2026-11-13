'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { useAuth } from '@/lib/auth-context';
import { getStudentProfile } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import SkillBadge from '@/components/ui/skill-badge';
import { TrendingUp, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { StudentProfile } from '@/types';

const careerGoals = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Git/GitHub', 'Testing', 'Responsive Design'],
    roadmap: ['Master HTML & CSS', 'Learn JavaScript deeply', 'Learn React', 'Add TypeScript', 'Learn Git', 'Write tests', 'Build 3 projects', 'Apply to micro-internships'],
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    skills: ['Python/Node.js', 'SQL', 'REST APIs', 'Authentication', 'Docker', 'AWS Basics', 'Testing', 'Git/GitHub'],
    roadmap: ['Master a backend language', 'Learn SQL & databases', 'Build REST APIs', 'Add authentication', 'Learn Docker', 'Deploy to cloud', 'Build projects', 'Apply to internships'],
  },
  {
    id: 'data',
    title: 'Data Analyst',
    skills: ['SQL', 'Python', 'Excel', 'Data Visualization', 'Statistics', 'Pandas', 'Tableau/Power BI'],
    roadmap: ['Master Excel', 'Learn SQL', 'Learn Python for data', 'Study statistics', 'Learn visualization tools', 'Build portfolio projects', 'Apply to roles'],
  },
  {
    id: 'uiux',
    title: 'UI/UX Designer',
    skills: ['Figma', 'Design Principles', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'HTML/CSS basics'],
    roadmap: ['Learn design principles', 'Master Figma', 'Study user research', 'Practice wireframing', 'Build design system', 'Create portfolio', 'Apply to roles'],
  },
  {
    id: 'marketing',
    title: 'Digital Marketer',
    skills: ['SEO', 'Content Writing', 'Social Media', 'Google Analytics', 'Email Marketing', 'PPC Basics'],
    roadmap: ['Learn SEO fundamentals', 'Master content writing', 'Understand social media marketing', 'Learn analytics', 'Practice paid ads basics', 'Build case studies', 'Apply to roles'],
  },
];

export default function SkillGapPage() {
  return (
    <AppShell>
      <SkillGapContent />
    </AppShell>
  );
}

function SkillGapContent() {
  const { user } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    if (user?.id) getStudentProfile(user.id).then(setProfile);
  }, [user?.id]);

  if (!user) return null;

  const goal = careerGoals.find(g => g.id === selected);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Skill Gap Analysis</h1>
        <p className="text-sm text-slate-600 mt-1">Choose a career goal to see what skills you need</p>
      </div>

      {/* Career Goals */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {careerGoals.map(g => (
          <Card
            key={g.id}
            hover
            onClick={() => setSelected(g.id)}
            className={selected === g.id ? 'ring-2 ring-indigo-500 border-indigo-300' : ''}
          >
            <CardContent>
              <h3 className="font-semibold text-slate-900">{g.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{g.skills.length} skills required</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analysis */}
      {goal && profile && (
        <Card>
          <CardContent className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">{goal.title} — Skill Analysis</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Current Skills */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Current Skills
                </h3>
                <div className="space-y-2">
                  {goal.skills.filter(s => profile.skills.some(ps => ps.toLowerCase().includes(s.toLowerCase().split('/')[0]))).map(s => (
                    <div key={s} className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm font-medium text-slate-900">{s}</span>
                    </div>
                  ))}
                  {goal.skills.filter(s => profile.skills.some(ps => ps.toLowerCase().includes(s.toLowerCase().split('/')[0]))).length === 0 && (
                    <p className="text-sm text-slate-500">No matching skills found in your profile.</p>
                  )}
                </div>
              </div>

              {/* Missing Skills */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Circle className="h-5 w-5 text-amber-500" />
                  Skills to Learn
                </h3>
                <div className="space-y-2">
                  {goal.skills.filter(s => !profile.skills.some(ps => ps.toLowerCase().includes(s.toLowerCase().split('/')[0]))).map(s => (
                    <div key={s} className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
                      <Circle className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium text-slate-900">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Roadmap */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Recommended Roadmap</h3>
              <div className="space-y-3">
                {goal.roadmap.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-sm text-slate-700">{step}</span>
                      {i < goal.roadmap.length - 1 && <ArrowRight className="h-3 w-3 text-slate-300" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
