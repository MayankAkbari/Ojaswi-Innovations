'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { ShieldCheck, Sparkles, ArrowRight, Lock, Mail, KeyRound, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your registered email or phone number.');
      return;
    }
    const role = email.toLowerCase().includes('admin') ? 'ADMIN' : 'CUSTOMER';
    login(email, role);
    router.push(role === 'ADMIN' ? '/admin' : '/');
  };

  const fillDemoCustomer = () => {
    setEmail('customer@ojaswi.com');
    setPassword('Customer@123');
    setError('');
  };

  const fillDemoAdmin = () => {
    setEmail('admin@ojaswi.com');
    setPassword('Admin@123');
    setError('');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-navy-900 text-ivory-50">
      {/* Left Brand Panel */}
      <div className="hero-bg p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gold-500/20 relative overflow-hidden">
        <div>
          <Link href="/" className="inline-block mb-10">
            <img src="/logo-doc.png" alt="Ojaswi Innovations" className="h-16 w-auto object-contain brightness-110" />
          </Link>
          <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 px-3 py-1 rounded-full text-xs font-semibold mb-6 border border-gold-500/30">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" /> Client Portal Gate
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold leading-tight mb-6">
            Guided by Vision.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">
              Powered by Innovation.
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-md mb-8">
            Access your project tracking dashboard, download auto-generated royal proposals, and manage your ₹5,500/year Independence Day AMC renewals.
          </p>
        </div>

        {/* Trust Stats Box */}
        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-navy-700 text-xs sm:text-sm">
          <div className="bg-navy-800/60 p-4 rounded-xl border border-white/5">
            <div className="text-2xl font-bold text-gold-400 font-display">48-Hour</div>
            <div className="text-slate-300 mt-0.5">Rapid Delivery Guarantee</div>
          </div>
          <div className="bg-navy-800/60 p-4 rounded-xl border border-white/5">
            <div className="text-2xl font-bold text-gold-400 font-display">₹5,500/yr</div>
            <div className="text-slate-300 mt-0.5">Lowest AMC in India</div>
          </div>
        </div>
      </div>

      {/* Right Login Panel */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-ivory-50 text-navy-900">
        <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">Sign In</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Enter your credentials to access your enterprise dashboard
            </p>
          </div>

          {/* Quick Demo Credentials Banner */}
          <div className="bg-gold-500/10 border border-gold-500/30 rounded-2xl p-4 text-xs space-y-2.5">
            <div className="font-bold text-navy-900 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-gold-500" /> Instant Review Demo Credentials:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillDemoCustomer}
                className="w-full bg-white hover:bg-gold-50 text-navy-900 font-semibold py-2 px-3 rounded-xl border border-gold-500/30 text-left transition-colors flex items-center justify-between"
              >
                <span>👤 Customer Demo</span>
                <span className="text-[10px] bg-gold-500 text-navy-900 px-1.5 py-0.5 rounded font-bold">Fill</span>
              </button>
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="w-full bg-navy-900 hover:bg-navy-800 text-ivory-50 font-semibold py-2 px-3 rounded-xl border border-navy-700 text-left transition-colors flex items-center justify-between"
              >
                <span>🛡️ Admin CRM Demo</span>
                <span className="text-[10px] bg-gold-500 text-navy-900 px-1.5 py-0.5 rounded font-bold">Fill</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-danger-500/10 text-danger-500 text-xs font-semibold p-3 rounded-xl border border-danger-500/20 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Email / Phone Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@ojaswi.com or +91 98..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-gold py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 mt-2"
            >
              Sign In to Enterprise Portal <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-6 border-t border-slate-200 text-center text-xs text-slate-600">
            Don&apos;t have a client account yet?{' '}
            <Link href="/register" className="font-bold text-navy-900 hover:text-gold-500 underline decoration-gold-500 transition-colors ml-1">
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
