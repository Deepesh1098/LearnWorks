'use client';

import AppShell from '@/components/layout/app-shell';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getPaymentsByUser, getUser } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { formatINR, formatDate } from '@/lib/utils';
import { Payment, User } from '@/types';

interface PaymentWithUser extends Payment { otherUser?: User }

export default function EarningsPage() {
  return (
    <AppShell>
      <EarningsContent />
    </AppShell>
  );
}

function EarningsContent() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [userMap, setUserMap] = useState<Record<string, User>>({});

  useEffect(() => {
    if (!user?.id) return;
    getPaymentsByUser(user.id).then(async (list) => {
      setPayments(list);
      const ids = [...new Set(list.flatMap((p) => [p.fromUserId, p.toUserId]).filter(Boolean))] as string[];
      const users = await Promise.all(ids.map((id) => getUser(id)));
      const map: Record<string, User> = {};
      users.forEach((u) => { if (u) map[u.id] = u; });
      setUserMap(map);
    });
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) getPaymentsByUser(user.id).then(setPayments);
  }, [user?.id]);

  if (!user) return null;

  const receivedPayments = payments.filter(p => p.toUserId === user.id && p.status === 'completed');
  const totalEarned = receivedPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalFees = receivedPayments.reduce((sum, p) => sum + p.platformFee, 0);
  const pendingPayments = payments.filter(p => p.toUserId === user.id && p.status === 'pending');
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Earnings</h1>
        <p className="text-sm text-slate-600 mt-1">Track your micro-internship earnings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Earned', value: formatINR(totalEarned), icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Platform Fees', value: formatINR(totalFees), icon: TrendingUp, color: 'text-slate-600 bg-slate-50' },
          { label: 'Pending', value: formatINR(totalPending), icon: Clock, color: 'text-amber-600 bg-amber-50' },
          { label: 'Net Earnings', value: formatINR(totalEarned - totalFees), icon: ArrowUpRight, color: 'text-indigo-600 bg-indigo-50' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Breakdown */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Revenue Model</h2>
          <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-700"><strong>Platform Commission:</strong> 10% on micro-internship projects</p>
            <div className="text-sm text-slate-600 space-y-1">
              <p>Example: Business pays ₹10,000</p>
              <p className="ml-4">→ Student receives: ₹9,000</p>
              <p className="ml-4">→ LearnWorks fee: ₹1,000</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Transaction History</h2>
          {payments.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">No transactions yet.</p>
          ) : (
            <div className="space-y-3">
              {payments.map(payment => {
                const otherUserId = payment.fromUserId === user.id ? payment.toUserId : payment.fromUserId;
                const otherUser = userMap[otherUserId];
                const isReceived = payment.toUserId === user.id;

                return (
                  <div key={payment.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isReceived ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                      {isReceived ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{payment.context}</p>
                      <p className="text-xs text-slate-500">{isReceived ? `From ${otherUser?.name}` : `To ${otherUser?.name}`} • {formatDate(payment.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${isReceived ? 'text-emerald-600' : 'text-red-600'}`}>
                        {isReceived ? '+' : '-'}{formatINR(payment.amount)}
                      </p>
                      <p className="text-xs text-slate-500">Fee: {formatINR(payment.platformFee)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
