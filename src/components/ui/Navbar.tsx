'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ribbonVisible, setRibbonVisible] = useState(true);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-ivory-50 border-b border-gold-500/30 shadow-md">
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
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 pt-3 pb-3 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left Column: Logo Outside Navigation Bar without Brand Name Text */}
        <div className="w-full lg:w-1/3 flex justify-center lg:justify-start items-center">
          <Link href="/" className="flex items-center shrink-0 group">
            <img
              src="/ojaswi-logo-new.png"
              alt="Ojaswi Innovations Logo"
              className="h-16 sm:h-20 md:h-22 lg:h-24 w-auto max-w-[260px] sm:max-w-[300px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Center Column: Navigation Bar Centered in Header with All Rounded Corners Displaying Only Page Names */}
        <div className="w-full lg:w-1/3 flex justify-center items-center shrink-0">
          <div className="w-full lg:w-auto relative">
            <nav className="w-full lg:w-auto bg-white/95 border border-slate-200 shadow-xl rounded-full px-6 sm:px-8 py-3 backdrop-blur-xl transition-all flex items-center justify-between lg:justify-center">
              {/* Desktop Navigation Links (Only Page Names Displayed) */}
              <div className="hidden lg:flex flex-wrap items-center justify-center gap-6 xl:gap-7 text-sm font-bold text-navy-900">
                <Link href="/" className="hover:text-gold-600 transition-colors">Home</Link>
                <Link href="/about" className="hover:text-gold-600 transition-colors">About</Link>
                <Link href="/services" className="hover:text-gold-600 transition-colors">Services</Link>
                <Link href="/packages" className="hover:text-gold-600 transition-colors">Packages</Link>
                <Link href="/our-work" className="hover:text-gold-600 transition-colors">Our Work</Link>
                <Link href="/reviews" className="hover:text-gold-600 transition-colors">Reviews</Link>
                <Link href="/amc" className="hover:text-gold-600 transition-colors">AMC</Link>
                <Link href="/contact" className="hover:text-gold-600 transition-colors">Contact</Link>
              </div>

              {/* Mobile Menu Toggle Button */}
              <div className="lg:hidden flex items-center justify-between w-full gap-4">
                <span className="text-sm font-extrabold text-navy-900">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-navy-900 hover:text-gold-600 transition-colors rounded-full bg-slate-100 shadow-sm"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-600 py-1.5 font-bold">Contact</Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Spacer to Keep Navigation Bar Perfectly Centered */}
        <div className="hidden lg:block lg:w-1/3" />
      </div>
    </header>
  );
};

