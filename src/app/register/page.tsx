'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { signIn as nextAuthSignIn } from 'next-auth/react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { ArrowRight, BookOpen, Briefcase, Shield } from 'lucide-react';

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }
      const result = await nextAuthSignIn('credentials', { email, password, redirect: false });
      if (result?.ok) {
        router.push('/onboarding');
      } else {
        setError('Account created but automatic sign-in failed. Please sign in.');
        setLoading(false);
      }
    } catch {
      setError('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  const handleDemoLogin = async (email: string) => {
    const success = await login(email, 'demo1234');
    if (success) router.push('/dashboard');
  };

  const demoAccounts = [
    { email: 'deepesh@learnworks.demo', label: 'Student', icon: BookOpen, desc: 'Deepesh Yadav — Full-Stack Developer' },
    { email: 'business@learnworks.demo', label: 'Business', icon: Briefcase, desc: 'Startup XYZ — EdTech Company' },
    { email: 'admin@learnworks.demo', label: 'Admin', icon: Shield, desc: 'Platform Administrator' },
  ];

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 p-12 flex-col justify-center">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">LW</span>
            </div>
            <span className="font-bold text-2xl text-white">LearnWorks</span>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight">
            Learn. Exchange.<br />Experience. Get Hired.
          </h1>
          <p className="mt-4 text-lg text-indigo-200">
            Create your free account and start turning skills into experience.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LW</span>
            </div>
            <span className="font-bold text-lg text-slate-900">LearnWorks</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Create your account</h2>
          <p className="mt-2 text-sm text-slate-600">Join LearnWorks to learn, swap skills and build your career.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input label="Full name" type="text" placeholder="Jane Doe" value={name} onChange={e => setName(e.target.value)} required />
            <Input label="Username" type="text" placeholder="janedoe" value={username} onChange={e => setUsername(e.target.value)} required />
            <Input label="Email address" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Password" type="password" placeholder="Min. 6 characters" value={password} onChange={e => setPassword(e.target.value)} required />
              <Input label="Confirm password" type="password" placeholder="Repeat password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>
            <Button type="submit" loading={loading} className="w-full">
              Create account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 font-medium hover:text-indigo-500">
              Sign in
            </Link>
          </p>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-slate-500">or try a demo account</span>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {demoAccounts.map(account => (
                <button
                  key={account.email}
                  onClick={() => handleDemoLogin(account.email)}
                  disabled={loading}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 text-left transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                >
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <account.icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{account.label}</p>
                    <p className="text-xs text-slate-500 truncate">{account.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
