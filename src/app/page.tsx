'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, ArrowLeftRight, Briefcase, Trophy, Star, Users, TrendingUp, CheckCircle2, Zap, Shield, Globe, ChevronRight, GraduationCap, Building2, Award } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LW</span>
              </div>
              <span className="font-bold text-lg text-slate-900">LearnWorks</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm text-slate-600 hover:text-slate-900">How it Works</a>
              <a href="#students" className="text-sm text-slate-600 hover:text-slate-900">For Students</a>
              <a href="#businesses" className="text-sm text-slate-600 hover:text-slate-900">For Businesses</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2">
                Sign in
              </Link>
              <Link href="/login" className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
              <Zap className="h-4 w-4" />
              Where Learning Meets Real Experience
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
              Learn skills.<br />
              Build proof.<br />
              <span className="text-indigo-600">Get hired.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
              LearnWorks connects students with peers, courses, micro-internships, and real projects.
              Build a portfolio that proves your skills — not just claims them.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-base">
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 font-medium px-6 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors text-base">
                Find Talent
              </Link>
            </div>
          </div>

          {/* Hero Visual - Journey */}
          <div className="mt-16 lg:mt-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: BookOpen, label: 'Learn', desc: 'Courses & Skills', color: 'bg-blue-50 text-blue-600 border-blue-200' },
                { icon: ArrowLeftRight, label: 'Exchange', desc: 'SkillSwap', color: 'bg-purple-50 text-purple-600 border-purple-200' },
                { icon: Briefcase, label: 'Experience', desc: 'Micro-Internships', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
                { icon: Trophy, label: 'Get Hired', desc: 'Portfolio & Proof', color: 'bg-amber-50 text-amber-600 border-amber-200' },
              ].map((item, i) => (
                <div key={i} className={`relative p-5 rounded-xl border ${item.color} transition-transform hover:scale-105`}>
                  <item.icon className="h-8 w-8 mb-3" />
                  <h3 className="font-semibold text-slate-900">{item.label}</h3>
                  <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                  {i < 3 && (
                    <ChevronRight className="hidden md:block absolute top-1/2 -right-3 h-5 w-5 text-slate-300 z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900">The problem with traditional learning</h2>
            <p className="mt-4 text-lg text-slate-600">
              Certificates don&apos;t prove skills. Projects do.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { title: 'No Real Experience', desc: 'Students graduate with certificates but no portfolio of actual work.' },
              { title: 'Disconnected Learning', desc: 'Courses don&apos;t connect to real projects or real employers.' },
              { title: 'No Skill Proof', desc: 'Resumes list skills but provide no evidence of actual capability.' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-red-600 font-bold">{i + 1}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">How LearnWorks works</h2>
            <p className="mt-4 text-lg text-slate-600">From learning to getting hired — one platform.</p>
          </div>
          <div className="grid md:grid-cols-6 gap-4">
            {[
              { step: '1', title: 'Discover', desc: 'Find skills and peers', color: 'text-indigo-600 bg-indigo-50' },
              { step: '2', title: 'SkillSwap', desc: 'Teach & learn from peers', color: 'text-purple-600 bg-purple-50' },
              { step: '3', title: 'Learn', desc: 'Take courses & challenges', color: 'text-blue-600 bg-blue-50' },
              { step: '4', title: 'Practice', desc: 'Build real projects', color: 'text-emerald-600 bg-emerald-50' },
              { step: '5', title: 'Earn', desc: 'Micro-internships', color: 'text-amber-600 bg-amber-50' },
              { step: '6', title: 'Get Hired', desc: 'Portfolio speaks for you', color: 'text-rose-600 bg-rose-50' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className={`h-12 w-12 rounded-full ${item.color} flex items-center justify-center mx-auto mb-3`}>
                  <span className="font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SkillSwap */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1.5 rounded-full mb-4">
                <ArrowLeftRight className="h-4 w-4" />
                SkillSwap
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Trade skills, not money</h2>
              <p className="mt-4 text-lg text-slate-600">
                Know Python? Want to learn UI/UX? Find someone who knows UI/UX and wants to learn Python. Exchange skills and both grow.
              </p>
              <ul className="mt-6 space-y-3">
                {['Smart matching algorithm', 'Skill Credits system', 'Session tracking', 'Verified reviews'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-purple-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
              <div className="text-center mb-4">
                <span className="text-sm font-semibold text-purple-600">Great SkillSwap Match</span>
                <div className="text-3xl font-bold text-slate-900 mt-1">92%</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>You can teach <strong>Python</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>They want to learn <strong>Python</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>They can teach <strong>UI/UX</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>You want to learn <strong>UI/UX</strong></span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                <button className="flex-1 bg-purple-600 text-white text-sm font-medium py-2 rounded-lg">Send Request</button>
                <button className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg">View Profile</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Micro-Internships */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">Build a Landing Page</h4>
                    <p className="text-sm text-slate-500 mt-1">Startup XYZ</p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600">₹5,000</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['React', 'CSS', 'HTML'].map(s => (
                    <span key={s} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">{s}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>10 days</span>
                  <span>•</span>
                  <span>Intermediate</span>
                </div>
                <button className="w-full bg-indigo-600 text-white text-sm font-medium py-2 rounded-lg">Apply Now</button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-full mb-4">
                <Briefcase className="h-4 w-4" />
                Micro-Internships
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Real projects. Real pay. Real experience.</h2>
              <p className="mt-4 text-lg text-slate-600">
                Businesses post short projects. Students apply, deliver, and get paid. Build your portfolio while earning.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-600">₹500+</p>
                  <p className="text-sm text-slate-600">Avg. project value</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">10 days</p>
                  <p className="text-sm text-slate-600">Avg. duration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Students */}
      <section id="students" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-full mb-4">
              <GraduationCap className="h-4 w-4" />
              For Students
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Your career starts here</h2>
            <p className="mt-4 text-lg text-slate-600">Everything you need to learn, build, and get hired.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'SkillSwap', desc: 'Exchange skills with peers. Teach what you know, learn what you need.' },
              { title: 'Mini-Courses', desc: 'Bite-sized courses from real students and professionals.' },
              { title: 'Challenges', desc: 'Practical challenges to test and prove your skills.' },
              { title: 'Micro-Internships', desc: 'Short paid projects from real businesses.' },
              { title: 'Portfolio', desc: 'Showcase your projects, courses, and experience.' },
              { title: 'Skill Credits', desc: 'Earn credits by teaching. Spend them to learn.' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Businesses */}
      <section id="businesses" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-medium px-3 py-1.5 rounded-full mb-4">
                <Building2 className="h-4 w-4" />
                For Businesses
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Hire proven student talent</h2>
              <p className="mt-4 text-lg text-slate-600">
                Post projects, discover candidates with verified skills, and hire students who have already proven themselves.
              </p>
              <ul className="mt-6 space-y-3">
                {['Post micro-internships', 'AI-powered candidate matching', 'Review portfolios & ratings', 'Manage projects & payments'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-4">Candidate Match</h4>
              <div className="space-y-4">
                {[
                  { name: 'Deepesh Yadav', score: 94, skills: ['React', 'Tailwind', 'Node.js'] },
                  { name: 'Priya Patel', score: 89, skills: ['UI/UX', 'Figma', 'React'] },
                  { name: 'Rahul Kumar', score: 82, skills: ['Python', 'SQL', 'Data Analysis'] },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold">
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{c.name}</p>
                      <div className="flex gap-1 mt-1">
                        {c.skills.map(s => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-emerald-600">{c.score}%</span>
                      <p className="text-[10px] text-slate-500">match</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Credits / Revenue */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Skill Credits & Earnings</h2>
            <p className="mt-4 text-lg text-slate-600">A self-sustaining ecosystem of learning and earning.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowLeftRight className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Teach = Earn Credits</h3>
              <p className="text-sm text-slate-600 mt-2">1 hour of teaching = 1 Skill Credit</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Learn = Spend Credits</h3>
              <p className="text-sm text-slate-600 mt-2">Use credits to learn from other students</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Earn Real Money</h3>
              <p className="text-sm text-slate-600 mt-2">Get paid for micro-internships</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">What students say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Deepesh Y.', role: 'Full-Stack Developer', text: 'SkillSwap helped me learn UI/UX from Priya while teaching her Python. Real peer learning.' },
              { name: 'Priya P.', role: 'UI/UX Designer', text: 'My LearnWorks portfolio got me noticed by 3 design agencies. The micro-internships were invaluable.' },
              { name: 'Rahul K.', role: 'Data Analyst', text: 'I went from knowing just SQL to building full data pipelines in 3 months. The challenges keep me sharp.' },
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">&quot;{t.text}&quot;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to start your career journey?</h2>
          <p className="mt-4 text-lg text-indigo-200">Join thousands of students building real skills and real portfolios.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
              Start Learning Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg hover:bg-indigo-800 transition-colors border border-indigo-500">
              Post a Project
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LW</span>
              </div>
              <span className="font-bold text-white">LearnWorks</span>
            </div>
            <p className="text-sm text-slate-400">Learn. Exchange. Experience. Get Hired.</p>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-white">About</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            &copy; 2025 LearnWorks. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function DollarSign(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
