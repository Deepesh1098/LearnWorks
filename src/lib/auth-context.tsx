'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react';
import { User, UserRole } from '@/types';

interface SessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  username?: string;
  bio?: string | null;
  location?: string | null;
  headline?: string | null;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const sessionUser = session?.user as SessionUser | null;

  const user: User | null = sessionUser
    ? {
        id: sessionUser.id || '',
        name: sessionUser.name || '',
        email: sessionUser.email || '',
        username: sessionUser.username || '',
        role: (sessionUser.role || 'student') as User['role'],
        avatar: sessionUser.image || undefined,
        bio: sessionUser.bio || undefined,
        location: sessionUser.location || undefined,
        headline: sessionUser.headline || undefined,
        createdAt: sessionUser.createdAt || '',
      }
    : null;

  const login = async (email: string, password?: string) => {
    try {
      const result = await nextAuthSignIn('credentials', {
        email,
        password: password || 'demo1234',
        redirect: false,
      });
      if (result?.ok) return true;
    } catch {
      // Authentication failed
    }
    return false;
  };

  const logout = () => {
    nextAuthSignOut({ redirect: false }).catch(() => {});
  };

  const switchRole = async (role: UserRole) => {
    const accounts: Record<UserRole, string> = {
      student: 'deepesh@learnworks.demo',
      business: 'business@learnworks.demo',
      admin: 'admin@learnworks.demo',
    };
    await login(accounts[role]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
