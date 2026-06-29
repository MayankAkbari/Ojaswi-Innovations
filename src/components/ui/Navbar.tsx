'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Sparkles, Menu, X, User, LogOut, ShieldAlert, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ribbonVisible, setRibbonVisible] = useState(true);

  const isAdminRole = user?.role && ['ADMIN', 'SALES', 'SUPPORT', 'SUPER_ADMIN'].includes(user.role);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Offer Countdown Ribbon */}
      {ribbonVisible && (
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border-b border-gold-500/30 text-ivory-50 px-4 py-2 text-xs sm:text-sm font-medium relative">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center">
              <Sparkles className="w-4 h-4 text-gold-400 animate-pulse shrink-0" />
              <span>
                <strong className="text-gold-300">Independence Day Special Offer:</strong> Lowest AMC in India at <span className="font-bold underline decoration-gold-400">₹5,500/year</span> <span className="line-through text-slate-400 font-normal">₹8,996</span> — Valid until <span className="text-gold-300 font-semibold">20 Aug 2026</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/amc"
                className="inline-flex items-center gap-1 bg-gold-500/20 hover:bg-gold-500/30 text-gold-300 px-3 py-0.5 rounded-full border border-gold-500/40 text-xs transition-colors font-semibold"
              >
                Claim Offer <ArrowRight className="w-3 h-3" />
              </Link>
              <button
                onClick={() => setRibbonVisible(false)}
                className="text-slate-400 hover:text-ivory-50 transition-colors"
                aria-label="Close offer ribbon"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Container with Logo Near Nav Bar & Centered Nav */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-3 pb-2 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
        {/* Logo OUTSIDE Navigation Bar */}
        <Link href="/" className="flex items-center shrink-0 group">
          <img
            src="/logo-doc.png"
            alt="Ojaswi Innovations Logo"
            className="h-16 sm:h-20 md:h-22 lg:h-24 w-auto max-w-[260px] sm:max-w-[320px] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Floating Pill Navigation Bar */}
        <div className="w-full lg:w-auto relative">
          <nav className="w-full bg-white/95 border border-slate-200/90 shadow-2xl rounded-3xl sm:rounded-full px-5 sm:px-8 py-2.5 sm:py-3 backdrop-blur-xl transition-all flex items-center justify-between lg:justify-end gap-6">
            {/* Desktop Navigation Links (Pages Names Only) */}
            <div className="hidden lg:flex flex-wrap items-center gap-5 xl:gap-6 text-sm font-bold text-navy-900">
              <Link href="/" className="hover:text-gold-600 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-gold-600 transition-colors">About</Link>
              <Link href="/services" className="hover:text-gold-600 transition-colors">Services</Link>
              <Link href="/packages" className="hover:text-gold-600 transition-colors">Packages</Link>
              <Link href="/our-work" className="hover:text-gold-600 transition-colors">Our Work</Link>
              <Link href="/reviews" className="hover:text-gold-600 transition-colors">Reviews</Link>
              <Link href="/amc" className="hover:text-gold-600 transition-colors">AMC</Link>
              <Link href="/contact" className="hover:text-gold-600 transition-colors">Contact</Link>
            </div>

            {/* User Name Clickable Button / Login */}
            <div className="hidden lg:flex items-center gap-3 pl-3 border-l-2 border-slate-200">
              {user ? (
                <div className="flex items-center gap-2">
                  <Link
                    href={isAdminRole ? "/admin" : "/dashboard"}
                    className="bg-navy-900 hover:bg-navy-800 text-gold-300 px-4 py-2 rounded-full font-extrabold text-xs tracking-wide flex items-center gap-2 shadow-md transition-all hover:scale-105 border border-gold-500/40"
                  >
                    <User className="w-3.5 h-3.5 text-gold-400" />
                    <span>{user.fullName}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-1.5 text-slate-400 hover:text-danger-500 transition-colors rounded-full hover:bg-danger-50"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-navy-900 text-ivory-50 px-5 py-2 rounded-full text-xs font-extrabold hover:bg-navy-800 transition-all shadow-md"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center justify-between w-full">
              <span className="text-sm font-extrabold text-navy-900">Menu</span>
              <div className="flex items-center gap-2">
                {user && (
                  <Link
                    href={isAdminRole ? "/admin" : "/dashboard"}
                    className="text-xs bg-navy-900 text-gold-300 px-3 py-1.5 rounded-full font-extrabold flex items-center gap-1 shadow-sm"
                  >
                    <User className="w-3 h-3" /> {user.fullName.split(' ')[0]}
                  </Link>
                )}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-navy-900 hover:text-gold-600 transition-colors rounded-full bg-slate-100 shadow-sm"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Dropdown Drawer */}
          {mobileMenuOpen && (
            <div className="absolute left-0 right-0 z-50 mt-2 bg-white/95 border border-slate-200 shadow-2xl rounded-3xl p-5 backdrop-blur-xl flex flex-col gap-3 text-base font-medium text-navy-900 lg:hidden animate-fade-in">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1 font-bold">Home</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1 font-bold">About</Link>
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1 font-bold">Services</Link>
              <Link href="/packages" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1 font-bold">Packages</Link>
              <Link href="/our-work" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1 font-bold">Our Work</Link>
              <Link href="/reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1 font-bold">Reviews</Link>
              <Link href="/amc" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1 font-bold">AMC</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1 font-bold">Contact</Link>

              <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
                {user ? (
                  <>
                    <Link
                      href={isAdminRole ? "/admin" : "/dashboard"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center bg-navy-900 text-gold-300 py-3 rounded-xl text-sm font-extrabold shadow border border-gold-500/40 flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4 text-gold-400" /> {user.fullName}
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="w-full text-center text-danger-500 py-2 text-sm font-bold hover:underline flex items-center justify-center gap-1"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center bg-navy-900 text-ivory-50 py-3 rounded-xl text-sm font-extrabold shadow"
                  >
                    Client Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
