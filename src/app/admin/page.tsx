'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles, Users, FileText, CheckCircle2, Clock, ShieldCheck, Star, ArrowRight, RefreshCw, AlertCircle, Edit } from 'lucide-react';
import Link from 'next/link';

export default function AdminPortalPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'kpi' | 'leads' | 'tracker' | 'reviews'>('kpi');

  // Demo State for Admin Management
  const [leads, setLeads] = useState([
    { id: 'lead-101', name: 'Rajesh Bhai Patel', company: 'Tejomay Tower Retail', package: 'Someshwar (Chaturyug)', amount: 47985, status: 'APPROVED', date: '28 Jun 2026' },
    { id: 'lead-102', name: 'Ananya Sharma', company: 'Vogue Spaces Studio', package: 'Adityanarayan (Prarambh)', amount: 46985, status: 'PENDING', date: '28 Jun 2026' },
    { id: 'lead-103', name: 'Dr. Arvind Patel', company: 'Aarogya Hospital', package: 'Trivikram (Chaturyug ⭐)', amount: 76985, status: 'APPROVED', date: '27 Jun 2026' }
  ]);

  const [trackerStage, setTrackerStage] = useState(4);
  const [trackerNote, setTrackerNote] = useState('Initial homepage and services pages completed in 36 hours. Awaiting client review on logo alignment.');

  const [reviews, setReviews] = useState([
    { id: 'rev-1', name: 'Vikram Shah', text: 'Ojaswi delivered our textile export portal in exactly 44 hours. Increased WhatsApp leads by 300%!', status: 'APPROVED', featured: true },
    { id: 'rev-2', name: 'Meena Mehta', text: 'Free post-delivery modifications saved us when updating Diwali catalogs. Lowest AMC in Gujarat!', status: 'APPROVED', featured: true },
    { id: 'rev-3', name: 'Amit Desai', text: 'Phenomenal loading speed and clean Next.js coding. Will definitely renew AMC next year.', status: 'PENDING', featured: false }
  ]);

  if (!user || !['ADMIN', 'SALES', 'SUPPORT', 'SUPER_ADMIN'].includes(user.role)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-danger-500 mb-4" />
        <h2 className="text-2xl font-display font-bold text-navy-900">Restricted Enterprise Access Gate</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md">
          This CRM suite is reserved for authorized Tejomay Group personnel. Please sign in with admin demo credentials.
        </p>
        <Link href="/login" className="mt-6 btn-gold px-6 py-2.5 rounded-xl font-bold text-sm shadow-md">
          Return to Client Gate
        </Link>
      </div>
    );
  }

  const approveLead = (id: string) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: 'APPROVED' } : l));
  };

  const toggleReviewStatus = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: r.status === 'APPROVED' ? 'PENDING' : 'APPROVED' } : r));
  };

  return (
    <div className="space-y-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-navy-900 text-ivory-50 p-8 sm:p-10 rounded-3xl border border-gold-500/40 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-gold-500 text-navy-900 font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-2">
            🛡️ Administrative Command Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold">
            Tejomay Group CRM Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Logged in as: <strong className="text-gold-300">{user.fullName}</strong> ({user.role}) &bull; Ahmedabad HQ
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
            📥 Leads ({leads.filter(l => l.status === 'PENDING').length})
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
            ⭐ Reviews
          </button>
        </div>
      </div>

      {/* TAB 1: KPI OVERVIEW */}
      {activeTab === 'kpi' && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <GlassCard className="border-t-4 border-t-gold-500">
              <div className="text-xs font-bold uppercase text-slate-400">Total Active Revenue</div>
              <div className="text-3xl font-display font-extrabold text-navy-900 mt-1">₹1,71,955</div>
              <div className="text-xs text-success-600 font-semibold mt-2">↑ 42% vs last month</div>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-success-500">
              <div className="text-xs font-bold uppercase text-slate-400">Approved Orders</div>
              <div className="text-3xl font-display font-extrabold text-navy-900 mt-1">24 Active</div>
              <div className="text-xs text-slate-500 mt-2">100% SLA compliance (48h)</div>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-navy-900">
              <div className="text-xs font-bold uppercase text-slate-400">Pending Lead Proposals</div>
              <div className="text-3xl font-display font-extrabold text-navy-900 mt-1">12 Leads</div>
              <div className="text-xs text-gold-600 font-semibold mt-2">Awaiting conversion sign-off</div>
            </GlassCard>

            <GlassCard className="border-t-4 border-t-gold-500">
              <div className="text-xs font-bold uppercase text-slate-400">AMC Renewal Pipeline</div>
              <div className="text-3xl font-display font-extrabold text-navy-900 mt-1">₹1,32,000</div>
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
              <p className="text-xs text-slate-500 mt-1">Convert downloaded PDF proposals into active production orders.</p>
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
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-6">
                      <div className="font-bold">{l.name}</div>
                      <div className="text-xs text-slate-500">{l.company} &bull; {l.date}</div>
                    </td>
                    <td className="p-4 sm:p-6 font-medium">{l.package}</td>
                    <td className="p-4 sm:p-6 font-bold">₹{l.amount.toLocaleString('en-IN')}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PROGRESS TRACKER CONTROLLER */}
      {activeTab === 'tracker' && (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8 animate-fade-in">
          <div>
            <h3 className="text-xl font-display font-bold text-navy-900">Manage Client Stage: Rajesh Bhai Patel (OJ-2026-CUST1)</h3>
            <p className="text-xs text-slate-500 mt-1">Adjusting the stage below instantly updates the client&apos;s customer dashboard.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((stg) => (
              <button
                key={stg}
                onClick={() => setTrackerStage(stg)}
                className={`p-4 rounded-2xl border font-bold text-sm transition-all ${
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
              value={trackerNote}
              onChange={(e) => setTrackerNote(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
            />
            <button
              onClick={() => alert(`Project Tracker updated to Stage ${trackerStage} for client Rajesh Bhai Patel!`)}
              className="mt-4 btn-gold px-6 py-2.5 rounded-xl font-bold text-sm shadow-md"
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
            {reviews.map((r) => (
              <div key={r.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="font-bold text-navy-900 text-sm">{r.name}</div>
                  <p className="text-xs text-slate-600 italic">&ldquo;{r.text}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                    r.status === 'APPROVED' ? 'bg-success-500/10 text-success-600' : 'bg-gold-500/20 text-gold-600'
                  }`}>
                    {r.status}
                  </span>
                  <button
                    onClick={() => toggleReviewStatus(r.id)}
                    className="border border-slate-300 hover:bg-slate-100 text-navy-900 px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                  >
                    {r.status === 'APPROVED' ? 'Move to Pending' : 'Approve Live'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
