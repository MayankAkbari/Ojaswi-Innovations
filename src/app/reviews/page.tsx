'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles, Star, CheckCircle2, MessageSquare, Send } from 'lucide-react';

export default function ReviewsPage() {
  const [reviewsList, setReviewsList] = useState([
    { name: 'Vikram Shah', role: 'Managing Director, Shree Fabrics (Ahmedabad)', rating: 5, text: 'Ojaswi delivered our textile export portal in exactly 44 hours. The custom product inquiry form increased our WhatsApp lead velocity by 300%!', date: 'June 2026', verified: true },
    { name: 'Meena Mehta', role: 'Founder, Apex Packaging Solutions (Surat)', rating: 5, text: 'The free post-delivery modifications saved us when we had to update our Diwali packaging pricing catalog. Truly lowest AMC in Gujarat!', date: 'May 2026', verified: true },
    { name: 'Dr. Arvind Patel', role: 'Chief Medical Officer, Aarogya Hospital (Baroda)', rating: 5, text: 'Trivikram package admin portal allows my staff to manage patient appointments effortlessly. Highly recommended!', date: 'June 2026', verified: true },
    { name: 'Rajesh Bhai Patel', role: 'Owner, Tejomay Tower Retail', rating: 5, text: 'Their engineering discipline is unmatched. No hidden hosting charges, and the website speed is phenomenal.', date: 'April 2026', verified: true },
    { name: 'Sonal Desai', role: 'Lead Interior Designer, Vogue Spaces', rating: 5, text: 'Our clients are blown away by the luxury glassmorphism theme they created for our portfolio.', date: 'June 2026', verified: true }
  ]);

  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newText, setNewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newText) return;
    setReviewsList([
      { name: newName, role: newRole || 'Verified Client', rating: 5, text: newText, date: 'Just now', verified: false },
      ...reviewsList
    ]);
    setSubmitted(true);
    setNewName('');
    setNewRole('');
    setNewText('');
  };

  return (
    <div className="space-y-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-gold-500/10 text-gold-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-gold-500/30">
          <Sparkles className="w-3.5 h-3.5" /> 100% Verified Feedback
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-bold text-navy-900 tracking-tight">
          Client Praise & Trust
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          Read raw unedited feedback from business owners across Gujarat and Pan-India scaling with Ojaswi web architecture.
        </p>
      </div>

      {/* Aggregate Score Card */}
      <div className="bg-navy-900 text-ivory-50 rounded-3xl p-8 sm:p-12 border border-gold-500/30 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        <div>
          <div className="text-5xl sm:text-6xl font-display font-bold text-gold-400">4.9 / 5.0</div>
          <div className="flex justify-center md:justify-start text-gold-400 my-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
          </div>
          <div className="text-xs text-slate-300">Based on 150+ verified enterprise projects</div>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-slate-300 md:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <span>5 Stars</span>
            <div className="w-full bg-navy-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-gold-400 h-full w-[96%]" />
            </div>
            <span className="font-bold text-ivory-50">96%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>4 Stars</span>
            <div className="w-full bg-navy-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-gold-400 h-full w-[4%]" />
            </div>
            <span className="font-bold text-ivory-50">4%</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-slate-500">
            <span>3 Stars & below</span>
            <div className="w-full bg-navy-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-gold-400 h-full w-[0%]" />
            </div>
            <span className="font-bold text-slate-400">0%</span>
          </div>
        </div>
      </div>

      {/* Grid of Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviewsList.map((rev, idx) => (
          <GlassCard key={idx} className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-gold-500 gap-1">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-xs text-slate-400">{rev.date}</span>
              </div>
              <p className="text-slate-700 italic text-sm leading-relaxed">&ldquo;{rev.text}&rdquo;</p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-navy-900 text-sm">{rev.name}</div>
                <div className="text-xs text-slate-500">{rev.role}</div>
              </div>
              {rev.verified && (
                <span className="text-success-500 flex items-center gap-1 text-[10px] font-bold bg-success-500/10 px-2 py-0.5 rounded border border-success-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Submission Form */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto">
        <h3 className="text-2xl font-display font-bold text-navy-900 text-center mb-2">Leave Your Experience</h3>
        <p className="text-xs text-slate-500 text-center mb-6">Are you an active Ojaswi Innovations client? Share your review below.</p>
        
        {submitted ? (
          <div className="bg-success-500/10 border border-success-500/30 p-6 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-success-500 mx-auto" />
            <div className="font-bold text-navy-900">Thank You For Your Review!</div>
            <p className="text-xs text-slate-600">Your feedback has been received and added to our moderation queue.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Rajesh Bhai Patel"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Company / Designation</label>
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="Founder, Tejomay Corp"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Your Review</label>
              <textarea
                required
                rows={3}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Share your experience working with the Ojaswi team..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-gold py-3.5 px-4 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              Submit Verified Feedback <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
