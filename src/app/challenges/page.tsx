'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { getChallenges, getSubmissionsByUser } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import SkillBadge from '@/components/ui/skill-badge';
import Modal from '@/components/ui/modal';
import { Trophy, Clock, Code, CheckCircle2 } from 'lucide-react';
import { getDifficultyColor } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import { useAuth } from '@/lib/auth-context';
import { Challenge, ChallengeSubmission } from '@/types';

export default function ChallengesPage() {
  return (
    <AppShell>
      <ChallengesContent />
    </AppShell>
  );
}

function ChallengesContent() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [mySubmissions, setMySubmissions] = useState<ChallengeSubmission[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    getChallenges().then((c) => setChallenges(c));
  }, []);

  useEffect(() => {
    if (user?.id) getSubmissionsByUser(user.id).then(setMySubmissions);
  }, [user?.id]);

  const mySubmissionsResolved = mySubmissions;

  const handleStart = (challenge: Challenge) => {
    toast('success', `Started challenge: ${challenge.title}`);
  };

  const handleSubmit = () => {
    toast('success', 'Challenge submitted successfully!');
    setShowSubmit(false);
    setSelectedChallenge(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Challenges</h1>
        <p className="text-sm text-slate-600 mt-1">Practical challenges to test and prove your skills</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map(challenge => {
          const submission = mySubmissionsResolved.find(s => s.challengeId === challenge.id);

          return (
            <Card key={challenge.id} hover className="flex flex-col">
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={getDifficultyColor(challenge.difficulty) as 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'}>{challenge.difficulty}</Badge>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-3 w-3" /> {challenge.estimatedTime}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900">{challenge.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{challenge.description}</p>
                <div className="flex flex-wrap gap-1">
                  {challenge.skills.map((s: string) => (
                    <SkillBadge key={s} name={s} />
                  ))}
                </div>
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <p className="text-xs font-medium text-slate-700">Requirements:</p>
                  {challenge.requirements.slice(0, 3).map((req: string, i: number) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" /> {req}
                    </div>
                  ))}
                </div>
                <div className="pt-3 flex gap-2">
                  {submission ? (
                    <Badge variant={submission.status === 'passed' ? 'success' : 'info'}>
                      {submission.status}
                    </Badge>
                  ) : (
                    <>
                      <Button size="sm" onClick={() => handleStart(challenge)} className="flex-1">
                        Start Challenge
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => { setSelectedChallenge(challenge); setShowSubmit(true); }}>
                        Submit
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Modal open={showSubmit} onClose={() => setShowSubmit(false)} title="Submit Challenge">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">GitHub Repository URL</label>
            <input type="url" placeholder="https://github.com/..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Live Demo URL (optional)</label>
            <input type="url" placeholder="https://..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea rows={3} placeholder="Describe your solution..." className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowSubmit(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
