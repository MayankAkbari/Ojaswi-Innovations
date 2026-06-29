'use client';

import React, { useState } from 'react';
import { PricingCard } from '@/components/ui/PricingCard';
import { AndroidPhoneMockup } from '@/components/ui/AndroidPhoneMockup';
import { Sparkles, Check, X, ShieldCheck, Zap, Smartphone, Layers, Rocket, Bell, ArrowRight } from 'lucide-react';

export default function PackagesPage() {
  const [edition, setEdition] = useState<'prarambh' | 'chaturyug'>('chaturyug');

  const isChaturyug = edition === 'chaturyug';

  return (
    <div className="space-y-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-gold-500/10 text-gold-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-gold-500/30">
          <Sparkles className="w-3.5 h-3.5" /> All-Inclusive Architecture
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-bold text-navy-900 tracking-tight">
          Royal Package Tiers
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          Select between our 1-Year Prarambh launch editions or our heavily discounted 4-Year Chaturyug long-term growth editions.
        </p>

        {/* Edition Switcher Toggle */}
        <div className="pt-6 flex justify-center">
          <div className="bg-navy-900/10 p-1.5 rounded-2xl flex items-center gap-2 border border-navy-900/10 backdrop-blur-md">
            <button
              onClick={() => setEdition('prarambh')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                !isChaturyug ? 'bg-navy-900 text-ivory-50 shadow-md' : 'text-navy-900 hover:text-gold-600'
              }`}
            >
              Prarambh Edition (1 Year)
            </button>
            <button
              onClick={() => setEdition('chaturyug')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                isChaturyug ? 'btn-gold shadow-lg' : 'text-navy-900 hover:text-gold-600'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Chaturyug Edition (4 Years &bull; Save Big)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Someshwar */}
        <PricingCard
          packageId="pkg-1"
          packageSlug="someshwar"
          packageName="The Someshwar Package"
          editionName={isChaturyug ? "Chaturyug Edition (4 Years)" : "Prarambh Edition (1 Year)"}
          price={isChaturyug ? 56898 : 41998}
          discountPrice={isChaturyug ? 47985 : 32997}
          maxPages={8}
          features={[
            'Maximum 8-page custom responsive website',
            isChaturyug ? '4 Years Premium High-Speed Hosting' : '1 Year Premium High-Speed Hosting',
            isChaturyug ? '4 Years Custom Domain (.com / .in)' : '1 Year Custom Domain (.com / .in)',
            isChaturyug ? '6 Months Free Post-Delivery Changes' : '1 Month Free Post-Delivery Changes',
            isChaturyug ? '1 Year 24×7 Priority WhatsApp Support' : 'Business Hours Customer Support',
            'Standard SEO Meta Setup & Google Indexing',
            '48-Hour Rapid Delivery Guarantee'
          ]}
          onGenerateProposal={() => window.location.href = `/proposal/someshwar?edition=${encodeURIComponent(isChaturyug ? 'Chaturyug Edition' : 'Prarambh Edition')}`}
          onBuy={() => window.open(`https://wa.me/917069424393?text=I%20want%20to%20buy%20The%20Someshwar%20Package%20(${isChaturyug ? 'Chaturyug' : 'Prarambh'}%20Edition)%20at%20₹${isChaturyug ? '47,985' : '32,997'}`, '_blank')}
        />

        {/* Trivikram Flagship */}
        <PricingCard
          packageId="pkg-3"
          packageSlug="trivikram"
          packageName="The Trivikram Package"
          editionName={isChaturyug ? "Chaturyug Edition (4 Years)" : "Prarambh Edition (1 Year)"}
          price={isChaturyug ? 82898 : 71998}
          discountPrice={isChaturyug ? 76985 : 65997}
          maxPages={null}
          isFlagship={true}
          features={[
            'Unlimited Pages — Enterprise Grade Scalability',
            'Includes Special Custom Admin Panel & CRM Gate',
            'Inquiry, Appointment & Lead Management Tools',
            isChaturyug ? '4 Years Premium High-Speed Hosting Included' : '1 Year Premium High-Speed Hosting',
            isChaturyug ? '4 Years Custom Domain (.com / .in)' : '1 Year Custom Domain (.com / .in)',
            isChaturyug ? '1 Full Year Free Post-Delivery Changes' : '3 Months Free Post-Delivery Changes',
            isChaturyug ? 'Dedicated Account Manager + VIP Support' : '1 Year 24×7 Dedicated VIP Support'
          ]}
          onGenerateProposal={() => window.location.href = `/proposal/trivikram?edition=${encodeURIComponent(isChaturyug ? 'Chaturyug Edition' : 'Prarambh Edition')}`}
          onBuy={() => window.open(`https://wa.me/917069424393?text=I%20want%20to%20buy%20The%20Trivikram%20Package%20(${isChaturyug ? 'Chaturyug' : 'Prarambh'}%20Edition)%20at%20₹${isChaturyug ? '76,985' : '65,997'}`, '_blank')}
        />

        {/* Adityanarayan */}
        <PricingCard
          packageId="pkg-2"
          packageSlug="adityanarayan"
          packageName="The Adityanarayan Package"
          editionName={isChaturyug ? "Chaturyug Edition (4 Years)" : "Prarambh Edition (1 Year)"}
          price={isChaturyug ? 73898 : 52898}
          discountPrice={isChaturyug ? 68985 : 46985}
          maxPages={20}
          features={[
            'Maximum 20-page comprehensive business website',
            isChaturyug ? '4 Years Premium High-Speed Hosting' : '1 Year Premium High-Speed Hosting',
            isChaturyug ? '4 Years Custom Domain (.com / .in)' : '1 Year Custom Domain (.com / .in)',
            isChaturyug ? '6 Months Free Post-Delivery Changes' : '1 Month Free Post-Delivery Changes',
            isChaturyug ? '1 Year 24×7 Priority WhatsApp Support' : 'Business Hours Customer Support',
            'Multi-Service Product Showcase Catalog',
            'Interactive Contact & Lead Capture Forms'
          ]}
          onGenerateProposal={() => window.location.href = `/proposal/adityanarayan?edition=${encodeURIComponent(isChaturyug ? 'Chaturyug Edition' : 'Prarambh Edition')}`}
          onBuy={() => window.open(`https://wa.me/917069424393?text=I%20want%20to%20buy%20The%20Adityanarayan%20Package%20(${isChaturyug ? 'Chaturyug' : 'Prarambh'}%20Edition)%20at%20₹${isChaturyug ? '68,985' : '46,985'}`, '_blank')}
        />
      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="space-y-6 pt-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">Comprehensive Architectural Matrix</h2>
          <p className="text-slate-500 text-sm mt-1">Detailed feature breakdown across all three Ojaswi tiers.</p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-lg bg-white">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-navy-900 text-ivory-50 text-xs sm:text-sm uppercase tracking-wider">
                <th className="p-4 sm:p-6 font-display font-bold">Specification / Feature</th>
                <th className="p-4 sm:p-6 font-display font-bold text-center">Someshwar</th>
                <th className="p-4 sm:p-6 font-display font-bold text-center">Adityanarayan</th>
                <th className="p-4 sm:p-6 font-display font-bold text-center bg-gold-500 text-navy-900">Trivikram ⭐</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-navy-900">
              <tr>
                <td className="p-4 sm:p-6 font-semibold">Maximum Page Limit</td>
                <td className="p-4 sm:p-6 text-center">8 Pages</td>
                <td className="p-4 sm:p-6 text-center">20 Pages</td>
                <td className="p-4 sm:p-6 text-center font-bold text-gold-600 bg-gold-50/50">Unlimited Pages</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 font-semibold">Custom Admin Panel & CRM</td>
                <td className="p-4 sm:p-6 text-center text-slate-400"><X className="w-5 h-5 mx-auto" /></td>
                <td className="p-4 sm:p-6 text-center text-slate-400"><X className="w-5 h-5 mx-auto" /></td>
                <td className="p-4 sm:p-6 text-center text-success-500 bg-gold-50/50"><Check className="w-5 h-5 mx-auto stroke-[3]" /></td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 font-semibold">48-Hour Rapid Delivery Guarantee</td>
                <td className="p-4 sm:p-6 text-center text-success-500"><Check className="w-5 h-5 mx-auto stroke-[3]" /></td>
                <td className="p-4 sm:p-6 text-center text-success-500"><Check className="w-5 h-5 mx-auto stroke-[3]" /></td>
                <td className="p-4 sm:p-6 text-center text-success-500 bg-gold-50/50"><Check className="w-5 h-5 mx-auto stroke-[3]" /></td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 font-semibold">Free Post-Delivery Changes Window</td>
                <td className="p-4 sm:p-6 text-center">1 to 6 Months</td>
                <td className="p-4 sm:p-6 text-center">1 to 6 Months</td>
                <td className="p-4 sm:p-6 text-center font-bold text-navy-900 bg-gold-50/50">3 to 12 Months</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 font-semibold">Independence Day AMC Eligibility</td>
                <td className="p-4 sm:p-6 text-center font-semibold">₹5,500 / year</td>
                <td className="p-4 sm:p-6 text-center font-semibold">₹5,500 / year</td>
                <td className="p-4 sm:p-6 text-center font-bold text-gold-600 bg-gold-50/50">₹5,500 / year</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 font-semibold">WhatsApp Direct Lead Integration</td>
                <td className="p-4 sm:p-6 text-center text-success-500"><Check className="w-5 h-5 mx-auto stroke-[3]" /></td>
                <td className="p-4 sm:p-6 text-center text-success-500"><Check className="w-5 h-5 mx-auto stroke-[3]" /></td>
                <td className="p-4 sm:p-6 text-center text-success-500 bg-gold-50/50"><Check className="w-5 h-5 mx-auto stroke-[3]" /></td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 font-semibold">High-Speed SSL Cloud Hosting</td>
                <td className="p-4 sm:p-6 text-center">Included</td>
                <td className="p-4 sm:p-6 text-center">Included</td>
                <td className="p-4 sm:p-6 text-center font-semibold bg-gold-50/50">VIP Dedicated Resources</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Coming Soon: Android App Development Section */}
      <div className="pt-12">
        <div className="relative rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-charcoal-900 text-ivory-50 p-8 sm:p-14 border-2 border-gold-500/60 shadow-2xl overflow-hidden">
          {/* Animated background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-radial-gradient from-gold-500/20 to-transparent blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-radial-gradient from-gold-500/15 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gold-500 text-navy-900 font-extrabold px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-lg animate-bounce">
                <Rocket className="w-4 h-4 fill-current" /> Next-Gen Expansion &bull; Coming Soon
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight leading-tight">
                Fully Functional <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">Android App Development</span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                We are expanding our engineering excellence to mobile. Soon, you will be able to bundle high-performance native Android applications synchronized seamlessly with your Ojaswi web database and CRM gate.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <Smartphone className="w-6 h-6 text-gold-400 mb-2 mx-auto lg:mx-0" />
                  <div className="font-bold text-sm text-ivory-50">Native Performance</div>
                  <div className="text-xs text-slate-400 mt-0.5">Silky 120fps fluid UI & offline capabilities</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <Layers className="w-6 h-6 text-gold-400 mb-2 mx-auto lg:mx-0" />
                  <div className="font-bold text-sm text-ivory-50">Web & App Sync</div>
                  <div className="text-xs text-slate-400 mt-0.5">Real-time data parity with your web portal</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <ShieldCheck className="w-6 h-6 text-gold-400 mb-2 mx-auto lg:mx-0" />
                  <div className="font-bold text-sm text-ivory-50">Play Store Launch</div>
                  <div className="text-xs text-slate-400 mt-0.5">End-to-end publishing & security compliance</div>
                </div>
              </div>

              <div className="pt-4 flex justify-center lg:justify-start">
                <a
                  href="https://wa.me/917069424393?text=Hello%20Ojaswi%20Innovations%2C%20I%20am%20interested%20in%20Early%20VIP%20Access%20for%20your%20upcoming%20Android%20App%20Development%20service."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto btn-gold py-4 px-8 rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                >
                  <Bell className="w-4 h-4 animate-pulse" /> Get Early VIP Access on WhatsApp <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center py-4">
              <AndroidPhoneMockup />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
