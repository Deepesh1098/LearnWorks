'use client';

import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md';
  showValue?: boolean;
  count?: number;
  className?: string;
}

export default function Rating({ value, max = 5, size = 'sm', showValue = true, count, className = '' }: RatingProps) {
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`${iconSize} ${
            i < Math.floor(value)
              ? 'text-amber-400 fill-amber-400'
              : i < value
              ? 'text-amber-400 fill-amber-200'
              : 'text-slate-300'
          }`}
        />
      ))}
      {showValue && (
        <span className="text-sm font-medium text-slate-700 ml-1">{value.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-sm text-slate-500">({count})</span>
      )}
    </div>
  );
}
