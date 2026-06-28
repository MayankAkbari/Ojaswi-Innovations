'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles, Clock, ShieldCheck, Zap, AlertTriangle, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';

export default function AmcOfferPage() {
  const [domainName, setDomainName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Countdown timer calculation to Aug 20, 2026
  const [timeLeft, setTimeLeft] = useState({ days: 53, hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainName || !phone) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-ivory-50 rounded-3xl p-8 sm:p-16 border-2 border-gold-500 shadow-2xl text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial-gradient from-gold-500/20 to-transparent blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 bg-gold-500 text-navy-900 font-extrabold px-4 py-1.5 rounded-full text-xs sm:text-sm uppercase tracking-wider animate-bounce">
          🎉 Independence Day Special Offer
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight">
          Lowest AMC in India:<br />
          <span className="text-gold-400 underline decoration-gold-400">₹5,500 / year</span>
        </h1>

        <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
          Regular Annual Maintenance Cost is <span className="line-through text-slate-400 font-semibold">₹8,996/yr</span>. Lock in 38% instant savings, 24×7 server security, cloud hosting renewals, and guaranteed free text changes.
        </p>

        {/* Live Countdown Clock */}
        <div className="pt-4 flex flex-col items-center justify-center">
          <div className="text-xs font-bold uppercase tracking-widest text-gold-300 mb-3 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gold-400 animate-spin" /> Offer Ends 20 August 2026:
          </div>
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
            <div className="bg-navy-800/90 p-4 rounded-2xl border border-gold-500/30">
              <div className="text-3xl sm:text-4xl font-display font-bold text-gold-400 tabular-nums">{timeLeft.days}</div>
              <div className="text-[10px] sm:text-xs text-slate-400 uppercase">Days</div>
            </div>
            <div className="bg-navy-800/90 p-4 rounded-2xl border border-gold-500/30">
              <div className="text-3xl sm:text-4xl font-display font-bold text-gold-400 tabular-nums">{timeLeft.hours}</div>
              <div className="text-[10px] sm:text-xs text-slate-400 uppercase">Hours</div>
            </div>
            <div className="bg-navy-800/90 p-4 rounded-2xl border border-gold-500/30">
              <div className="text-3xl sm:text-4xl font-display font-bold text-gold-400 tabular-nums">{timeLeft.minutes}</div>
              <div className="text-[10px] sm:text-xs text-slate-400 uppercase">Mins</div>
            </div>
            <div className="bg-navy-800/90 p-4 rounded-2xl border border-gold-500/30">
              <div className="text-3xl sm:text-4xl font-display font-bold text-gold-400 tabular-nums">{timeLeft.seconds}</div>
              <div className="text-[10px] sm:text-xs text-slate-400 uppercase">Secs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Claim Form & What's Included */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Claim Form */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div>
            <h3 className="text-2xl font-display font-bold text-navy-900">Lock Your ₹5,500/yr Rate</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Enter your current or planned website details. Our renewal executive will activate your AMC rate protection immediately.
            </p>
          </div>

          {submitted ? (
            <div className="bg-success-500/10 border border-success-500/30 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-success-500 mx-auto" />
              <div className="font-bold text-navy-900 text-lg">AMC Rate Locked Successfully!</div>
              <p className="text-xs text-slate-600">
                We have recorded <strong>{domainName}</strong> for the ₹5,500 Independence Day offer.
              </p>
              <a
                href={`https://wa.me/917069424393?text=Hello%2C%20I%20just%20claimed%20the%20₹5%2C500%20AMC%20offer%20for%20${encodeURIComponent(domainName)}%20(Phone%3A%20${encodeURIComponent(phone)}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold py-3 px-4 rounded-xl font-bold text-sm block shadow-md text-center mt-4"
              >
                Confirm via WhatsApp Now &rarr;
              </a>
            </div>
          ) : (
            <form onSubmit={handleClaim} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Website Domain Name / Business Name</label>
                <input
                  type="text"
                  required
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  placeholder="www.mycompany.com or Shree Fabrics"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-gold py-4 px-4 rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-2 mt-4"
              >
                <Sparkles className="w-5 h-5 fill-current" /> Lock ₹5,500/yr AMC Rate
              </button>
            </form>
          )}
        </div>

        {/* Why AMC is Essential */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">Why AMC Protection Matters</h3>
            <p className="text-slate-600 text-sm">Without annual maintenance, modern websites face security vulnerabilities, outdated SSL certificates, and hosting disruptions.</p>
          </div>

          <GlassCard className="space-y-3 border-l-4 border-l-success-500">
            <div className="font-bold text-navy-900 flex items-center gap-2 text-base">
              <ShieldCheck className="w-5 h-5 text-success-500" /> High-Speed Cloud Hosting & SSL Included
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              We cover your annual server hosting fees and keep your HTTPS security certificate verified 365 days a year.
            </p>
          </GlassCard>

          <GlassCard className="space-y-3 border-l-4 border-l-success-500">
            <div className="font-bold text-navy-900 flex items-center gap-2 text-base">
              <Zap className="w-5 h-5 text-success-500" /> Free Post-Launch Content Modifications
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Need to change your phone number, upload new Diwali product pricing, or replace employee photos? Simply send a WhatsApp message to our team and it&apos;s done free.
            </p>
          </GlassCard>

          <GlassCard className="space-y-3 border-l-4 border-l-danger-500 bg-danger-500/5">
            <div className="font-bold text-danger-600 flex items-center gap-2 text-base">
              <AlertTriangle className="w-5 h-5 text-danger-500" /> Competitor Reality Check
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Standard Indian agencies charge ₹12,000 to ₹25,000/year for maintenance and bill ₹1,500 per minor text update. Ojaswi protects your bottom line.
            </p>
          </GlassCard>
        </div>

      </div>

    </div>
  );
}
