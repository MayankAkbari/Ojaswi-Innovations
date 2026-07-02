'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles, ExternalLink, Filter, ArrowRight, Building2 } from 'lucide-react';

const INDUSTRIES = [
  'All Sectors',
  'Private Hospitals',
  'Textile Manufacturers',
  'Packaging Companies',
  'Real Estate',
  'Interior Designers',
  'Hotels',
  'Wedding Planners',
  'Garment Wholesalers',
  'Jewellery Stores',
  'Chartered Accountants',
  'Logistics Companies',
  'Cafes',
  'Agriculture Exporters',
  'Builders',
  'Infrastructure Companies',
  'Dairy Businesses'
];

interface PortfolioItem {
  industry: string;
  title: string;
  desc: string;
  tag: string;
  link?: string;
  image?: string;
}

const PORTFOLIO_DATA: PortfolioItem[] = [
  { 
    industry: 'Private Hospitals', 
    title: 'Aarogya Multi-Specialty Hospital', 
    desc: 'Appointment booking & emergency doctor contact portals built for rapid mobile loading.', 
    tag: 'Trivikram Package ⭐',
    link: 'https://aarogya-multi-specialty-hospital.vercel.app/',
    image: '/portfolio/aarogya-logo.png'
  },
  { 
    industry: 'Textile Manufacturers', 
    title: 'Shree Fabrics Export Corp', 
    desc: 'High-resolution wholesale fabric catalog displays with B2B WhatsApp export pipelines.', 
    tag: 'Adityanarayan Package',
    link: 'https://shree-fabrics-export-corp.vercel.app/',
    image: '/portfolio/shree-fabrics-logo.png'
  },
  { 
    industry: 'Packaging Companies', 
    title: 'Apex Corrugated Solutions', 
    desc: 'Box dimension calculation quote request forms and industrial client testimonials.', 
    tag: 'Someshwar Package',
    link: 'https://apex-corrugated-solutions.vercel.app/',
    image: '/portfolio/apex-corrugated-logo.png'
  },
  { industry: 'Real Estate', title: 'Tejomay Heights Luxury Living', desc: '3D virtual walkthrough gallery, downloadable brochures, and site visit booking engine.', tag: 'Trivikram Package ⭐' },
  { industry: 'Interior Designers', title: 'Vogue Spaces Interior Studio', desc: 'Before-and-after project sliders with modular kitchen estimation calculator.', tag: 'Adityanarayan Package' },
  { industry: 'Hotels', title: 'The Royal Heritage Resort', desc: 'Room availability request suite and wedding banquet hall tour booking.', tag: 'Adityanarayan Package' },
  { industry: 'Wedding Planners', title: 'Mangalam Grand Events', desc: 'Exquisite bridal decoration showcase and custom theme package selector.', tag: 'Someshwar Package' },
  { industry: 'Garment Wholesalers', title: 'Surat Silk Mill Direct Outlet', desc: 'Wholesale minimum order catalog with bulk WhatsApp ordering interface.', tag: 'Adityanarayan Package' },
  { industry: 'Jewellery Stores', title: 'Mahalakshmi Gold & Diamonds', desc: 'Live gold rate ticker bar with high-end diamond collection zoom display.', tag: 'Trivikram Package ⭐' },
  { industry: 'Chartered Accountants', title: 'Shah & Associates Advisors', desc: 'GST filing deadline calculator and secure client document inquiry portal.', tag: 'Someshwar Package' },
  { industry: 'Logistics Companies', title: 'Express Cargo & Supply Chain', desc: 'Live consignment tracking simulator and pan-India freight quote calculator.', tag: 'Trivikram Package ⭐' },
  { industry: 'Cafes', title: 'Brew & Beans Artisan Cafe', desc: 'Interactive digital QR menu display with online table reservation system.', tag: 'Someshwar Package' },
  { industry: 'Agriculture Exporters', title: 'Kisan Global Organic Agro', desc: 'International quality certification badges and bulk shipment container tracking.', tag: 'Adityanarayan Package' },
  { industry: 'Builders', title: 'Sankalp Commercial Constructions', desc: 'Ongoing structural milestone updates and investor PDF brochure downloads.', tag: 'Trivikram Package ⭐' },
  { industry: 'Infrastructure Companies', title: 'Highway Engineering Projects Ltd', desc: 'Government tender display and heavy machinery fleet showcase.', tag: 'Trivikram Package ⭐' },
  { industry: 'Dairy Businesses', title: 'Amrut Milk & Dairy Products', desc: 'Daily distributor route booking and organic milk farm quality story.', tag: 'Someshwar Package' }
];

export default function OurWorkPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('All Sectors');

  const filtered = selectedIndustry === 'All Sectors'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter(item => item.industry === selectedIndustry);

  return (
    <div className="space-y-16 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-gold-500/10 text-gold-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-gold-500/30">
          <Sparkles className="w-3.5 h-3.5" /> Proven Execution Across 16 Industries
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-bold text-navy-900 tracking-tight">
          Our Architectural Portfolio
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          From multi-specialty hospitals to textile exporters, explore how Ojaswi elevates Indian corporate identities in exactly 48 hours.
        </p>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin">
        <Filter className="w-4 h-4 text-gold-500 shrink-0 ml-1" />
        {INDUSTRIES.map((ind) => (
          <button
            key={ind}
            onClick={() => setSelectedIndustry(ind)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedIndustry === ind
                ? 'bg-navy-900 text-ivory-50 shadow-md scale-105 border border-gold-500/50'
                : 'bg-white text-navy-900 border border-slate-200 hover:border-gold-500/40'
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item, idx) => (
          <GlassCard key={idx} className="flex flex-col justify-between space-y-6 group">
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer group/link"
              >
                <div className="aspect-video rounded-xl bg-navy-900/5 overflow-hidden relative mb-4 border border-slate-200">
                  <img
                    src={item.image || `https://images.unsplash.com/photo-${1500000000000 + idx * 100000}?auto=format&fit=crop&w=600&q=80`}
                    alt={item.title}
                    className={`w-full h-full transition-transform duration-500 group-hover/link:scale-105 ${
                      item.image ? 'object-contain bg-white p-4' : 'object-cover group-hover:scale-110'
                    }`}
                  />
                  <div className="absolute top-3 left-3 bg-navy-900/90 text-ivory-50 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm">
                    {item.industry}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gold-600 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
                    {item.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-gold-600 group-hover/link:underline">
                    Visit Website <ExternalLink className="w-3 h-3" />
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-navy-900 group-hover/link:text-gold-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">{item.desc}</p>
              </a>
            ) : (
              <div>
                <div className="aspect-video rounded-xl bg-navy-900/5 overflow-hidden relative mb-4 border border-slate-200">
                  <img
                    src={item.image || `https://images.unsplash.com/photo-${1500000000000 + idx * 100000}?auto=format&fit=crop&w=600&q=80`}
                    alt={item.title}
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${
                      item.image ? 'object-contain bg-white p-4' : 'object-cover'
                    }`}
                  />
                  <div className="absolute top-3 left-3 bg-navy-900/90 text-ivory-50 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm">
                    {item.industry}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gold-600 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-navy-900 group-hover:text-gold-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">{item.desc}</p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-400">Deployed in 48h</span>
              <a
                href="https://wa.me/917069424393?text=I%20want%20a%20website%20similar%20to%20your%20portfolio%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-gold-600 transition-colors"
              >
                Request Similar Build <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </GlassCard>
        ))}
      </div>

    </div>
  );
}
