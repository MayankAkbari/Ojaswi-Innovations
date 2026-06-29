'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { PricingCard } from '@/components/ui/PricingCard';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Clock, Award, Phone, CheckCircle2, Star, AlertCircle } from 'lucide-react';

export default function HomePage() {
  const [showAuthError, setShowAuthError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('error') === 'invalid_credentials') {
        setShowAuthError(true);
      }
    }
  }, []);

  return (
    <div className="space-y-20 sm:space-y-32 pb-24 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative hero-bg text-ivory-50 pt-20 pb-28 sm:pt-32 sm:pb-40 px-4 sm:px-6 lg:px-8 border-b border-gold-500/30">
        {/* Background Decorative Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-radial-gradient from-gold-500/20 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {showAuthError && (
            <div className="max-w-2xl mx-auto mb-6 bg-danger-500/90 text-white p-4 rounded-2xl border border-danger-400 shadow-2xl flex items-center justify-between gap-4 animate-fade-in text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 shrink-0 mt-0.5 text-white" />
                <div>
                  <div className="font-bold text-base">Invalid Credentials - Access Restricted</div>
                  <div className="text-xs font-normal text-ivory-100 mt-1">
                    Your sign-in credentials are not stored in our Supabase backend or did not match. Please register an account with valid credentials first.
                  </div>
                </div>
              </div>
              <button onClick={() => setShowAuthError(false)} className="text-white font-bold px-2.5 py-1 bg-black/20 rounded-lg hover:bg-black/40 text-sm">✕</button>
            </div>
          )}

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-navy-800/80 text-gold-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-gold-500/40 shadow-lg animate-fade-in">
            <Sparkles className="w-4 h-4 text-gold-400 shrink-0 animate-pulse" />
            <span>A Flagship Enterprise Sub-Brand of <strong>Tejomay Group Pvt Ltd</strong></span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.15]">
            Guided by Vision.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">
              Powered by Innovation.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
            India&apos;s premier web architecture firm. We craft high-conversion, luxury corporate websites delivered in exactly <strong>48 hours</strong>, backed by guaranteed free changes and the lowest annual maintenance cost in the nation.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/packages"
              className="w-full sm:w-auto btn-gold px-8 py-4 rounded-2xl font-bold text-base shadow-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            >
              <Sparkles className="w-5 h-5 fill-current" /> View Royal Packages
            </Link>
            <a
              href="https://wa.me/917069424393?text=Hello%20Ojaswi%20Innovations%2C%20I%20am%20looking%20for%20a%20premium%20enterprise%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-navy-800/90 hover:bg-navy-800 text-ivory-50 border border-gold-500/40 px-8 py-4 rounded-2xl font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Phone className="w-5 h-5 text-gold-400" /> WhatsApp Direct Consultation
            </a>
          </div>

          {/* Trust Bar below CTA */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-4xl mx-auto border-t border-white/10 text-xs sm:text-sm">
            <div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-gold-400">48 Hours</div>
              <div className="text-slate-400 mt-1">Rapid Delivery Guarantee</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-gold-400">₹5,500/yr</div>
              <div className="text-slate-400 mt-1">Lowest AMC in India</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-gold-400">100% Free</div>
              <div className="text-slate-400 mt-1">Post-Launch Modifications</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-gold-400">16+ Sectors</div>
              <div className="text-slate-400 mt-1">Pan-India Portfolio</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE PILLARS (USPs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Why Ojaswi Stands Alone</h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-navy-900">
            Engineered for Absolute Peace of Mind
          </h3>
          <p className="text-slate-600 mt-3 text-base">
            We eliminate the standard frustrations of web development agencies with transparent, guaranteed commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard className="border-t-4 border-t-gold-500 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500 mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-display font-bold mb-3">48-Hour Rapid Delivery</h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Time is money. Our pre-architected luxury design systems and agile deployment pipelines allow us to deliver fully custom, responsive platforms in exactly 44 to 48 hours.
            </p>
            <div className="text-xs font-semibold text-navy-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-success-500" /> Contractually Guaranteed SLA
            </div>
          </GlassCard>

          <GlassCard className="border-t-4 border-t-gold-500 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500 mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-display font-bold mb-3">Free Post-Delivery Changes</h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Never pay extra for fine-tuning. Every Ojaswi package includes up to 1 full year of dedicated free modifications so your pricing catalogs and text always stay fresh.
            </p>
            <div className="text-xs font-semibold text-navy-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-success-500" /> 1 to 12 Months Free Window
            </div>
          </GlassCard>

          <GlassCard className="border-t-4 border-t-gold-500 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-display font-bold mb-3">Lowest AMC in India</h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              While others charge ₹15,000+ for renewals, our Independence Day special locks your Annual Maintenance Contract at just ₹5,500/year (Reg. ₹8,996).
            </p>
            <div className="text-xs font-semibold text-navy-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-success-500" /> Includes Hosting & Domain Renewal
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 3. ROYAL PACKAGES PREVIEW */}
      <section className="bg-navy-900 text-ivory-50 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial-gradient from-gold-500/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-gold-500/10 text-gold-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-gold-500/30">
              Transparent & All-Inclusive Pricing
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight">
              Choose Your Royal Architecture
            </h2>
            <p className="text-slate-300 mt-4 text-base sm:text-lg">
              Every package includes high-speed hosting, custom domain registration, SSL certificates, and 48-hour deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Someshwar Chaturyug */}
            <PricingCard
              packageId="pkg-1"
              packageSlug="someshwar"
              packageName="The Someshwar Package"
              editionName="Chaturyug Edition (4 Years)"
              price={56898}
              discountPrice={47985}
              maxPages={8}
              features={[
                'Maximum 8-page custom responsive website',
                '4 Years Premium High-Speed Hosting Included',
                '4 Years Custom Domain (.com / .in)',
                '6 Months Free Post-Delivery Changes Commitment',
                '1 Year 24×7 Priority WhatsApp Support',
                '3 Years Business Hours Technical Support',
                'Standard SEO Meta Setup & Google Indexing'
              ]}
              onGenerateProposal={() => window.location.href = '/proposal/someshwar?edition=Chaturyug%20Edition'}
              onBuy={() => window.open('https://wa.me/917069424393?text=I%20want%20to%20buy%20The%20Someshwar%20Package%20(Chaturyug%20Edition)%20at%20₹47,985', '_blank')}
            />

            {/* Trivikram Flagship */}
            <PricingCard
              packageId="pkg-3"
              packageSlug="trivikram"
              packageName="The Trivikram Package"
              editionName="Chaturyug Edition (4 Years)"
              price={82898}
              discountPrice={76985}
              maxPages={null}
              isFlagship={true}
              features={[
                'Unlimited Pages — Enterprise Grade Scalability',
                'Includes Special Custom Admin Panel & CRM Gate',
                'Inquiry, Appointment & Lead Management Tools',
                '4 Years Premium High-Speed Hosting Included',
                '4 Years Custom Domain Registration (.com / .in)',
                '1 Full Year Free Post-Delivery Changes Commitment',
                'Dedicated Account Manager + VIP Support'
              ]}
              onGenerateProposal={() => window.location.href = '/proposal/trivikram?edition=Chaturyug%20Edition'}
              onBuy={() => window.open('https://wa.me/917069424393?text=I%20want%20to%20buy%20The%20Trivikram%20Package%20(Chaturyug%20Edition)%20with%20Admin%20Panel%20at%20₹76,985', '_blank')}
            />

            {/* Adityanarayan Chaturyug */}
            <PricingCard
              packageId="pkg-2"
              packageSlug="adityanarayan"
              packageName="The Adityanarayan Package"
              editionName="Chaturyug Edition (4 Years)"
              price={73898}
              discountPrice={68985}
              maxPages={20}
              features={[
                'Maximum 20-page comprehensive business website',
                '4 Years Premium High-Speed Hosting Included',
                '4 Years Custom Domain Registration (.com / .in)',
                '6 Months Free Post-Delivery Changes Commitment',
                '1 Year 24×7 Priority WhatsApp Support',
                'Multi-Service Product Showcase Catalog',
                'Interactive Contact & Lead Capture Forms'
              ]}
              onGenerateProposal={() => window.location.href = '/proposal/adityanarayan?edition=Chaturyug%20Edition'}
              onBuy={() => window.open('https://wa.me/917069424393?text=I%20want%20to%20buy%20The%20Adityanarayan%20Package%20(Chaturyug%20Edition)%20at%20₹68,985', '_blank')}
            />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-gold-300 hover:text-gold-400 font-semibold text-sm underline decoration-gold-500/50"
            >
              Compare all Prarambh (1-Year) & Chaturyug (4-Year) Editions in full detail <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. INDEPENDENCE DAY AMC SPECIAL OFFER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 rounded-3xl p-8 sm:p-12 text-ivory-50 border-2 border-gold-500/60 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gold-500 text-navy-900 font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
              🎉 Independence Day Special
            </div>
            <h3 className="text-3xl sm:text-4xl font-display font-bold">
              Lock the Lowest AMC in India at <span className="text-gold-400 underline decoration-gold-400">₹5,500/year</span>
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Regular Annual Maintenance Cost is <span className="line-through text-slate-400">₹8,996/year</span>. Renew or register your website before <strong>20 August 2026</strong> to claim guaranteed 24×7 support, server security patches, and zero downtime.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
            <Link
              href="/amc"
              className="btn-gold px-8 py-4 rounded-xl font-bold text-center text-sm shadow-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Claim AMC Offer Now
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-ivory-50 border border-white/20 px-6 py-4 rounded-xl font-semibold text-center text-sm transition-colors"
            >
              Speak to Renewal Team
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CLIENT REVIEWS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Verified Client Success</h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-navy-900">
              Trusted Across Gujarat & Pan-India
            </h3>
          </div>
          <Link href="/reviews" className="text-sm font-semibold text-navy-900 hover:text-gold-500 flex items-center gap-1">
            Read all 150+ Verified Reviews <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard className="space-y-4">
            <div className="flex text-gold-500 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-slate-700 italic text-sm leading-relaxed">
              &ldquo;Ojaswi delivered our textile export portal in exactly 44 hours. The custom product inquiry form increased our WhatsApp lead velocity by 300%! Highly recommended.&rdquo;
            </p>
            <div className="pt-2 border-t border-slate-200">
              <div className="font-bold text-navy-900 text-sm">Vikram Shah</div>
              <div className="text-xs text-slate-500">Managing Director, Shree Fabrics (Ahmedabad)</div>
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <div className="flex text-gold-500 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-slate-700 italic text-sm leading-relaxed">
              &ldquo;The free post-delivery modifications saved us when we had to update our Diwali packaging pricing catalog. Truly the lowest and most transparent AMC in Gujarat!&rdquo;
            </p>
            <div className="pt-2 border-t border-slate-200">
              <div className="font-bold text-navy-900 text-sm">Meena Mehta</div>
              <div className="text-xs text-slate-500">Founder, Apex Packaging Solutions (Surat)</div>
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <div className="flex text-gold-500 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-slate-700 italic text-sm leading-relaxed">
              &ldquo;The Trivikram package admin portal allows my staff to manage patient appointments effortlessly. The design feels like a multi-million dollar corporate brand.&rdquo;
            </p>
            <div className="pt-2 border-t border-slate-200">
              <div className="font-bold text-navy-900 text-sm">Dr. Arvind Patel</div>
              <div className="text-xs text-slate-500">Chief Medical Officer, Aarogya Hospital (Baroda)</div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 6. FINAL BOTTOM CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-navy-900 text-ivory-50 rounded-3xl p-10 sm:p-16 space-y-6 relative overflow-hidden shadow-2xl border border-gold-500/30">
          <Award className="w-12 h-12 text-gold-400 mx-auto" />
          <h2 className="text-3xl sm:text-5xl font-display font-bold">
            Ready to Launch Your Enterprise Portal?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-base">
            Get your instant PDF proposal with full technical specifications or speak directly with our Ahmedabad engineering team today.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/packages" className="w-full sm:w-auto btn-gold px-8 py-4 rounded-xl font-bold text-sm shadow-xl">
              Get Instant PDF Proposal
            </Link>
            <Link href="/contact" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-ivory-50 px-8 py-4 rounded-xl font-semibold text-sm transition-colors border border-white/20">
              Contact Support HQ
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
