'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

const EXEMPT_PATHS = ['/login', '/register', '/privacy', '/terms', '/sitemap.xml', '/robots.txt'];

export const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isExempt = EXEMPT_PATHS.some(p => pathname?.startsWith(p));

  useEffect(() => {
    if (!isLoading && !user && !isExempt) {
      router.push('/login');
    }
  }, [user, isLoading, isExempt, router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center text-ivory-50">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-display tracking-widest text-gold-300 text-sm uppercase">Ojaswi Innovations</p>
        <p className="text-xs text-slate-400 mt-1">Verifying Enterprise Access Gate...</p>
      </div>
    );
  }

  if (!user && !isExempt) {
    return null; // redirecting
  }

  // Hide Navbar/Footer on login/register pages for a clean full-screen luxury experience
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAuthPage && <Footer />}
    </div>
  );
};
