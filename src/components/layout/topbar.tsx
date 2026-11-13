'use client';

import { useAuth } from '@/lib/auth-context';
import { getNotificationsByUser } from '@/lib/queries';
import { Bell, Search } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TopBar() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    if (!user?.id) return;
    getNotificationsByUser(user.id).then((notifications) => setUnreadNotifications(notifications.filter((n) => !n.read).length));
  }, [user?.id]);

  if (!user) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/discover?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        <div className="flex-1 max-w-xl ml-12 lg:ml-0">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search students, skills, courses..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearch(true)}
              onBlur={() => setTimeout(() => setShowSearch(false), 200)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-0 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
          </form>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/notifications"
            className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Bell className="h-5 w-5 text-slate-600" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
