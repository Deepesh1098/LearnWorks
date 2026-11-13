'use client';

import AppShell from '@/components/layout/app-shell';
import { useAuth } from '@/lib/auth-context';
import { getMicroInternships, getApplications, getPaymentsByUser } from '@/lib/queries';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { BarChart3, TrendingUp } from 'lucide-react';
import { Application, MicroInternship } from '@/types';

export default function BusinessAnalyticsPage() {
  return (
    <AppShell>
      <BusinessAnalyticsContent />
    </AppShell>
  );
}

function BusinessAnalyticsContent() {
  const { user } = useAuth();
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [myProjects, setMyProjects] = useState<MicroInternship[]>([]);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    if (!user?.id) return;
    getMicroInternships().then((list) => setMyProjects(list.filter((mi) => mi.businessId === user.id)));
    getApplications().then(async (apps) => {
      const ids = new Set(myProjects.map((mi) => mi.id));
      setMyApplications(apps.filter((a) => ids.has(a.microInternshipId)));
    });
    getPaymentsByUser(user.id).then((payments) => setTotalSpend(payments.filter((p) => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0)));
  }, [user?.id, myProjects]);

  const completed = myApplications.filter((a) => a.status === 'completed');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-600 mt-1">Track your hiring metrics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: myProjects.length },
          { label: 'Total Applications', value: myApplications.length },
          { label: 'Completed', value: completed.length },
          { label: 'Total Spend', value: `₹${totalSpend.toLocaleString('en-IN')}` },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Application Funnel</h2>
          <div className="space-y-3">
            {['applied', 'shortlisted', 'accepted', 'completed'].map((status, i) => {
              const count = myApplications.filter(a => a.status === status).length;
              const pct = myApplications.length > 0 ? (count / myApplications.length) * 100 : 0;
              return (
                <div key={status} className="flex items-center gap-4">
                  <span className="text-sm text-slate-600 w-24 capitalize">{status.replace('_', ' ')}</span>
                  <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-sm font-medium text-slate-900 w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
