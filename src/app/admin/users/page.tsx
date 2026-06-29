'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Users, Search, RefreshCw, ShieldCheck, Mail, Phone, MapPin, Calendar, ArrowLeft, AlertCircle, Sparkles, UserCheck } from 'lucide-react';
import Link from 'next/link';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  created_at: string;
}

export default function RealtimeUsersAdminPage() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProfiles(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } else {
      console.error('Error fetching registered users:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user && ['ADMIN', 'SALES', 'SUPPORT', 'SUPER_ADMIN'].includes(user.role)) {
      fetchUsers();

      // Realtime subscription to user_profiles changes
      const channel = supabase
        .channel('realtime-user-profiles')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'user_profiles' },
          (payload) => {
            console.log('Realtime user change received:', payload);
            fetchUsers();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  if (!user || !['ADMIN', 'SALES', 'SUPPORT', 'SUPER_ADMIN'].includes(user.role)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-danger-500 mb-4" />
        <h2 className="text-2xl font-display font-bold text-navy-900">Restricted Enterprise Access Gate</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md">
          This portal is reserved for authorized Tejomay Group personnel. Please sign in with admin credentials.
        </p>
        <Link href="/login" className="mt-6 btn-gold px-6 py-2.5 rounded-xl font-bold text-sm shadow-md">
          Return to Client Gate
        </Link>
      </div>
    );
  }

  const filteredUsers = profiles.filter((p) => {
    const term = searchQuery.toLowerCase();
    return (
      (p.full_name || '').toLowerCase().includes(term) ||
      (p.email || '').toLowerCase().includes(term) ||
      (p.phone || '').toLowerCase().includes(term) ||
      (p.city || '').toLowerCase().includes(term) ||
      (p.state || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-navy-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Admin Command Center
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 flex items-center gap-3">
              Realtime Registered Users
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-success-500"></span>
              </span>
            </h1>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Live database sync from Supabase Backend (<code className="font-semibold text-navy-900">user_profiles</code> table).
          </p>
        </div>

        <div className="flex items-center gap-3 self-stretch sm:self-auto">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="btn-gold px-4 py-2.5 rounded-xl font-bold text-sm shadow flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Live Data</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-navy-900 text-ivory-50 p-6 rounded-3xl border border-gold-500/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Users className="w-24 h-24" />
          </div>
          <div className="text-xs text-gold-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-gold-400" /> Total Registered Clients
          </div>
          <div className="text-4xl font-display font-bold mt-2 text-ivory-50">
            {profiles.length}
          </div>
          <div className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-success-400" /> Enterprise verified accounts
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Database Status</div>
            <div className="text-xl font-bold text-navy-900 mt-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-success-500 animate-pulse" /> Connected & Syncing
            </div>
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Last synced: {lastUpdated || 'Just now'}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quick Filter</div>
            <div className="text-xl font-bold text-navy-900 mt-1">
              {filteredUsers.length} <span className="text-sm font-medium text-slate-500">matching query</span>
            </div>
          </div>
          <div className="text-xs text-gold-600 font-semibold mt-2">
            Realtime websocket connection active
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users by name, email, phone, city..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
          />
        </div>
        <div className="text-xs font-semibold text-slate-500">
          Showing {filteredUsers.length} of {profiles.length} users
        </div>
      </div>

      {/* Users Table / List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {loading && profiles.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-gold-500" />
            <p className="font-semibold">Loading live registered users from Supabase...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="font-bold text-navy-900 text-lg">No Users Found</p>
            <p className="text-xs mt-1">Try refining your search query or registering a new user.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  <th className="p-4 pl-6">Client Name</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Location / Address</th>
                  <th className="p-4">Registered On</th>
                  <th className="p-4 pr-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredUsers.map((profile) => (
                  <tr key={profile.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-navy-900 text-gold-300 font-bold flex items-center justify-center shrink-0 shadow-sm border border-gold-500/30">
                          {(profile.full_name || 'U')[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-navy-900">{profile.full_name || 'Anonymous User'}</div>
                          <div className="text-xs text-slate-400 font-mono">ID: {profile.id.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-medium">{profile.email}</span>
                        </div>
                        {profile.phone && (
                          <div className="flex items-center gap-2 text-slate-600 text-xs">
                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{profile.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-start gap-2 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium">{profile.city || 'N/A'}, {profile.state || ''}</div>
                          <div className="text-xs text-slate-400 line-clamp-1">{profile.address || 'No street address provided'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{profile.created_at ? new Date(profile.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently'}</span>
                      </div>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <span className="inline-flex items-center gap-1 bg-success-500/10 text-success-600 px-2.5 py-1 rounded-full text-xs font-bold border border-success-500/20">
                        <UserCheck className="w-3 h-3" /> Active Client
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
