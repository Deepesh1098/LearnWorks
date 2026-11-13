'use client';

import AppShell from '@/components/layout/app-shell';
import { getAllUsers } from '@/lib/queries';
import Card from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import Badge from '@/components/ui/badge';
import Avatar from '@/components/ui/avatar';
import { Users, Search } from 'lucide-react';
import { User } from '@/types';
import { useEffect, useState } from 'react';

export default function AdminUsersPage() {
  return (
    <AppShell>
      <AdminUsersContent />
    </AppShell>
  );
}

function AdminUsersContent() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const filteredUsers = users.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
        <p className="text-sm text-slate-600 mt-1">Manage platform users</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm"
          />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg text-sm">
          <option value="all">All Roles</option>
          <option value="student">Students</option>
          <option value="business">Businesses</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">User</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Email</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Role</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Location</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{u.name}</p>
                        <p className="text-xs text-slate-500">@{u.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{u.email}</td>
                  <td className="px-6 py-4">
                    <Badge variant={u.role === 'admin' ? 'danger' : u.role === 'business' ? 'warning' : 'info'}>{u.role}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{u.location}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{u.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
