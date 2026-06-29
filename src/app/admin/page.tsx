'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles, Users, FileText, CheckCircle2, Clock, ShieldCheck, Star, ArrowRight, RefreshCw, AlertCircle, Edit } from 'lucide-react';
import Link from 'next/link';

export default function AdminPortalPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'kpi' | 'leads' | 'tracker' | 'reviews'>('kpi');

  // Live Supabase State
  const [leads, setLeads] = useState<any[]>([]);
  const [trackers, setTrackers] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Tracker Control State
  const [selectedLeadId, setSelectedLeadId] = useState<string>('');
  const [trackerStage, setTrackerStage] = useState(1);
  const [trackerNote, setTrackerNote] = useState('');

  const fetchData = async () => {
    setLoadingData(true);
    const { data: leadsData } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    const { data: reviewsData } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    const { data: trackersData } = await supabase.from('project_trackers').select('*');

    if (leadsData) {
      setLeads(leadsData);
      if (leadsData.length > 0 && !selectedLeadId) {
        const firstId = leadsData[0].id;
        setSelectedLeadId(firstId);
        const tr = trackersData?.find(t => t.lead_id === firstId);
        if (tr) {
          setTrackerStage(tr.stage || 1);
          setTrackerNote(tr.notes || '');
        } else {
          setTrackerStage(1);
          setTrackerNote('');
        }
      }
    }
    if (reviewsData) setReviews(reviewsData);
    if (trackersData) setTrackers(trackersData);
    setLoadingData(false);
  };

  useEffect(() => {
    if (user && ['ADMIN', 'SALES', 'SUPPORT', 'SUPER_ADMIN'].includes(user.role)) {
      fetchData();
    }
  }, [user]);

  if (!user || !['ADMIN', 'SALES', 'SUPPORT', 'SUPER_ADMIN'].includes(user.role)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-danger-500 mb-4" />
        <h2 className="text-2xl font-display font-bold text-navy-900">Restricted Enterprise Access Gate</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md">
          This CRM suite is reserved for authorized Tejomay Group personnel. Please sign in with authorized admin credentials.
        </p>
        <Link href="/login" className="mt-6 btn-gold px-6 py-2.5 rounded-xl font-bold text-sm shadow-md">
          Return to Client Gate
        </Link>
      </div>
    );
  }

  const approveLead = async (id: string) => {
    await supabase.from('leads').update({ status: 'APPROVED' }).eq('id', id);
    fetchData();
  };

  const toggleReviewStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'APPROVED' ? 'PENDING' : 'APPROVED';
    await supabase.from('reviews').update({ status: newStatus }).eq('id', id);
    fetchData();
  };

  const handleUpdateTracker = async () => {
    if (!selectedLeadId) return alert('Please select a client project lead first.');
    const lead = leads.find(l => l.id === selectedLeadId);
    if (!lead) return;

    const existing = trackers.find(t => t.lead_id === selectedLeadId);
    if (existing) {
      await supabase.from('project_trackers').update({
        stage: trackerStage,
        notes: trackerNote,
        updated_at: new Date().toISOString()
      }).eq('id', existing.id);
    } else {
      await supabase.from('project_trackers').insert({
        id: `trk-${Date.now()}`,
        lead_id: selectedLeadId,
        client_name: lead.client_name || lead.company_name || 'Valued Client',
        stage: trackerStage,
        notes: trackerNote
      });
    }
    alert(`Project Tracker successfully updated to Stage ${trackerStage} for client ${lead.client_name || 'Valued Client'}!`);
    fetchData();
  };

  // Dynamic KPI Calculations
  const totalRevenue = leads.filter(l => l.status === 'APPROVED').reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const approvedCount = leads.filter(l => l.status === 'APPROVED').length;
  const pendingCount = leads.filter(l => l.status === 'PENDING').length;
  const amcPipeline = approvedCount * 5500;

  return (
    <div className="space-y-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-navy-900 text-ivory-50 p-8 sm:p-10 rounded-3xl border border-gold-500/40 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-gold-500 text-navy-900 font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-2">
            🛡️ Administrative Command Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold flex items-center gap-3">
            Tejomay Group CRM Portal
            <button onClick={fetchData} title="Refresh Live Data" className="p-1.5 hover:bg-white/10 rounded-full text-gold-400 transition-colors">
              <RefreshCw className={`w-5 h-5 ${loadingData ? 'animate-spin' : ''}`} />
            </button>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Logged in as: <strong className="text-gold-300">{user.fullName}</strong> ({user.role}) &bull; Connected to Live Supabase Backend
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 bg-navy-800 p-1.5 rounded-2xl border border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('kpi')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'kpi' ? 'bg-gold-500 text-navy-900 shadow-md' : 'text-slate-300 hover:text-ivory-50'}`}
          >
            📊 KPI Overview
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'leads' ? 'bg-gold-500 text-navy-900 shadow-md' : 'text-slate-300 hover:text-ivory-50'}`}
          >
            📥 Leads ({pendingCount})
          </button>
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'tracker' ? 'bg-gold-500 text-navy-900 shadow-md' : 'text-slate-300 hover:text-ivory-50'}`}
          >
            🚀 Progress Board
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'reviews' ? 'bg-gold-500 text-navy-900 shadow-md' : 'text-slate-300 hover:text-ivory-50'}`}
          >
            ⭐ Reviews ({reviews.filter(r => r.status === 'PENDING').length})
          </button>
          <Link
            href="/admin/users"
            className="px-4 py-2 rounded-xl transition-all bg-navy-950 text-gold-400 hover:bg-gold-500 hover:text-navy-900 border border-gold-500/30 flex items-center gap-1.5 shadow-sm"
          >
            👥 Registered Users <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
          </Link>
        </div>
      </div>

      {/* TAB 1: KPI OVERVIEW */}
      {activeTab === 'kpi' && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <GlassCard className="border-t-4 border-t-gold-500">
              <div className="text-xs font-bold uppercase text-slate-400">Total Active Revenue</div>
              <div className="text-3xl font-display font-extrabold text-navy-900 mt-1">₹{totalRevenue.toLocaleString('en-IN')}</div>
              <div className="text-xs text-success-600 font-semibold mt-2">Live from approved orders</div>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-success-500">
              <div className="text-xs font-bold uppercase text-slate-400">Approved Orders</div>
              <div className="text-3xl font-display font-extrabold text-navy-900 mt-1">{approvedCount} Active</div>
              <div className="text-xs text-slate-500 mt-2">100% SLA compliance (48h)</div>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-navy-900">
              <div className="text-xs font-bold uppercase text-slate-400">Pending Lead Proposals</div>
              <div className="text-3xl font-display font-extrabold text-navy-900 mt-1">{pendingCount} Leads</div>
              <div className="text-xs text-gold-600 font-semibold mt-2">Awaiting conversion sign-off</div>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-gold-500">
              <div className="text-xs font-bold uppercase text-slate-400">AMC Renewal Pipeline</div>
              <div className="text-3xl font-display font-extrabold text-navy-900 mt-1">₹{amcPipeline.toLocaleString('en-IN')}</div>
              <div className="text-xs text-slate-500 mt-2">Locked @ ₹5,500/yr rate</div>
            </GlassCard>
          </div>

          {/* Quick System Config Box */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-display font-bold text-navy-900">Independence Day AMC Offer Banner</h3>
              <p className="text-xs text-slate-500 mt-1">Currently displaying promotional pricing of ₹5,500/yr across all public pages.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold bg-success-500/10 text-success-600 px-3 py-1.5 rounded-full border border-success-500/20">
                ● Campaign Active (Expires 20 Aug 2026)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROPOSAL LEADS MANAGER */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in">
          <div className="p-6 sm:p-8 border-b border-slate-200 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-display font-bold text-navy-900">Inquiry & Proposal Leads</h3>
              <p className="text-xs text-slate-500 mt-1">Convert downloaded PDF proposals and live inquiries into active production orders.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                  <th className="p-4 sm:p-6 font-bold">Client / Company</th>
                  <th className="p-4 sm:p-6 font-bold">Package Tier</th>
                  <th className="p-4 sm:p-6 font-bold">Investment</th>
                  <th className="p-4 sm:p-6 font-bold">Status</th>
                  <th className="p-4 sm:p-6 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm text-navy-900">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-500">
                      No leads or proposal inquiries found yet. New client inquiries will automatically appear here.
                    </td>
                  </tr>
                ) : (
                  leads.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 sm:p-6">
                        <div className="font-bold">{l.client_name || 'Valued Client'}</div>
                        <div className="text-xs text-slate-500">{l.company_name || 'Individual Inquiry'} &bull; {l.created_at ? new Date(l.created_at).toLocaleDateString() : 'Today'}</div>
                      </td>
                      <td className="p-4 sm:p-6 font-medium">{l.package_name}</td>
                      <td className="p-4 sm:p-6 font-bold">₹{Number(l.amount || 0).toLocaleString('en-IN')}</td>
                      <td className="p-4 sm:p-6">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          l.status === 'APPROVED' ? 'bg-success-500/10 text-success-600 border border-success-500/20' : 'bg-gold-500/20 text-gold-600 border border-gold-500/30'
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="p-4 sm:p-6 text-right">
                        {l.status === 'PENDING' ? (
                          <button
                            onClick={() => approveLead(l.id)}
                            className="btn-gold px-4 py-1.5 rounded-lg text-xs font-bold shadow-md"
                          >
                            Approve to Customer
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 font-semibold">Active Order</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PROGRESS TRACKER CONTROLLER */}
      {activeTab === 'tracker' && (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8 animate-fade-in">
          <div>
            <h3 className="text-xl font-display font-bold text-navy-900">
              Manage Client Stage: {selectedLeadId ? leads.find(l => l.id === selectedLeadId)?.client_name || 'Selected Client' : 'No Client Selected'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">Adjusting the stage below instantly updates the client&apos;s customer dashboard.</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Select Active Client Project</label>
            <select
              value={selectedLeadId}
              onChange={(e) => {
                const newId = e.target.value;
                setSelectedLeadId(newId);
                const tr = trackers.find(t => t.lead_id === newId);
                if (tr) {
                  setTrackerStage(tr.stage || 1);
                  setTrackerNote(tr.notes || '');
                } else {
                  setTrackerStage(1);
                  setTrackerNote('');
                }
              }}
              className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
            >
              <option value="">-- Select a Client Lead --</option>
              {leads.map(l => (
                <option key={l.id} value={l.id}>{l.client_name || 'Client'} ({l.company_name || l.package_name}) [{l.status}]</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((stg) => (
              <button
                key={stg}
                disabled={!selectedLeadId}
                onClick={() => setTrackerStage(stg)}
                className={`p-4 rounded-2xl border font-bold text-sm transition-all ${!selectedLeadId ? 'opacity-50 cursor-not-allowed' : ''} ${
                  trackerStage === stg
                    ? 'bg-navy-900 text-ivory-50 border-gold-500 shadow-xl scale-105'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                Stage 0{stg}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Project Manager Update Note</label>
            <textarea
              rows={3}
              disabled={!selectedLeadId}
              value={trackerNote}
              onChange={(e) => setTrackerNote(e.target.value)}
              placeholder={selectedLeadId ? 'Enter progress update note for client...' : 'Select a client above to enter notes...'}
              className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white disabled:opacity-50"
            />
            <button
              disabled={!selectedLeadId}
              onClick={handleUpdateTracker}
              className="mt-4 btn-gold px-6 py-2.5 rounded-xl font-bold text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Broadcast Update to Client Dashboard
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: REVIEWS MODERATION */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in">
          <div className="p-6 sm:p-8 border-b border-slate-200">
            <h3 className="text-xl font-display font-bold text-navy-900">Moderate Client Testimonials</h3>
            <p className="text-xs text-slate-500 mt-1">Approve feedback before it is featured live on the public reviews page.</p>
          </div>

          <div className="divide-y divide-slate-200">
            {reviews.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-sm">No client reviews found. New submissions will appear here for moderation.</div>
            ) : (
              reviews.map((r) => (
                <div key={r.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="space-y-1 max-w-2xl">
                    <div className="font-bold text-navy-900 text-sm flex items-center gap-2">
                      {r.name}
                      {r.role && <span className="text-xs text-slate-400 font-normal">({r.role})</span>}
                    </div>
                    <p className="text-xs text-slate-600 italic">&ldquo;{r.text}&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                      r.status === 'APPROVED' ? 'bg-success-500/10 text-success-600 border border-success-500/20' : 'bg-gold-500/20 text-gold-600 border border-gold-500/30'
                    }`}>
                      {r.status}
                    </span>
                    <button
                      onClick={() => toggleReviewStatus(r.id, r.status)}
                      className="border border-slate-300 hover:bg-slate-100 text-navy-900 px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                    >
                      {r.status === 'APPROVED' ? 'Move to Pending' : 'Approve Live'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
}
