'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Sparkles, ArrowRight, Lock, Mail, Phone, User, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !password) {
      setError('Please complete all required fields.');
      return;
    }
    setError('');
    setOtpSent(true);
  };

  const handleVerifyAndRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp && otpSent) {
      setError('Please enter the 4-digit OTP sent to your phone/email.');
      return;
    }
    login(email, 'CUSTOMER');
    router.push('/');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-navy-900 text-ivory-50">
      {/* Left Brand Panel */}
      <div className="hero-bg p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gold-500/20 relative overflow-hidden order-2 lg:order-1">
        <div>
          <Link href="/" className="inline-block mb-10">
            <img src="/logo-doc.png" alt="Ojaswi Innovations" className="h-16 w-auto object-contain brightness-110" />
          </Link>
          <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 px-3 py-1 rounded-full text-xs font-semibold mb-6 border border-gold-500/30">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" /> Enterprise Registration
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold leading-tight mb-6">
            Begin Your Digital<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">
              Transformation.
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-md mb-8">
            Join 1,500+ Indian businesses scaling with Ojaswi Innovations. Get immediate access to custom royal packages and automated proposal engines.
          </p>
        </div>

        <div className="pt-8 border-t border-navy-700 text-xs text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
          <span>Your data is protected with enterprise-grade SSL encryption.</span>
        </div>
      </div>

      {/* Right Registration Panel */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-ivory-50 text-navy-900 order-1 lg:order-2">
        <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">Create Client Account</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Step into India&apos;s most luxurious web development portal
            </p>
          </div>

          {error && (
            <div className="bg-danger-500/10 text-danger-500 text-xs font-semibold p-3 rounded-xl border border-danger-500/20 text-center">
              {error}
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Rajesh Bhai Patel"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rajesh@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">WhatsApp / Phone</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-gold py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 mt-4"
              >
                Continue & Verify OTP <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyAndRegister} className="space-y-6">
              <div className="bg-success-500/10 border border-success-500/30 rounded-2xl p-4 text-center">
                <div className="text-sm font-bold text-success-500 mb-1">📱 OTP Verification Sent</div>
                <p className="text-xs text-slate-600">
                  We sent a demo code to <strong>{phone}</strong>.<br />
                  <span className="text-navy-900 font-semibold">Enter any 4 digits (e.g. 1234) to verify.</span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 text-center">Enter 4-Digit Security Code</label>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1 2 3 4"
                  className="w-48 mx-auto block text-center tracking-widest text-2xl font-extrabold py-3 bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-gold py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2"
              >
                Complete Registration <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-center text-xs text-slate-500 hover:text-navy-900 underline"
              >
                Change details or resend OTP
              </button>
            </form>
          )}

          <div className="pt-6 border-t border-slate-200 text-center text-xs text-slate-600">
            Already have a client account?{' '}
            <Link href="/login" className="font-bold text-navy-900 hover:text-gold-500 underline decoration-gold-500 transition-colors ml-1">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
