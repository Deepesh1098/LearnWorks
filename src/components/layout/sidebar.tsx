'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Avatar from '@/components/ui/avatar';
import { getNotificationsByUser } from '@/lib/queries';
import { User } from '@/types';
import {
  LayoutDashboard, Compass, ArrowLeftRight, BookOpen, Trophy, FolderGit2,
  Briefcase, User as UserIcon, FileText, TrendingUp, DollarSign, MessageSquare,
  Bell, Shield, Building2, BarChart3, Search, ChevronDown, LogOut, Settings, Menu, X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarContentProps {
  user: User;
  pathname: string;
  navItems: NavItem[];
  secondaryItems: NavItem[];
  notifications: number;
  logout: () => void;
  onClose?: () => void;
}

const studentNav: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/skillswap', label: 'SkillSwap', icon: ArrowLeftRight },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/challenges', label: 'Challenges', icon: Trophy },
  { href: '/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/micro-internships', label: 'Micro-Internships', icon: Briefcase },
];

const studentSecondary: NavItem[] = [
  { href: '/portfolio', label: 'Portfolio', icon: UserIcon },
  { href: '/resume', label: 'Resume', icon: FileText },
  { href: '/skill-gap', label: 'Skill Gap', icon: TrendingUp },
  { href: '/earnings', label: 'Earnings', icon: DollarSign },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
];

const businessNav: NavItem[] = [
  { href: '/business/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/business/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/business/candidates', label: 'Candidates', icon: Search },
  { href: '/business/applications', label: 'Applications', icon: Briefcase },
  { href: '/business/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
];

const adminNav: NavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: UserIcon },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    if (!user?.id) return;
    getNotificationsByUser(user.id).then((items) => setNotifications(items.filter((n) => !n.read).length));
  }, [user?.id]);

  if (!user) return null;

  const navItems = user.role === 'student' ? studentNav : user.role === 'business' ? businessNav : adminNav;
  const secondaryItems = user.role === 'student' ? studentSecondary : [];

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg border border-slate-200 shadow-sm"
      >
        <Menu className="h-5 w-5 text-slate-600" />
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileOpen(false)}>
          <div className="w-72 h-full bg-white" onClick={(e) => e.stopPropagation()}>
            <SidebarContent
              user={user}
              pathname={pathname}
              navItems={navItems}
              secondaryItems={secondaryItems}
              notifications={notifications}
              logout={logout}
              onClose={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 bg-white h-screen sticky top-0">
        <SidebarContent
          user={user}
          pathname={pathname}
          navItems={navItems}
          secondaryItems={secondaryItems}
          notifications={notifications}
          logout={logout}
        />
      </aside>
    </>
  );
}

function SidebarContent({ user, pathname, navItems, secondaryItems, notifications, logout, onClose }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">LW</span>
          </div>
          <span className="font-bold text-lg text-slate-900">LearnWorks</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map(item => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`h-5 w-5 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
              {item.label}
              {item.href === '/messages' && notifications > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{notifications}</span>
              )}
            </Link>
          );
        })}

        {secondaryItems.length > 0 && (
          <>
            <div className="pt-4 pb-2 px-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tools</span>
            </div>
            {secondaryItems.map(item => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </>
        )}
      </nav>
    </div>
  );
}
