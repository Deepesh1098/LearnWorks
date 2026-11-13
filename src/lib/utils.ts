import { StudentProfile, User, MatchResult } from '@/types';

export function calculateSkillSwapScore(
  mySkills: string[],
  myGoals: string[],
  myInterests: string[],
  myAvailability: string,
  myLevel: string,
  theirSkills: string[],
  theirGoals: string[],
  theirInterests: string[],
  theirAvailability: string,
  theirLevel: string
): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  const skillsICanTeach = mySkills.filter(s => theirGoals.includes(s));
  if (skillsICanTeach.length > 0) {
    score += skillsICanTeach.length * 20;
    skillsICanTeach.forEach(s => reasons.push(`You can teach ${s}`));
  }

  const skillsTheyCanTeach = theirSkills.filter(s => myGoals.includes(s));
  if (skillsTheyCanTeach.length > 0) {
    score += skillsTheyCanTeach.length * 20;
    skillsTheyCanTeach.forEach(s => reasons.push(`They can teach ${s}`));
  }

  const interestOverlap = myInterests.filter(i => theirInterests.includes(i));
  if (interestOverlap.length > 0) {
    score += interestOverlap.length * 10;
    reasons.push(`${interestOverlap.length} shared interests`);
  }

  if (myAvailability === theirAvailability) {
    score += 15;
    reasons.push('Compatible availability');
  } else {
    score += 5;
  }

  const levels = ['beginner', 'intermediate', 'advanced'];
  const myLevelIdx = levels.indexOf(myLevel);
  const theirLevelIdx = levels.indexOf(theirLevel);
  if (Math.abs(myLevelIdx - theirLevelIdx) <= 1) {
    score += 10;
    reasons.push('Compatible experience level');
  }

  score = Math.min(100, score);
  return { score, reasons };
}

export function calculateCandidateScore(
  projectSkills: string[],
  projectLevel: string,
  candidateSkills: string[],
  candidateLevel: string,
  candidateRating: number,
  candidateProjects: number,
  candidateAvailability: boolean
): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  const skillMatch = projectSkills.filter(s => candidateSkills.includes(s));
  const skillScore = (skillMatch.length / projectSkills.length) * 50;
  score += skillScore;
  skillMatch.forEach(s => reasons.push(s));

  const levels = ['beginner', 'intermediate', 'advanced'];
  const reqIdx = levels.indexOf(projectLevel);
  const candIdx = levels.indexOf(candidateLevel);
  if (candIdx >= reqIdx) {
    score += 15;
    reasons.push('Experience level matches');
  }

  if (candidateRating >= 4.5) {
    score += 15;
    reasons.push('Strong client rating');
  } else if (candidateRating >= 4.0) {
    score += 10;
    reasons.push('Good client rating');
  }

  if (candidateProjects >= 3) {
    score += 10;
    reasons.push(`${candidateProjects} similar projects`);
  } else if (candidateProjects >= 1) {
    score += 5;
    reasons.push(`${candidateProjects} project experience`);
  }

  if (candidateAvailability) {
    score += 10;
    reasons.push('Available within requested period');
  }

  return { score: Math.min(100, Math.round(score)), reasons };
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function getDifficultyColor(d: string): string {
  switch (d) {
    case 'beginner': return 'bg-emerald-100 text-emerald-700';
    case 'intermediate': return 'bg-amber-100 text-amber-700';
    case 'advanced': return 'bg-red-100 text-red-700';
    default: return 'bg-slate-100 text-slate-700';
  }
}

export function getStatusColor(s: string): string {
  switch (s) {
    case 'applied': return 'bg-blue-100 text-blue-700';
    case 'shortlisted': return 'bg-purple-100 text-purple-700';
    case 'accepted': return 'bg-emerald-100 text-emerald-700';
    case 'in_progress': return 'bg-amber-100 text-amber-700';
    case 'submitted': return 'bg-cyan-100 text-cyan-700';
    case 'completed': return 'bg-emerald-100 text-emerald-700';
    case 'rejected': return 'bg-red-100 text-red-700';
    case 'pending': return 'bg-slate-100 text-slate-700';
    default: return 'bg-slate-100 text-slate-700';
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
