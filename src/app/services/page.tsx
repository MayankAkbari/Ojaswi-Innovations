'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles, Code2, ShoppingCart, Palette, Search, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: Code2,
      title: 'Custom Enterprise Web Architecture',
      desc: 'High-performance, responsive web portals engineered with Next.js App Router and React 19. Designed for rapid page speeds, seamless mobile scaling, and immediate WhatsApp lead capture.',
      badge: '48-Hour Delivery SLA'
    },
    {
      icon: ShoppingCart,
      title: 'B2B & Wholesale Inquiry Catalogs',
      desc: 'Dynamic product display engines tailored for manufacturers, exporters, and traders. Features bulk quotation calculators, custom inquiry forms, and multi-currency product displays.',
      badge: 'High Conversion'
    },
    {
      icon: Palette,
      title: 'Luxury UI/UX & Glassmorphism Design',
      desc: 'Bespoke interfaces featuring royal navy and gold design tokens, smooth hover micro-animations, and frosted glass panels that position your brand leagues above competitors.',
      badge: 'Premium Aesthetics'
    },
    {
      icon: Search,
      title: 'Technical SEO & Google Indexing',
      desc: 'Automated sitemap generation, structured JSON-LD schema markup, and optimized OpenGraph social sharing meta tags to ensure your website dominates regional Google search rankings.',
      badge: 'Included Free'
    },
    {
      icon: ShieldCheck,
      title: 'Annual Maintenance & Server Security',
      desc: 'Continuous cloud hosting on high-speed servers, automated SSL encryption renewals, 24×7 uptime monitoring, and guaranteed free post-delivery code modifications.',
      badge: '₹5,500/year Offer'
    }
  ];

  return (
    <div className="space-y-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-gold-500/10 text-gold-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-gold-500/30">
          <Sparkles className="w-3.5 h-3.5" /> Full-Stack Offerings
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-bold text-navy-900 tracking-tight">
          Precision Digital Capabilities
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          Every service we provide is bundled into our straightforward royal packages—eliminating scope creep, hourly billing surprises, and technical delays.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, idx) => {
          const Icon = s.icon;
          return (
            <GlassCard key={idx} className="flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-navy-900 text-gold-400 flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-600 border border-gold-500/20">
                    {s.badge}
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-navy-900">
                <span className="flex items-center gap-1 text-success-500">
                  <Zap className="w-3.5 h-3.5" /> Active in All Packages
                </span>
                <Link href="/packages" className="text-gold-600 hover:underline flex items-center gap-1">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </GlassCard>
          );
        })}

        {/* Custom Enterprise CTA Card */}
        <div className="bg-gradient-to-br from-navy-900 to-navy-800 text-ivory-50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-2 border-gold-500 shadow-xl">
          <div className="space-y-4">
            <div className="inline-block bg-gold-500 text-navy-900 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
              Bespoke CRM Gate
            </div>
            <h3 className="text-2xl font-display font-bold text-gold-300">Need Custom Admin Panels?</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our flagship <strong>Trivikram Package</strong> includes a custom administrative dashboard for patient bookings, B2B lead management, and employee portals.
            </p>
          </div>
          <Link
            href="/packages"
            className="mt-6 w-full btn-gold py-3 rounded-xl text-center font-bold text-sm shadow-md flex items-center justify-center gap-2"
          >
            View Trivikram Package <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
