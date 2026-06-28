'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles, Award, ShieldCheck, Zap, Users, Building2, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-gold-500/10 text-gold-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-gold-500/30">
          <Sparkles className="w-3.5 h-3.5" /> Corporate Heritage
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-bold text-navy-900 tracking-tight">
          Guided by Vision.<br />Powered by Innovation.
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          Ojaswi Innovations is the luxury digital architecture wing of <strong>Tejomay Group Pvt Ltd</strong>, headquartered in Ahmedabad, Gujarat. We engineer web experiences that command respect and accelerate revenue.
        </p>
      </div>

      {/* Brand Story Banner */}
      <div className="bg-navy-900 text-ivory-50 rounded-3xl p-8 sm:p-14 relative overflow-hidden border border-gold-500/30 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 relative z-10">
          <div className="text-xs font-bold uppercase tracking-widest text-gold-400">Our Lineage</div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Flagship Sub-Brand of Tejomay Group Pvt Ltd
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Born from the established industrial strength of Tejomay Group, Ojaswi Innovations was founded to solve the Indian web development dilemma: the choice between slow, overpriced agencies and unreliable independent freelancers.
          </p>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            By combining pre-architected luxury design systems with strict engineering discipline, we deliver flawless 8-page to unlimited-page enterprise portals in exactly <strong>48 hours</strong>—backed by guaranteed post-launch support.
          </p>
          <div className="pt-2 flex items-center gap-3 text-sm font-semibold text-gold-300">
            <Building2 className="w-5 h-5 text-gold-400" />
            <span>Ahmedabad HQ &bull; Pan-India Execution &bull; 100% In-House Code</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div className="bg-navy-800/80 p-6 rounded-2xl border border-white/10 text-center space-y-2">
            <div className="text-3xl sm:text-4xl font-display font-bold text-gold-400">1,500+</div>
            <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">Enterprise Clients</div>
          </div>
          <div className="bg-navy-800/80 p-6 rounded-2xl border border-white/10 text-center space-y-2">
            <div className="text-3xl sm:text-4xl font-display font-bold text-gold-400">48 Hrs</div>
            <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">Delivery SLA</div>
          </div>
          <div className="bg-navy-800/80 p-6 rounded-2xl border border-white/10 text-center space-y-2">
            <div className="text-3xl sm:text-4xl font-display font-bold text-gold-400">99.9%</div>
            <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">Server Uptime</div>
          </div>
          <div className="bg-navy-800/80 p-6 rounded-2xl border border-white/10 text-center space-y-2">
            <div className="text-3xl sm:text-4xl font-display font-bold text-gold-400">100%</div>
            <div className="text-xs text-slate-300 font-medium uppercase tracking-wider">Free Modifications</div>
          </div>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">Our Engineering Commandments</h2>
          <p className="text-slate-500 text-sm mt-2">The four immutable principles governing every Ojaswi project.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard className="space-y-3">
            <div className="flex items-center gap-3 font-display font-bold text-lg text-navy-900">
              <Zap className="w-5 h-5 text-gold-500" /> 1. Velocity Without Compromise
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              We never sacrifice aesthetic rigor or SEO clean code for speed. Our 48-hour delivery is achieved through component reuse and disciplined automation, not shortcuts.
            </p>
          </GlassCard>

          <GlassCard className="space-y-3">
            <div className="flex items-center gap-3 font-display font-bold text-lg text-navy-900">
              <ShieldCheck className="w-5 h-5 text-gold-500" /> 2. Radical Price Transparency
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              No hidden server fees, no unexpected hosting hikes. Our ₹5,500/year AMC special locks in your ongoing maintenance so your operating expenses remain predictable.
            </p>
          </GlassCard>

          <GlassCard className="space-y-3">
            <div className="flex items-center gap-3 font-display font-bold text-lg text-navy-900">
              <Users className="w-5 h-5 text-gold-500" /> 3. Dedicated Human Support
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              When you message Ojaswi on WhatsApp (+91 70694 24393), you speak directly with senior project engineers who understand your business model, not bot menus.
            </p>
          </GlassCard>

          <GlassCard className="space-y-3">
            <div className="flex items-center gap-3 font-display font-bold text-lg text-navy-900">
              <Award className="w-5 h-5 text-gold-500" /> 4. Luxury First Impressions
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              In digital commerce, trust is established in 0.05 seconds. We utilize rich glassmorphism, curated typography, and royal color palettes to ensure your business stands out.
            </p>
          </GlassCard>
        </div>
      </div>

    </div>
  );
}
