'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Sparkles, Menu, X, ArrowRight, User, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const isAdminRole = user?.role && ['ADMIN', 'SALES', 'SUPPORT', 'SUPER_ADMIN'].includes(user.role);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ribbonVisible, setRibbonVisible] = useState(true);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-transparent">
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

      {/* Header Container with Logo Outside (Left Corner), Centered Rounded Nav Bar, and Right Spacer */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-3 pb-3 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left Column: Logo Outside Navigation Bar without Brand Name Text */}
        <div className="w-full lg:w-auto lg:flex-1 flex justify-center lg:justify-start items-center">
          <Link href="/" className="flex items-center shrink-0 group">
            <img
              src="/ojaswi-logo-new.png"
              alt="Ojaswi Innovations Logo"
              className="h-16 sm:h-20 md:h-22 lg:h-24 w-auto max-w-[260px] sm:max-w-[300px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Center Column: 3D Rounded Navigation Bar Box Displaying Only Page Names */}
        <div className="w-full lg:w-auto flex justify-center items-center shrink-0">
          <div className="w-full lg:w-auto relative">
            <nav className="w-full lg:w-auto bg-gradient-to-b from-white via-ivory-50 to-slate-100/95 border border-t-white border-b-slate-300 border-x-slate-200 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.15),0_8px_12px_-6px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.06)] rounded-full px-6 lg:px-8 xl:px-9 py-3 transition-all duration-300 hover:shadow-[0_16px_34px_-6px_rgba(0,0,0,0.18),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.08)] flex items-center justify-between lg:justify-center">
              {/* Desktop Navigation Links (Only Page Names Displayed inside 3D Rounded Box on a Single Horizontal Line) */}
              <div className="hidden lg:flex flex-nowrap items-center justify-center gap-5 xl:gap-7 text-sm font-extrabold text-navy-900 whitespace-nowrap">
                <Link href="/" className="hover:text-gold-600 transition-colors shrink-0 py-1">Home</Link>
                <Link href="/about" className="hover:text-gold-600 transition-colors shrink-0 py-1">About</Link>
                <Link href="/services" className="hover:text-gold-600 transition-colors shrink-0 py-1">Services</Link>
                <Link href="/packages" className="hover:text-gold-600 transition-colors shrink-0 py-1">Packages</Link>
                <Link href="/our-work" className="hover:text-gold-600 transition-colors shrink-0 py-1">Our Work</Link>
                <Link href="/reviews" className="hover:text-gold-600 transition-colors shrink-0 py-1">Reviews</Link>
                <Link href="/amc" className="hover:text-gold-600 transition-colors shrink-0 py-1">AMC</Link>
                <Link href="/contact" className="hover:text-gold-600 transition-colors shrink-0 py-1">Contact</Link>
              </div>

              {/* Mobile Menu Toggle Button */}
              <div className="lg:hidden flex items-center justify-between w-full gap-4">
                <span className="text-sm font-extrabold text-navy-900">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 text-navy-900 hover:text-gold-600 transition-colors rounded-full bg-slate-100 shadow-inner"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </nav>

            {/* Mobile Dropdown Drawer (Only Page Names Displayed) */}
            {mobileMenuOpen && (
              <div className="absolute left-0 right-0 z-50 mt-3 bg-white/98 border border-slate-200 shadow-2xl rounded-3xl p-6 backdrop-blur-xl flex flex-col gap-3 text-base font-medium text-navy-900 lg:hidden animate-fade-in">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1.5 font-bold border-b border-slate-100">Home</Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1.5 font-bold border-b border-slate-100">About</Link>
                <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1.5 font-bold border-b border-slate-100">Services</Link>
                <Link href="/packages" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1.5 font-bold border-b border-slate-100">Packages</Link>
                <Link href="/our-work" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1.5 font-bold border-b border-slate-100">Our Work</Link>
                <Link href="/reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1.5 font-bold border-b border-slate-100">Reviews</Link>
                <Link href="/amc" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1.5 font-bold border-b border-slate-100">AMC</Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1.5 font-bold border-b border-slate-100">Contact</Link>
                
                <div className="pt-3 mt-1 border-t border-slate-200 flex flex-col gap-2.5">
                  {user ? (
                    <div className="flex flex-col gap-2">
                      <Link
                        href={isAdminRole ? "/admin" : "/dashboard"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-navy-900 px-4 py-2.5 rounded-full font-extrabold text-xs tracking-wide shadow-md border border-gold-300"
                      >
                        <User className="w-4 h-4 text-navy-900" />
                        <span>{isAdminRole ? "Admin Portal" : "Client Dashboard"} ({user.fullName})</span>
                      </Link>
                      <button
                        onClick={() => { logout(); setMobileMenuOpen(false); }}
                        className="w-full py-2 text-xs font-bold text-danger-600 bg-slate-50 border border-danger-500/30 rounded-full flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-navy-900 px-5 py-2.5 rounded-full text-xs font-extrabold shadow-md border border-gold-300"
                    >
                      <User className="w-4 h-4 text-navy-900" />
                      <span>Admin / Client Portal Login</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Admin / Client Portal Button and Logout Transferred from Footer */}
        <div className="hidden lg:flex lg:flex-1 justify-end items-center gap-2.5 shrink-0">
          {user ? (
            <div className="flex items-center gap-2.5">
              <Link
                href={isAdminRole ? "/admin" : "/dashboard"}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-navy-900 px-4 py-2 rounded-full font-extrabold text-xs tracking-wide shadow-md transition-all hover:scale-105 border border-gold-300 shrink-0"
              >
                <User className="w-3.5 h-3.5 text-navy-900 shrink-0" />
                <span className="truncate max-w-[200px] xl:max-w-[260px]">{isAdminRole ? "Admin Portal" : "Client Dashboard"} ({user.fullName})</span>
              </Link>
              <button
                onClick={logout}
                className="px-3.5 py-2 text-xs font-bold text-danger-600 hover:text-danger-700 bg-white hover:bg-slate-50 border border-danger-500/30 rounded-full transition-all flex items-center gap-1 shadow-sm shrink-0"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5 shrink-0" /> Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-navy-900 px-5 py-2 rounded-full text-xs font-extrabold shadow-md transition-all hover:scale-105 border border-gold-300 shrink-0"
            >
              <User className="w-3.5 h-3.5 text-navy-900 shrink-0" />
              <span>Admin / Client Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

