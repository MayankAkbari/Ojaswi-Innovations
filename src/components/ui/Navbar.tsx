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

      {/* Glass Navigation Bar */}
      <nav className="glass-panel border-b border-white/20 px-4 sm:px-6 lg:px-8 py-3 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Ojaswi Innovations Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-navy-900">
            <Link href="/" className="hover:text-gold-500 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-gold-500 transition-colors">About Us</Link>
            <Link href="/services" className="hover:text-gold-500 transition-colors">Services</Link>
            <Link href="/packages" className="hover:text-gold-500 transition-colors font-semibold flex items-center gap-1">
              Packages <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />
            </Link>
            <Link href="/our-work" className="hover:text-gold-500 transition-colors">Our Work</Link>
            <Link href="/reviews" className="hover:text-gold-500 transition-colors">Reviews</Link>
            <Link href="/amc" className="hover:text-gold-500 transition-colors">AMC Offer</Link>
            <Link href="/contact" className="hover:text-gold-500 transition-colors">Contact</Link>
          </div>

          {/* Actions & User State */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-navy-900/10">
                <Link
                  href={isAdminRole ? "/admin" : "/dashboard"}
                  className="flex items-center gap-2 bg-navy-900 text-ivory-50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-navy-800 transition-colors shadow-sm"
                >
                  <User className="w-4 h-4 text-gold-400" />
                  <span>{user.fullName.split(' ')[0]}</span>
                  <span className="text-[10px] uppercase bg-gold-500 text-navy-900 px-1.5 py-0.5 rounded font-bold">
                    {user.role}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-danger-500 transition-colors rounded-lg hover:bg-danger-500/10"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-navy-900 hover:text-gold-500 px-3 py-2 transition-colors"
                >
                  Client Login
                </Link>
                <Link
                  href="/packages"
                  className="btn-gold px-5 py-2.5 rounded-lg text-sm shadow-md flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" /> Get Free Proposal
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            {user && (
              <Link
                href={isAdminRole ? "/admin" : "/dashboard"}
                className="text-xs bg-navy-900 text-gold-300 px-2.5 py-1.5 rounded-md font-semibold flex items-center gap-1"
              >
                <User className="w-3 h-3" /> {user.role}
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-navy-900 hover:text-gold-500 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-navy-900/10 flex flex-col gap-3 pb-3 text-base font-medium text-navy-900">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-500 py-1">Home</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-500 py-1">About Us</Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-500 py-1">Services</Link>
            <Link href="/packages" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-500 py-1 font-semibold text-gold-500">Packages & Pricing</Link>
            <Link href="/our-work" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-500 py-1">Our Work (Portfolio)</Link>
            <Link href="/reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-500 py-1">Client Reviews</Link>
            <Link href="/amc" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-500 py-1">AMC Special Offer</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-500 py-1">Contact Us</Link>

            <div className="pt-3 border-t border-navy-900/10 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    href={isAdminRole ? "/admin" : "/dashboard"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center bg-navy-900 text-ivory-50 py-2 rounded-lg text-sm font-semibold"
                  >
                    Open {isAdminRole ? 'Admin Portal' : 'Client Dashboard'}
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="w-full text-center text-danger-500 py-1 text-sm font-medium hover:underline flex items-center justify-center gap-1"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center border border-navy-900 text-navy-900 py-2 rounded-lg text-sm font-semibold"
                  >
                    Client Login / Register
                  </Link>
                  <Link
                    href="/packages"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center btn-gold py-2.5 rounded-lg text-sm font-semibold"
                  >
                    Get Free Proposal
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
