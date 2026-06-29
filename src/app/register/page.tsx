'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Sparkles, ArrowRight, Lock, Mail, Phone, User, ShieldCheck, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !password || !address || !city || !state || !pincode) {
      setError('Please complete all required fields including address details.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPhone = phone.trim();

      // Check if profile already exists in Supabase backend table user_profiles
      const { data: existingProfiles } = await supabase
        .from('user_profiles')
        .select('email, phone')
        .or(`email.eq.${cleanEmail},phone.eq.${cleanPhone}`);

      if (existingProfiles && existingProfiles.length > 0) {
        const matchingEmail = existingProfiles.some(p => p.email.toLowerCase() === cleanEmail);
        if (matchingEmail) {
          setError('An account with this email address already exists. Please Sign In instead.');
        } else {
          setError('An account with this phone number already exists. Please Sign In instead.');
        }
        setLoading(false);
        return;
      }

      // Initiate Supabase Auth in the background
      const { data } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: cleanPhone,
            address: address,
            city: city,
            state: state,
            pincode: pincode,
            role: 'CUSTOMER'
          }
        }
      });

      // Save user profile directly to backend database user_profiles table
      const { error: dbError } = await supabase.from('user_profiles').upsert({
        id: data?.user?.id || `user-${Date.now()}`,
        email: cleanEmail,
        password: password,
        full_name: fullName,
        phone: cleanPhone,
        address: address,
        city: city,
        state: state,
        pincode: pincode
      }, { onConflict: 'email' });

      if (dbError) {
        console.error('Error saving profile to backend:', dbError);
      }

      // Mandatory email verification required: display confirmation prompt
      setVerificationSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to complete registration.');
    } finally {
      setLoading(false);
    }
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
        {verificationSent ? (
          <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-3xl shadow-2xl border border-gold-500/40 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-success-500/20 border-2 border-success-500/50 text-success-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h2 className="text-3xl font-display font-bold text-navy-900">Verify Your Email</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We have sent a mandatory verification link and code to <strong className="text-navy-900 font-semibold">{email}</strong>. Please check your inbox (and spam folder) to verify your account before logging in.
            </p>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-left text-xs text-amber-800 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-amber-600 shrink-0" /> Mandatory Requirement:</div>
              <p>Your account access is restricted until email verification is completed via Supabase authentication.</p>
            </div>
            <div className="pt-4">
              <Link
                href="/login"
                className="w-full btn-gold py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 hover:scale-105 transition-all block"
              >
                Proceed to Client Login <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md space-y-6 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-200">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">Create Client Account</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Step into India&apos;s most luxurious web development portal
              </p>
            </div>

          {error && (
            <div className="bg-danger-500/10 text-danger-500 text-xs font-semibold p-3 rounded-xl border border-danger-500/20 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-3">
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
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rajesh@enterprise.in"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-500" /> Enterprise Billing Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Building/Office No, Street Name"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City (e.g. Surat)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                  />
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State (e.g. Gujarat)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                  />
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Pincode"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Create Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-50 transition-all"
              >
                {loading ? 'Creating Account...' : 'Complete Registration'} <ArrowRight className="w-4 h-4" />
              </button>
          </form>

          <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
            Already have a client account?{' '}
            <Link href="/login" className="font-bold text-navy-900 hover:text-gold-500 underline decoration-gold-500 transition-colors ml-1">
              Sign In
            </Link>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
