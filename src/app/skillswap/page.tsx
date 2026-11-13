'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/layout/app-shell';
import { useAuth } from '@/lib/auth-context';
import { getStudentProfiles, getUser, getSkillSwapsByUser, getStudentProfile } from '@/lib/queries';
import { calculateSkillSwapScore } from '@/lib/utils';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import Avatar from '@/components/ui/avatar';
import SkillBadge from '@/components/ui/skill-badge';
import { ArrowLeftRight, CheckCircle2, X, Send, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { MatchResult, StudentProfile, User, SkillSwap } from '@/types';

export default function SkillSwapPage() {
  return (
    <AppShell>
      <SkillSwapContent />
    </AppShell>
  );
}

function SkillSwapContent() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'completed'>('all');
  const [myProfile, setMyProfile] = useState<StudentProfile | null>(null);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [mySwaps, setMySwaps] = useState<SkillSwap[]>([]);

  useEffect(() => {
    if (user?.id) getStudentProfile(user.id).then(setMyProfile);
  }, [user?.id]);

  useEffect(() => {
    getStudentProfiles().then(setStudents);
  }, []);

  useEffect(() => {
    const ids = [...new Set(students.map((s) => s.userId).filter(Boolean))] as string[];
    Promise.all(ids.map((id) => getUser(id))).then((found) => {
      const map: Record<string, User> = {};
      found.forEach((u) => { if (u) map[u.id] = u; });
      setUsers(map);
    });
  }, [students]);

  useEffect(() => {
    if (user?.id) getSkillSwapsByUser(user.id).then(setMySwaps);
  }, [user?.id]);

  if (!user) return null;

  if (!myProfile) {
    return <div className="text-center py-12 text-slate-500">Complete your profile to use SkillSwap.</div>;
  }

  const matches: MatchResult[] = students
    .filter((p) => p.userId !== user.id)
    .map((p) => {
      const otherUser = users[p.userId];
      if (!otherUser) return null;
      const { score, reasons } = calculateSkillSwapScore(
        myProfile.skills, myProfile.learningGoals, myProfile.interests, myProfile.availability, myProfile.experienceLevel,
        p.skills, p.learningGoals, p.interests, p.availability, p.experienceLevel
      );
      return {
        userId: p.userId,
        name: otherUser.name,
        avatar: otherUser.avatar,
        headline: otherUser.headline,
        skills: p.skills,
        experienceLevel: p.experienceLevel,
        rating: p.rating,
        score,
        reasons,
      };
    })
    .filter(Boolean) as MatchResult[];

  matches.sort((a, b) => b.score - a.score);

  const filteredSwaps = filter === 'all' ? mySwaps : mySwaps.filter(s => s.status === filter);

  const handleSendRequest = (match: MatchResult) => {
    const mySkill = myProfile.skills.find(s => match.reasons.some(r => r.includes(`teach ${s}`))) || myProfile.skills[0];
    const theirSkill = match.reasons.find(r => r.includes('can teach'))?.split('can teach ')[1] || match.skills[0];

    // SkillSwap creation is handled through the real API-backed server action
    import('@/lib/queries').then(({ createSkillSwap }) =>
      createSkillSwap(match.userId, mySkill, theirSkill)
    ).then(() => {
      toast('success', `SkillSwap request sent to ${match.name}!`);
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">SkillSwap</h1>
        <p className="text-sm text-slate-600 mt-1">Teach what you know. Learn what you need.</p>
      </div>

      {/* Matches */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recommended Matches</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.slice(0, 6).map(match => (
            <Card key={match.userId} hover>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar name={match.name} size="lg" />
                    <div>
                      <p className="font-semibold text-slate-900">{match.name}</p>
                      <p className="text-sm text-slate-500">{match.headline}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">{match.score}%</div>
                    <p className="text-[10px] text-slate-500">match</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {match.skills.slice(0, 4).map(s => (
                    <SkillBadge key={s} name={s} />
                  ))}
                </div>

                <div className="space-y-1.5">
                  {match.reasons.slice(0, 4).map((reason, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-sm text-slate-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                      {reason}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <Button size="sm" onClick={() => handleSendRequest(match)} className="flex-1">
                    <Send className="h-3.5 w-3.5" />
                    Send Request
                  </Button>
                  <Button size="sm" variant="outline">Profile</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* My Swaps */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">My SkillSwaps</h2>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {(['all', 'pending', 'accepted', 'completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors capitalize ${
                  filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filteredSwaps.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <ArrowLeftRight className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No SkillSwaps found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredSwaps.map(swap => {
              const otherUserId = swap.student1Id === user.id ? swap.student2Id : swap.student1Id;
              const otherUser = users[otherUserId];
              const isInitiator = swap.student1Id === user.id;

              return (
                <Card key={swap.id}>
                  <CardContent className="flex items-center gap-4">
                    <Avatar name={otherUser?.name || 'Unknown'} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900">{otherUser?.name}</p>
                      <p className="text-sm text-slate-500">
                        {isInitiator ? `You teach ${swap.skill1} → Learn ${swap.skill2}` : `Learn ${swap.skill1} ← Teach ${swap.skill2}`}
                      </p>
                    </div>
                    <Badge variant={swap.status === 'completed' ? 'success' : swap.status === 'accepted' ? 'info' : swap.status === 'pending' ? 'warning' : 'default'}>
                      {swap.status}
                    </Badge>
                    <span className="text-sm text-slate-500">{swap.hoursLogged}h logged</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
