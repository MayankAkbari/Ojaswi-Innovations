'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles, CheckCircle2, Clock, ShieldCheck, AlertCircle, Phone, FileText, ArrowRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const STAGES = [
  { id: 1, name: 'Payment & Brief Approved', desc: '50% deposit confirmed. Project brief logged.' },
  { id: 2, name: 'Content & Assets Collection', desc: 'Logos, text copy, and reference images gathered.' },
  { id: 3, name: '48-Hour Architecture Sprint', desc: 'Next.js responsive coding and UI styling active.' },
  { id: 4, name: 'Client Review & Modifications', desc: 'Staging link delivered. Free modifications window open.' },
  { id: 5, name: 'Live Deployment Handover', desc: 'Domain DNS connected. SSL certificate active.' }
];

export default function CustomerDashboardPage() {
  const { user } = useAuth();
  const [currentStage, setCurrentStage] = useState(1);
  const [trackerNote, setTrackerNote] = useState('');
  const [amcRequested, setAmcRequested] = useState(false);

  useEffect(() => {
    if (user) {
      supabase.from('project_trackers').select('*').then(({ data }) => {
        if (data && data.length > 0) {
          const tr = data.find(t => t.client_name === user.fullName) || data[0];
          if (tr) {
            setCurrentStage(tr.stage || 1);
            setTrackerNote(tr.notes || '');
          }
        }
      });
    }
  }, [user]);

  if (!user) {
    return null; // AuthGate will redirect
  }

  return (
    <div className="space-y-12 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Welcome Bar */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-ivory-50 p-8 sm:p-12 rounded-3xl border border-gold-500/30 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-gold-500/30">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" /> Enterprise Client Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold">
            Welcome back, {user.fullName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Client ID: <strong className="text-gold-300">OJ-2026-CUST1</strong> &bull; Registered Phone: {user.phone}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            href="/packages"
            className="btn-gold px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-center shadow-lg flex items-center justify-center gap-2"
          >
            + New Proposal
          </Link>
          <a
            href="https://wa.me/917069424393"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 text-ivory-50 border border-white/20 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-center transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-gold-400" /> Contact Manager
          </a>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="border-l-4 border-l-gold-500">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Architecture</div>
          <div className="text-2xl font-display font-bold text-navy-900 mt-1">The Someshwar Package</div>
          <div className="text-xs text-gold-600 font-semibold mt-2 flex items-center gap-1">
            <span>Chaturyug Edition (4 Years Hosting)</span>
          </div>
        </GlassCard>

        <GlassCard className="border-l-4 border-l-success-500">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">AMC Protection Status</div>
          <div className="text-2xl font-display font-bold text-success-600 mt-1">Active @ ₹5,500/yr</div>
          <div className="text-xs text-slate-500 mt-2">Independence Day Rate Locked &bull; Valid till Aug 2030</div>
        </GlassCard>

        <GlassCard className="border-l-4 border-l-navy-900">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Free Changes Window</div>
          <div className="text-2xl font-display font-bold text-navy-900 mt-1">5 Months Remaining</div>
          <div className="text-xs text-slate-500 mt-2">Unlimited text & price updates active via WhatsApp</div>
        </GlassCard>
      </div>

      {/* Live Project Tracker Stepper */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-2xl font-display font-bold text-navy-900">Live Project Tracker</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Real-time status of your custom website build powered by Supabase.</p>
          </div>
          <div className="flex items-center gap-2 bg-navy-900 text-gold-300 px-3 py-1.5 rounded-lg text-xs font-bold">
            <Clock className="w-4 h-4 text-gold-400 animate-spin" /> Stage {currentStage}: {STAGES.find(s => s.id === currentStage)?.name || 'In Progress'}
          </div>
        </div>

        {/* Stepper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {STAGES.map((s) => {
            const isCompleted = s.id < currentStage;
            const isCurrent = s.id === currentStage;

            return (
              <div
                key={s.id}
                className={`p-5 rounded-2xl border transition-all relative ${
                  isCurrent
                    ? 'bg-navy-900 text-ivory-50 border-gold-500 shadow-xl scale-105 z-10'
                    : isCompleted
                    ? 'bg-success-500/10 border-success-500/30 text-navy-900'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                    isCurrent ? 'bg-gold-500 text-navy-900' : isCompleted ? 'bg-success-500 text-ivory-50' : 'bg-slate-200 text-slate-600'
                  }`}>
                    Stage 0{s.id}
                  </span>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-success-500" />}
                </div>
                <div className={`font-display font-bold text-sm sm:text-base ${isCurrent ? 'text-gold-300' : ''}`}>
                  {s.name}
                </div>
                <p className={`text-xs mt-1 leading-snug ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stage Detailed Action Box */}
        <div className="bg-navy-900/5 border border-navy-900/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-navy-900 flex items-center justify-center sm:justify-start gap-2">
              <AlertCircle className="w-5 h-5 text-gold-600" /> Project Manager Update
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              {trackerNote || 'Your project sprint is actively progressing according to the Tejomay Group SLA timeline.'}
            </p>
          </div>
          <a
            href={`https://wa.me/917069424393?text=${encodeURIComponent(`Hello Team, I am viewing my Stage ${currentStage} update on my dashboard. I have a quick question...`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold py-3 px-6 rounded-xl font-bold text-xs sm:text-sm shrink-0 shadow-md"
          >
            Submit Feedback on WhatsApp &rarr;
          </a>
        </div>
      </div>

      {/* AMC Renewal Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <GlassCard className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <div className="inline-block bg-gold-500/20 text-gold-600 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase mb-1 border border-gold-500/30">
              Fixed Price Protection
            </div>
            <h3 className="text-xl font-display font-bold text-navy-900">Manage Annual Maintenance Contract</h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Current Plan:</span>
              <strong className="text-navy-900">Chaturyug Edition (Hosting Included)</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Locked AMC Rate:</span>
              <strong className="text-success-600 font-bold">₹5,500 / year (Reg. ₹8,996)</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Next Renewal Date:</span>
              <strong className="text-navy-900">August 20, 2030</strong>
            </div>
          </div>

          {amcRequested ? (
            <div className="bg-success-500/10 border border-success-500/30 p-4 rounded-xl text-center text-xs font-semibold text-success-600">
              ✅ Renewal Ticket Logged! Our account manager will send the formal GST invoice before the expiration date.
            </div>
          ) : (
            <button
              onClick={() => setAmcRequested(true)}
              className="w-full py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-ivory-50 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <RefreshCw className="w-4 h-4 text-gold-400" /> Request AMC Extension / Invoice
            </button>
          )}
        </GlassCard>

        {/* Dedicated Account Manager Box */}
        <div className="bg-gradient-to-br from-navy-900 to-navy-800 text-ivory-50 p-8 rounded-3xl border border-gold-500/30 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-gold-400">VIP Direct Access</div>
            <h3 className="text-2xl font-display font-bold">Need Immediate Modifications?</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              As a valued Ojaswi client, you never wait in queue. Your dedicated project executive is available on WhatsApp 24×7 to handle catalog updates or DNS changes.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <div className="font-bold text-ivory-50 text-sm">+91 70694 24393</div>
              <div className="text-xs text-slate-400">Ahmedabad Engineering Desk</div>
            </div>
            <a
              href="https://wa.me/917069424393"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold py-2.5 px-5 rounded-xl font-bold text-xs shadow-md"
            >
              Open Chat
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
