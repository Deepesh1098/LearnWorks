'use client';

import { useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { useAuth } from '@/lib/auth-context';
import { updateStudentProfile } from '@/lib/queries';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import SkillBadge from '@/components/ui/skill-badge';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';

const allSkills = ['Python', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Node.js', 'UI/UX', 'Figma', 'Excel', 'Digital Marketing', 'SEO', 'Graphic Design', 'Video Editing', 'Content Writing', 'Data Analysis', 'SQL', 'HTML', 'CSS', 'Java', 'C++', 'Flutter', 'Swift', 'Machine Learning', 'AI'];

const steps = [
  { title: 'Basic Info', description: 'Tell us about yourself' },
  { title: 'Skills I Know', description: 'What can you teach?' },
  { title: 'Skills to Learn', description: 'What do you want to learn?' },
  { title: 'Interests', description: 'What excites you?' },
  { title: 'Experience', description: 'Your skill level' },
  { title: 'Availability', description: 'When can you learn?' },
  { title: 'Career Goal', description: 'What are you working towards?' },
];

export default function OnboardingPage() {
  return (
    <AppShell>
      <OnboardingContent />
    </AppShell>
  );
}

function OnboardingContent() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    skills: [] as string[],
    learningGoals: [] as string[],
    interests: [] as string[],
    experienceLevel: 'beginner' as string,
    availability: '10-15 hours/week',
    careerGoal: '',
  });

  if (!user) return null;

  const toggleSkill = (skill: string, field: 'skills' | 'learningGoals' | 'interests') => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(skill) ? prev[field].filter(s => s !== skill) : [...prev[field], skill],
    }));
  };

  const handleFinish = async () => {
    if (user?.id) {
      setIsSaving(true);
      try {
        await updateStudentProfile(user.id, {
          name: form.name,
          bio: form.bio,
          location: form.location,
          experienceLevel: form.experienceLevel,
          availability: form.availability,
          careerGoal: form.careerGoal,
        });
      } catch {
        // Persist failure should not block navigation
      }
      setIsSaving(false);
    }
    toast('success', 'Profile updated successfully!');
    router.push('/dashboard');
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-slate-900">Build Your Profile</h1>
          <span className="text-sm text-slate-500">Step {step + 1} of {steps.length}</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full">
          <div className="h-2 bg-indigo-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-sm text-slate-500 mt-2">{steps[step].description}</p>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 min-h-[300px]">
        {step === 0 && (
          <div className="space-y-4">
            <Input label="Full Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            <Input label="Bio" value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} placeholder="Tell us about yourself..." />
            <Input label="Location" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="Bangalore, India" />
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="text-sm text-slate-600 mb-4">Select skills you can teach others:</p>
            <div className="flex flex-wrap gap-2">
              {allSkills.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill, 'skills')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    form.skills.includes(skill)
                      ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {form.skills.includes(skill) && <CheckCircle2 className="h-4 w-4 inline mr-1" />}
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-sm text-slate-600 mb-4">Select skills you want to learn:</p>
            <div className="flex flex-wrap gap-2">
              {allSkills.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill, 'learningGoals')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    form.learningGoals.includes(skill)
                      ? 'bg-amber-100 border-amber-300 text-amber-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {form.learningGoals.includes(skill) && <CheckCircle2 className="h-4 w-4 inline mr-1" />}
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-sm text-slate-600 mb-4">What areas interest you?</p>
            <div className="flex flex-wrap gap-2">
              {['Web Development', 'Mobile Development', 'AI/ML', 'Data Science', 'UI/UX', 'DevOps', 'Cloud Computing', 'Cybersecurity', 'Blockchain', 'Game Development', 'Content Creation', 'Digital Marketing', 'Startups', 'Open Source', 'Fintech', 'EdTech'].map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleSkill(interest, 'interests')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    form.interests.includes(interest)
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {form.interests.includes(interest) && <CheckCircle2 className="h-4 w-4 inline mr-1" />}
                  {interest}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            {['beginner', 'intermediate', 'advanced'].map(level => (
              <button
                key={level}
                onClick={() => setForm(p => ({ ...p, experienceLevel: level }))}
                className={`w-full p-4 rounded-lg border text-left transition-colors ${
                  form.experienceLevel === level
                    ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="font-medium text-slate-900 capitalize">{level}</p>
                <p className="text-sm text-slate-500 mt-1">
                  {level === 'beginner' ? 'Just getting started with programming' : level === 'intermediate' ? 'Have built a few projects and understand fundamentals' : 'Strong fundamentals and project experience'}
                </p>
              </button>
            ))}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-3">
            {['5-10 hours/week', '10-15 hours/week', '15-20 hours/week', '20+ hours/week'].map(avail => (
              <button
                key={avail}
                onClick={() => setForm(p => ({ ...p, availability: avail }))}
                className={`w-full p-4 rounded-lg border text-left transition-colors ${
                  form.availability === avail
                    ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="font-medium text-slate-900">{avail}</p>
              </button>
            ))}
          </div>
        )}

        {step === 6 && (
          <div className="space-y-3">
            {['Learn a new skill', 'Build portfolio', 'Earn money', 'Find internship', 'Get hired', 'Become freelancer'].map(goal => (
              <button
                key={goal}
                onClick={() => setForm(p => ({ ...p, careerGoal: goal }))}
                className={`w-full p-4 rounded-lg border text-left transition-colors ${
                  form.careerGoal === goal
                    ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="font-medium text-slate-900">{goal}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep(s => s - 1)}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        {step === steps.length - 1 ? (
          <Button onClick={handleFinish} loading={isSaving}>
            Build My LearnWorks Profile <CheckCircle2 className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={() => setStep(s => s + 1)}>
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
