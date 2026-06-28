'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Sparkles, Download, MessageSquare, Clock, ShieldCheck, Zap } from 'lucide-react';

export interface PricingCardProps {
  packageId: string;
  packageSlug: string;
  packageName: string;
  editionName: string;
  price: number;
  discountPrice: number;
  features: string[];
  maxPages?: number | null;
  isFlagship?: boolean;
  onGenerateProposal?: () => void;
  onBuy?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  packageSlug,
  packageName,
  editionName,
  price,
  discountPrice,
  features,
  maxPages,
  isFlagship = false,
  onGenerateProposal,
  onBuy
}) => {
  const savings = price - discountPrice;

  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
        isFlagship
          ? 'bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 text-ivory-50 border-2 border-gold-500 shadow-2xl scale-105 z-10'
          : 'glass-panel text-navy-900 hover:-translate-y-1 hover:shadow-xl'
      }`}
    >
      {/* Flagship Ribbon */}
      {isFlagship && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-300 to-gold-500 text-navy-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Includes Custom Admin Panel
        </div>
      )}

      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight">
              {packageName.replace('The ', '')}
            </h3>
            <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded inline-block mt-1 ${
              editionName.includes('Chaturyug') 
                ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' 
                : 'bg-navy-900/10 text-navy-700'
            }`}>
              {editionName}
            </span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-success-500/10 text-success-500 border border-success-500/20 flex items-center gap-1">
            <Zap className="w-3 h-3" /> 48h Delivery
          </span>
        </div>

        {/* Max Pages Info */}
        <div className="text-xs font-medium text-slate-400 mb-6 flex items-center gap-1.5">
          <span>Scale:</span>
          <strong className={isFlagship ? 'text-gold-300' : 'text-navy-900'}>
            {maxPages === null ? 'Unlimited Pages (Enterprise)' : `Maximum ${maxPages}-Page Website`}
          </strong>
        </div>

        {/* Price Box */}
        <div className="mb-6 p-4 rounded-2xl bg-navy-900/5 border border-navy-900/10 backdrop-blur-sm">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums">
              ₹{discountPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-sm line-through text-slate-400 tabular-nums">
              ₹{price.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-success-500 bg-success-500/10 px-2 py-0.5 rounded">
              Save ₹{savings.toLocaleString('en-IN')} Today
            </span>
            <span className="text-slate-400">One-time payment</span>
          </div>
        </div>

        {/* USP Micro badges */}
        <div className="grid grid-cols-2 gap-2 mb-6 text-xs font-medium">
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/5 border border-white/10">
            <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>Free Changes Guaranteed</span>
          </div>
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/5 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>₹5,500/yr AMC Eligible</span>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-8 text-sm">
          <div className="font-semibold text-xs uppercase tracking-wider text-slate-400">What&apos;s Included:</div>
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div className="mt-0.5 rounded-full bg-gold-500/20 p-0.5 text-gold-400 shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="leading-snug text-xs sm:text-sm">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
        <Link
          href={`/proposal/${packageSlug}?edition=${encodeURIComponent(editionName)}`}
          onClick={onGenerateProposal}
          className="w-full py-2.5 px-4 rounded-xl text-center font-semibold text-xs sm:text-sm border border-gold-500/40 hover:bg-gold-500/10 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4 text-gold-400" />
          Download Proposal PDF
        </Link>
        <button
          onClick={onBuy}
          className="w-full btn-gold py-3 px-4 rounded-xl text-center font-bold text-sm shadow-lg flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          Buy Package (WhatsApp)
        </button>
      </div>
    </div>
  );
};
