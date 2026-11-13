'use client';

import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { ReactNode } from 'react';

interface ErrorStateProps {
  title?: string;
  message: string;
  action?: ReactNode;
  variant?: 'error' | 'warning' | 'info' | 'success';
}

const icons = {
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle2,
};

const colors = {
  error: 'text-red-500 bg-red-50',
  warning: 'text-amber-500 bg-amber-50',
  info: 'text-blue-500 bg-blue-50',
  success: 'text-emerald-500 bg-emerald-50',
};

export default function ErrorState({ title, message, action, variant = 'error' }: ErrorStateProps) {
  const Icon = icons[variant];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className={`mb-4 p-3 rounded-full ${colors[variant]}`}>
        <Icon className="h-8 w-8" />
      </div>
      {title && <h3 className="text-lg font-medium text-slate-900 mb-1">{title}</h3>}
      <p className="text-sm text-slate-500 max-w-sm mb-4">{message}</p>
      {action}
    </div>
  );
}
