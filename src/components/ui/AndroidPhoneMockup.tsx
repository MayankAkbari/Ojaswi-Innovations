'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, TrendingUp, MessageSquare, Shield, Smartphone, Wifi, BatteryCharging } from 'lucide-react';

export const AndroidPhoneMockup: React.FC = () => {
  const [leadCount, setLeadCount] = useState(34);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeadCount((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-[290px] sm:w-[320px] select-none py-6 group">
      {/* Outer Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/35 via-blue-600/25 to-purple-600/25 rounded-[30px] blur-3xl group-hover:blur-3xl transition-all duration-700 animate-pulse" />

      {/* Samsung Galaxy S26 Ultra Hardware Side Buttons (Protruding right edge) */}
      <div className="absolute top-28 -right-1.5 w-1.5 h-12 bg-gradient-to-r from-slate-600 to-slate-400 rounded-r-md shadow-md" title="Volume Rocker" />
      <div className="absolute top-44 -right-1.5 w-1.5 h-8 bg-gradient-to-r from-slate-600 to-slate-400 rounded-r-md shadow-md" title="Power / Bixby Button" />
      
      {/* S-Pen Slot indicator at bottom left */}
      <div className="absolute -bottom-1 left-8 w-6 h-1.5 bg-slate-600 rounded-b-sm border border-slate-500 shadow-inner" title="S-Pen Slot" />

      {/* Titanium Armor Frame (Razor sharp boxy corners characteristic of Galaxy Ultra series) */}
      <div className="relative rounded-[22px] bg-gradient-to-b from-neutral-600 via-neutral-800 to-neutral-950 p-[3px] shadow-2xl ring-1 ring-white/20 transition-transform duration-500 group-hover:-translate-y-2">
        
        {/* Inner Screen Bezel */}
        <div className="relative rounded-[19px] bg-navy-950 p-3 overflow-hidden border-2 border-neutral-800 text-left shadow-inner">
          
          {/* Galaxy S26 Ultra Center Infinity-O Camera Punch-hole */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-neutral-700 flex items-center justify-center shadow-md">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-950 border border-blue-400/60 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
            </div>
          </div>

          {/* Samsung One UI 8.0 Status Bar */}
          <div className="flex items-center justify-between px-2 pt-3 pb-2 text-[10px] font-extrabold text-slate-300">
            <span className="tracking-tighter">10:00</span>
            <div className="flex items-center gap-1.5 text-gold-400">
              <span className="text-[8px] bg-gold-500/20 text-gold-300 px-1 py-0.2 rounded font-black border border-gold-500/30">5G+</span>
              <Wifi className="w-2.5 h-2.5 text-slate-300" />
              <div className="flex items-center gap-0.5 text-success-400">
                <span className="text-[9px]">100%</span>
                <BatteryCharging className="w-3 h-3 fill-current" />
              </div>
            </div>
          </div>

          {/* App Header */}
          <div className="bg-gradient-to-r from-navy-900 via-charcoal-900 to-navy-800 rounded-xl p-3 border border-gold-500/40 shadow-lg mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
                <img src="/logo-doc.png" alt="Ojaswi App" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-xs font-black text-ivory-50 flex items-center gap-1">
                  Ojaswi Portal <Sparkles className="w-3 h-3 text-gold-400 fill-current" />
                </div>
                <div className="text-[9px] text-gold-300 tracking-wider uppercase font-semibold">Galaxy Edition</div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[8px] bg-success-500/20 text-success-400 px-1.5 py-0.5 rounded font-bold border border-success-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success-400 animate-pulse" /> SYNCED
              </span>
            </div>
          </div>

          {/* Interactive Screen Content */}
          <div className="space-y-2.5 px-1 pb-3">
            {/* Welcome Card */}
            <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-slate-400 flex items-center justify-between">
                <span>Active Workspace</span>
                <span className="text-gold-400 text-[9px] font-bold">One UI 8.0 Optimized</span>
              </div>
              <div className="text-xs font-bold text-ivory-50 mt-0.5 flex items-center justify-between">
                <span className="truncate">Aditya Narayan Group</span>
                <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-2.5 h-2.5 text-blue-400" /> Cloud Gate
                </span>
              </div>
            </div>

            {/* Live Analytics Animated Card */}
            <div className="bg-gradient-to-br from-gold-500/20 via-navy-900 to-transparent rounded-xl p-3 border border-gold-500/40 shadow-inner relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-bold text-gold-300 mb-1.5">
                <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 text-gold-400" /> Realtime Leads</span>
                <span className="text-xs font-black text-ivory-50 animate-bounce bg-gold-500 text-navy-950 px-2 py-0.5 rounded-full shadow">
                  +{leadCount} Today
                </span>
              </div>
              
              {/* Simulated mini progress chart */}
              <div className="h-12 flex items-end gap-1.5 pt-2 px-1">
                {[45, 70, 50, 85, 60, 95, 80, 100].map((val, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${val}%` }}
                    className="flex-1 bg-gradient-to-t from-gold-600 via-gold-400 to-yellow-200 rounded-t-sm transition-all duration-500 hover:opacity-80"
                  />
                ))}
              </div>
            </div>

            {/* Notification Toast Animation */}
            <div className="bg-navy-800/95 rounded-xl p-2.5 border border-blue-500/40 flex items-center gap-2.5 shadow-xl animate-fade-in">
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-ivory-50 truncate">New AI CRM Lead!</div>
                <div className="text-[9px] text-slate-300 truncate">&ldquo;Need Chaturyug Edition for 4-Yr AMC...&rdquo;</div>
              </div>
              <span className="text-[8px] bg-gold-500 text-navy-900 font-black px-1.5 py-0.5 rounded shadow">Now</span>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-white/10 hover:bg-white/15 transition-colors rounded-xl p-2 text-center border border-white/10 cursor-pointer shadow-sm">
                <Shield className="w-3.5 h-3.5 text-gold-400 mx-auto mb-1" />
                <div className="text-[10px] font-bold text-ivory-50">SLA Shield</div>
                <div className="text-[8px] text-slate-400">24/7 Monitoring</div>
              </div>
              <div className="bg-gold-500/20 hover:bg-gold-500/30 transition-colors rounded-xl p-2 text-center border border-gold-500/40 cursor-pointer shadow-sm">
                <Smartphone className="w-3.5 h-3.5 text-gold-300 mx-auto mb-1" />
                <div className="text-[10px] font-bold text-gold-300">Android Build</div>
                <div className="text-[8px] text-gold-400/90 font-semibold">120 FPS Native</div>
              </div>
            </div>
          </div>

          {/* Samsung Ultra Bottom Navigation Bar indicator */}
          <div className="pt-2 pb-1 flex justify-center items-center gap-6 text-slate-600">
            <div className="w-3 h-3 border-2 border-slate-600 rounded-sm" title="Recent Apps" />
            <div className="w-4 h-4 border-2 border-slate-600 rounded-full" title="Home" />
            <div className="w-0 h-0 border-t-6 border-b-6 border-r-6 border-t-transparent border-b-transparent border-r-slate-600" title="Back" />
          </div>
        </div>
      </div>
    </div>
  );
};
