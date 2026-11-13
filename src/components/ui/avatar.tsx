'use client';

import { getInitials } from '@/lib/utils';

interface AvatarProps {
  name?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const colors = [
  'bg-indigo-100 text-indigo-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
  'bg-purple-100 text-purple-700',
];

function getColor(name?: string) {
  const safeName = name?.trim() || 'User';

  let hash = 0;

  for (let i = 0; i < safeName.length; i++) {
    hash = safeName.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

export default function Avatar({
  name,
  src,
  size = 'md',
  className = '',
}: AvatarProps) {
  const safeName = name?.trim() || 'User';

  if (src) {
    return (
      <img
        src={src}
        alt={safeName}
        className={`rounded-full object-cover ${sizes[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-semibold ${sizes[size]} ${getColor(safeName)} ${className}`}
    >
      {getInitials(safeName)}
    </div>
  );
}