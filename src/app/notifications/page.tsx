'use client';

import AppShell from '@/components/layout/app-shell';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getNotificationsByUser } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Bell, ArrowLeftRight, Briefcase, Star, MessageSquare, BookOpen, DollarSign, type LucideIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Notification } from '@/types';
import Link from 'next/link';

const typeIcons: Record<string, LucideIcon> = {
  skillswap: ArrowLeftRight,
  application: Briefcase,
  review: Star,
  message: MessageSquare,
  course: BookOpen,
  payment: DollarSign,
};

const typeColors: Record<string, string> = {
  skillswap: 'bg-purple-100 text-purple-600',
  application: 'bg-indigo-100 text-indigo-600',
  review: 'bg-amber-100 text-amber-600',
  message: 'bg-blue-100 text-blue-600',
  course: 'bg-emerald-100 text-emerald-600',
  payment: 'bg-green-100 text-green-600',
};

export default function NotificationsPage() {
  return (
    <AppShell>
      <NotificationsContent />
    </AppShell>
  );
}

function NotificationsContent() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (user?.id) getNotificationsByUser(user.id).then(setNotifications);
  }, [user?.id]);

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
        <p className="text-sm text-slate-600 mt-1">Stay updated on your activities</p>
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Bell className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No notifications yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {notifications.map(n => {
            const Icon = typeIcons[n.type] || Bell;
            const color = typeColors[n.type] || 'bg-slate-100 text-slate-600';

            return (
              <Link key={n.id} href={n.link || '#'}>
                <Card hover className={`transition-colors ${!n.read ? 'bg-indigo-50/50 border-indigo-200' : ''}`}>
                  <CardContent className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${color} flex-shrink-0`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${!n.read ? 'text-slate-900' : 'text-slate-700'}`}>{n.title}</p>
                      <p className="text-sm text-slate-500">{n.message}</p>
                      <p className="text-xs text-slate-400 mt-1">{formatDate(n.createdAt)}</p>
                    </div>
                    {!n.read && (
                      <div className="h-2.5 w-2.5 bg-indigo-500 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
