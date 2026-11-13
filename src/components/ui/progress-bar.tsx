'use client';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'indigo' | 'emerald' | 'amber' | 'red';
  showLabel?: boolean;
  className?: string;
}

const colors = {
  indigo: 'bg-indigo-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
};

const sizes = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export default function ProgressBar({ value, max = 100, size = 'md', color = 'indigo', showLabel = false, className = '' }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-slate-700">{Math.round(pct)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 rounded-full ${sizes[size]}`}>
        <div
          className={`${colors[color]} ${sizes[size]} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
