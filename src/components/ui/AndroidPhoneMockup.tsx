'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, TrendingUp, MessageSquare, Shield, Smartphone } from 'lucide-react';

export const AndroidPhoneMockup: React.FC = () => {
  const [leadCount, setLeadCount] = useState(28);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeadCount((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-[280px] sm:w-[310px] select-none py-4 group">
      {/* Outer Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/30 via-blue-500/20 to-gold-400/30 rounded-[50px] blur-2xl group-hover:blur-3xl transition-all duration-700 animate-pulse" />

      {/* Titanium Phone Frame */}
      <div className="relative rounded-[46px] bg-gradient-to-b from-slate-700 via-slate-900 to-black p-[3px] shadow-2xl ring-1 ring-white/20 transition-transform duration-500 group-hover:-translate-y-2">
        {/* Inner bezel */}
        <div className="relative rounded-[43px] bg-navy-950 p-3 overflow-hidden border border-slate-800 text-left">
          
          {/* Top Speaker & Punch Hole Camera */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/80 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md shadow-sm">
            <div className="w-2 h-2 rounded-full bg-slate-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-blue-950 border border-blue-500/50 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-400 animate-ping" />
            </div>
          </div>

          {/* App Status Bar */}
          <div className="flex items-center justify-between px-3 pt-4 pb-2 text-[10px] font-semibold text-slate-400">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-gold-400">
              <span className="text-[9px] bg-gold-500/20 px-1.5 py-0.5 rounded font-bold">5G</span>
              <span>100%</span>
            </div>
          </div>

          {/* App Header */}
          <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-3 border border-gold-500/30 shadow-md mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow">
                <img src="/logo-doc.png" alt="Ojaswi App" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-xs font-bold text-ivory-50 flex items-center gap-1">
                  Ojaswi App <Sparkles className="w-3 h-3 text-gold-400 fill-current" />
                </div>
                <div className="text-[10px] text-gold-300">Enterprise v2.4</div>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-success-500/20 border border-success-500/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
            </div>
          </div>

          {/* Interactive Screen Content */}
          <div className="space-y-2.5 px-1 pb-3">
            {/* Welcome Banner */}
            <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
              <div className="text-[10px] text-slate-400">Client Portal Synchronized</div>
              <div className="text-xs font-bold text-ivory-50 mt-0.5 flex items-center justify-between">
                <span>Shree Fabrics Pvt Ltd</span>
                <span className="text-[9px] bg-success-500/20 text-success-400 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Live
                </span>
              </div>
            </div>

            {/* Live Analytics Animated Card */}
            <div className="bg-gradient-to-br from-gold-500/15 to-transparent rounded-xl p-3 border border-gold-500/30 shadow-inner relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gold-300 mb-1">
                <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> Lead Velocity</span>
                <span className="text-xs font-extrabold text-ivory-50 animate-bounce">+{leadCount} Today</span>
              </div>
              
              {/* Simulated mini progress chart */}
              <div className="h-12 flex items-end gap-1.5 pt-2 px-1">
                {[40, 65, 45, 80, 55, 90, 75, 100].map((val, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${val}%` }}
                    className="flex-1 bg-gradient-to-t from-gold-600 to-gold-400 rounded-t-sm transition-all duration-500 hover:opacity-80"
                  />
                ))}
              </div>
            </div>

            {/* Notification Toast Animation */}
            <div className="bg-navy-800/90 rounded-xl p-2.5 border border-blue-500/30 flex items-center gap-2 shadow-lg animate-fade-in">
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-ivory-50 truncate">New WhatsApp Inquiry!</div>
                <div className="text-[9px] text-slate-300 truncate">&ldquo;Looking for 48h ecommerce delivery...&rdquo;</div>
              </div>
              <span className="text-[8px] bg-gold-500 text-navy-900 font-extrabold px-1.5 py-0.5 rounded">Just now</span>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-white/10 hover:bg-white/15 transition-colors rounded-xl p-2 text-center border border-white/10 cursor-pointer">
                <Shield className="w-3.5 h-3.5 text-gold-400 mx-auto mb-1" />
                <div className="text-[10px] font-bold text-ivory-50">SLA Shield</div>
                <div className="text-[8px] text-slate-400">100% Protected</div>
              </div>
              <div className="bg-gold-500/20 hover:bg-gold-500/30 transition-colors rounded-xl p-2 text-center border border-gold-500/40 cursor-pointer">
                <Smartphone className="w-3.5 h-3.5 text-gold-300 mx-auto mb-1" />
                <div className="text-[10px] font-bold text-gold-300">App Builder</div>
                <div className="text-[8px] text-gold-400/80">Coming Soon</div>
              </div>
            </div>
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="pt-2 pb-1 flex justify-center">
            <div className="w-24 h-1 bg-slate-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
