'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [packageInterest, setPackageInterest] = useState('The Someshwar Package');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-6xl font-display font-bold text-navy-900 tracking-tight">
          Direct Engineering Support
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          Get in touch with our Ahmedabad engineering headquarters or connect instantly with a senior web architect via WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <GlassCard className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-600 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-navy-900">24×7 WhatsApp & Phone</h3>
                <p className="text-sm text-slate-600 mt-1">Direct access to project onboarding managers.</p>
                <a href="https://wa.me/917069424393" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 font-bold text-navy-900 text-base hover:text-gold-600">
                  +91 70694 24393 &rarr;
                </a>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-600 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-navy-900">Email Proposals & Legal</h3>
                <p className="text-sm text-slate-600 mt-1">Send tender RFPs or corporate vendor documentation.</p>
                <div className="mt-2 font-bold text-navy-900 text-base">
                  contact@ojaswi.com
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-600 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-navy-900">Ahmedabad Headquarters</h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Tejomay Group Pvt Ltd Corporate Office,<br />
                  S.G. Highway, Ahmedabad, Gujarat — 380015
                </p>
                <div className="mt-2 text-xs font-semibold text-success-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Open Mon–Sat (09:00 AM – 07:00 PM)
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Inquiry Form */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl">
          <h3 className="text-2xl font-display font-bold text-navy-900 mb-2">Send Project Brief</h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">Receive a custom architectural roadmap in under 2 hours.</p>

          {submitted ? (
            <div className="bg-success-500/10 border border-success-500/30 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-success-500 mx-auto" />
              <div className="font-bold text-navy-900 text-lg">Inquiry Received!</div>
              <p className="text-xs text-slate-600">
                Thank you, <strong>{name}</strong>. Our engineering manager will review your requirements for <strong>{packageInterest}</strong> and message you on WhatsApp.
              </p>
              <a
                href={`https://wa.me/917069424393?text=Hello%20Ojaswi%2C%20I%20just%20submitted%20a%20project%20brief%20for%20${encodeURIComponent(packageInterest)}.%20My%20name%20is%20${encodeURIComponent(name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold py-3 px-4 rounded-xl font-bold text-sm block shadow-md text-center mt-4"
              >
                Connect instantly on WhatsApp &rarr;
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rajesh Bhai Patel"
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

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Package of Interest</label>
                <select
                  value={packageInterest}
                  onChange={(e) => setPackageInterest(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
                >
                  <option value="The Someshwar Package (8 Pages)">The Someshwar Package (8 Pages)</option>
                  <option value="The Adityanarayan Package (20 Pages)">The Adityanarayan Package (20 Pages)</option>
                  <option value="The Trivikram Package (Unlimited + Admin Panel)">The Trivikram Package (Unlimited + Admin Panel ⭐)</option>
                  <option value="Custom AMC Renewal">Custom AMC Renewal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Project Details / Questions</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your business model or specific features needed..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-gold py-4 px-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 mt-4"
              >
                Send Brief to Headquarters <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
