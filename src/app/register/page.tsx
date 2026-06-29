'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Sparkles, ArrowRight, Lock, Mail, Phone, User, ShieldCheck, MapPin } from 'lucide-react';

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
  
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (oauthError) setError(oauthError.message);
    } catch (err: any) {
      setError(err.message || 'Failed to initiate Google authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleInitiateEmailAuth = async (e: React.FormEvent) => {
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

      // Check if verified profile already exists in Supabase backend table user_profiles
      const { data: existingProfiles } = await supabase
        .from('user_profiles')
        .select('email, phone')
        .or(`email.eq.${cleanEmail},phone.eq.${cleanPhone}`);

      if (existingProfiles && existingProfiles.length > 0) {
        const matchingEmail = existingProfiles.some(p => p.email.toLowerCase() === cleanEmail);
        if (matchingEmail) {
          setError('An account with this email address already exists and is verified. Please Sign In instead.');
        } else {
          setError('An account with this phone number already exists and is verified. Please Sign In instead.');
        }
        setLoading(false);
        return;
      }

      // Initiate Supabase Auth without inserting to database before email verification
      const { data, error: signUpError } = await supabase.auth.signUp({
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

      if (signUpError && !signUpError.message.includes('already registered')) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data?.session) {
        // If auto-confirmed
        await supabase.from('user_profiles').upsert({
          id: data.user?.id,
          email: cleanEmail,
          password: password,
          full_name: fullName,
          phone: cleanPhone,
          address: address,
          city: city,
          state: state,
          pincode: pincode
        }, { onConflict: 'email' });

        login(cleanEmail, 'CUSTOMER', {
          id: data.user?.id,
          fullName,
          phone: cleanPhone,
          addressLine1: address,
          city,
          state,
          pincode
        });
        router.push('/');
        return;
      }

      setOtpSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to initiate sign up.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp && otpSent) {
      setError('Please enter the verification code or token sent to your email.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      let cleanToken = otp.trim();
      if (cleanToken.includes('token=')) {
        const match = cleanToken.match(/token=([^&]+)/);
        if (match) cleanToken = match[1];
      } else if (cleanToken.includes('#access_token=')) {
        const match = cleanToken.match(/access_token=([^&]+)/);
        if (match) cleanToken = match[1];
      }

      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: cleanToken,
        type: 'signup'
      });

      if (verifyError) {
        setError(verifyError.message);
        setLoading(false);
        return;
      }

      // Store user profile in backend database only after successful email verification
      const { error: dbError } = await supabase.from('user_profiles').upsert({
        id: data.user?.id,
        email: email.trim().toLowerCase(),
        password: password,
        full_name: fullName,
        phone: phone.trim(),
        address: address,
        city: city,
        state: state,
        pincode: pincode
      }, { onConflict: 'email' });

      if (dbError) {
        console.error('Error saving profile to backend:', dbError);
      }

      login(email.trim().toLowerCase(), 'CUSTOMER', {
        id: data.user?.id,
        fullName,
        phone,
        addressLine1: address,
        city,
        state,
        pincode
      });
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Verification failed.');
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

          {!otpSent ? (
            <form onSubmit={handleInitiateEmailAuth} className="space-y-3">
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
                      placeholder="rajesh@example.com"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
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
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Street Address / Building</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Tejomay Tower, 4th Floor"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ahmedabad"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Gujarat"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="380001"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
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
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-50 transition-all"
              >
                {loading ? 'Saving & Initiating Auth...' : 'Save & Verify Email'} <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-slate-400 font-semibold">Or register with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-navy-900 font-bold text-sm shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Continue with Google
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyAndRegister} className="space-y-6">
              <div className="bg-success-500/10 border border-success-500/30 rounded-2xl p-4 text-center">
                <div className="text-sm font-bold text-success-500 mb-1">📧 Email Verification Sent</div>
                <p className="text-xs text-slate-600">
                  We sent a confirmation code/link to <strong>{email}</strong>.<br />
                  <span className="text-navy-900 font-semibold">Enter the 6-digit code or paste the verification link/token sent to your email.</span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 text-center">Security Code or Verification Token</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter code or paste link/token"
                  className="w-full px-4 block text-center text-lg font-bold py-3 bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-3.5 px-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
              >
                {loading ? 'Verifying...' : 'Complete Registration'} <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-center text-xs text-slate-500 hover:text-navy-900 underline"
              >
                Change details or resend confirmation
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
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
