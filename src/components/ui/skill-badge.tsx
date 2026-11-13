'use client';

import { Search } from 'lucide-react';

interface SkillBadgeProps {
  name: string;
  variant?: 'default' | 'outline' | 'learning';
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

export default function SkillBadge({ name, variant = 'default', removable, onRemove, className = '' }: SkillBadgeProps) {
  const variants = {
    default: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    outline: 'bg-white text-slate-700 border-slate-300',
    learning: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-sm font-medium rounded-full border ${variants[variant]} ${className}`}>
      {variant === 'learning' && <Search className="h-3 w-3" />}
      {name}
      {removable && (
        <button onClick={onRemove} className="ml-0.5 hover:text-red-500">&times;</button>
      )}
    </span>
  );
}
