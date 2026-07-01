'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { ShieldCheck, Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    // Bypass Supabase Auth & Database verification for Admin Sign In credentials
    if ((cleanEmail === 'admin@ojaswiinnovation.in' && password === 'Admin@M_2808') || (cleanEmail === 'm.akbari2808@gmail.com' && password === 'Mayank@A_2808')) {
      login(cleanEmail, 'ADMIN', {
        id: 'admin-master-id',
        fullName: 'Mayank Akbari (Admin)',
        phone: '+91 70694 24393',
        addressLine1: 'Tejomay Tower, 4th Floor',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380001'
      });
      router.push('/admin');
      return;
    }

    try {
      // Attempt sign in with Supabase auth silently without email confirmation blocking
      await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      // Check credentials against Supabase backend user_profiles table entry
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('email', cleanEmail)
        .single();

      // If sign in credentials not stored in supabase backend or password does not match
      if (!profile || profile.password !== password) {
        // Strictly restrict user and send to home page with invalid credentials error
        router.push('/?error=invalid_credentials');
        return;
      }

      const isAdmin = cleanEmail === 'admin@ojaswiinnovation.in' || cleanEmail === 'm.akbari2808@gmail.com' || profile.role === 'ADMIN';

      login(cleanEmail, isAdmin ? 'ADMIN' : 'CUSTOMER', {
        id: profile.id,
        fullName: profile.full_name,
        phone: profile.phone,
        addressLine1: profile.address,
        city: profile.city,
        state: profile.state,
        pincode: profile.pincode
      });

      router.push(isAdmin ? '/admin' : '/dashboard');
    } catch (err: any) {
      setError('Invalid credentials or login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-navy-900 text-ivory-50">
      {/* Left Brand Panel */}
      <div className="hero-bg p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gold-500/20 relative overflow-hidden">
        <div>
          <Link href="/" className="inline-block mb-10">
            <img src="/ojaswi-logo-new.png" alt="Ojaswi Innovations" className="h-16 w-auto object-contain brightness-110" />
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

          {error && (
            <div className="bg-danger-500/10 text-danger-500 text-xs font-semibold p-3 rounded-xl border border-danger-500/20 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
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
              disabled={loading}
              className="w-full btn-gold py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 mt-2 disabled:opacity-50 transition-all"
            >
              {loading ? 'Checking Credentials...' : 'Sign In to Enterprise Portal'} <ArrowRight className="w-4 h-4" />
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
