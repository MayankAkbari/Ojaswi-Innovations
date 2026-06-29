'use client';

import React, { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles, Download, MessageSquare, Check, Building2, ShieldCheck, Clock, Zap } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { supabase } from '@/lib/supabase';

const PACKAGE_DETAILS: Record<string, { name: string; maxPages: string; prarambhPrice: number; prarambhReg: number; chaturyugPrice: number; chaturyugReg: number; changesMonths: number; support: string }> = {
  someshwar: {
    name: 'The Someshwar Package',
    maxPages: 'Maximum 8-Page Custom Website',
    prarambhPrice: 32997,
    prarambhReg: 41998,
    chaturyugPrice: 47985,
    chaturyugReg: 56898,
    changesMonths: 6,
    support: '1 Year 24×7 Priority Support + 3 Yr Business Hours'
  },
  adityanarayan: {
    name: 'The Adityanarayan Package',
    maxPages: 'Maximum 20-Page Comprehensive Website',
    prarambhPrice: 46985,
    prarambhReg: 52898,
    chaturyugPrice: 68985,
    chaturyugReg: 73898,
    changesMonths: 6,
    support: '1 Year 24×7 Priority Support + 3 Yr Business Hours'
  },
  trivikram: {
    name: 'The Trivikram Package ⭐',
    maxPages: 'Unlimited Pages + Custom Admin Panel / CRM Gate',
    prarambhPrice: 65997,
    prarambhReg: 71998,
    chaturyugPrice: 76985,
    chaturyugReg: 82898,
    changesMonths: 12,
    support: 'Dedicated Account Manager + 4 Year VIP Support'
  }
};

export default function ProposalGeneratorPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = (params?.slug as string) || 'someshwar';
  const initialEdition = searchParams.get('edition')?.includes('Prarambh') ? 'prarambh' : 'chaturyug';

  const pkg = PACKAGE_DETAILS[slug] || PACKAGE_DETAILS['someshwar'];
  const [edition, setEdition] = useState<'prarambh' | 'chaturyug'>(initialEdition as 'prarambh' | 'chaturyug');

  const [companyName, setCompanyName] = useState('');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [domainReq, setDomainReq] = useState('');

  const isChaturyug = edition === 'chaturyug';
  const activePrice = isChaturyug ? pkg.chaturyugPrice : pkg.prarambhPrice;
  const regPrice = isChaturyug ? pkg.chaturyugReg : pkg.prarambhReg;
  const durationYears = isChaturyug ? 4 : 1;

  const recordLead = async () => {
    try {
      await supabase.from('leads').insert({
        id: `lead-${Date.now()}`,
        client_name: clientName || 'Valued Client',
        company_name: companyName || 'Individual Inquiry',
        package_name: `${pkg.name} (${isChaturyug ? 'Chaturyug' : 'Prarambh'})`,
        amount: activePrice,
        status: 'PENDING'
      });
    } catch {
      // Ignore client side errors
    }
  };

  // Generate Official PDF Proposal
  const handleDownloadPDF = () => {
    recordLead();
    const doc = new jsPDF();
    
    // Header styling
    doc.setFillColor(10, 25, 47); // Navy 900
    doc.rect(0, 0, 210, 45, 'F');
    
    doc.setTextColor(212, 175, 55); // Gold 500
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('OJASWI INNOVATIONS', 14, 20);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('A Flagship Enterprise Sub-Brand of Tejomay Group Pvt Ltd', 14, 28);
    doc.text('Ahmedabad Headquarters, Gujarat | +91 70694 24393 | contact@ojaswi.com', 14, 35);

    // Proposal Metadata
    doc.setTextColor(10, 25, 47);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('OFFICIAL ARCHITECTURAL PROPOSAL', 14, 60);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 14, 70);
    doc.text(`Prepared For: ${clientName || 'Valued Enterprise Client'} (${companyName || 'Corporate Entity'})`, 14, 77);
    doc.text(`Contact / WhatsApp: ${phone || 'Not Provided'} | Email: ${email || 'Not Provided'}`, 14, 84);
    doc.text(`Requested Domain: ${domainReq || 'To be selected'}`, 14, 91);

    // Table
    autoTable(doc, {
      startY: 100,
      head: [['Specification / Item', 'Details / SLA Commitment', 'Investment']],
      body: [
        ['Package Architecture', pkg.name, `Regular: INR ${regPrice.toLocaleString('en-IN')}`],
        ['Selected Tier', `${isChaturyug ? 'Chaturyug Edition (4-Year Plan)' : 'Prarambh Edition (1-Year Plan)'}`, `Discounted: INR ${activePrice.toLocaleString('en-IN')}`],
        ['Page Scalability', pkg.maxPages, 'Included'],
        ['High-Speed Cloud Hosting', `${durationYears} Year(s) Dedicated Hosting Included`, 'Included Free'],
        ['Domain Registration', `${durationYears} Year(s) .com / .in Domain Included`, 'Included Free'],
        ['Rapid Deployment SLA', 'Guaranteed Initial Delivery within 48 Business Hours', 'Contractual SLA'],
        ['Free Modifications Window', `${pkg.changesMonths} Months of Free Text & Price Updates`, 'Included Free'],
        ['Independence Day AMC Offer', 'Eligible for INR 5,500/year Fixed Renewal Lock', '38% Savings Lock']
      ],
      headStyles: { fillColor: [10, 25, 47], textColor: [212, 175, 55], fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 6 }
    });

    const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL PAYABLE INVESTMENT (One-Time): INR ' + activePrice.toLocaleString('en-IN'), 14, finalY);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    const notes = [
      'Terms & Conditions:',
      '1. 50% advance deposit initiates the 48-hour development sprint.',
      '2. Remaining balance is due upon client review and staging sign-off.',
      '3. AMC rate is locked at INR 5,500/year under the Independence Day Special Offer.',
      '4. WhatsApp Direct Support is active at +91 70694 24393.'
    ];
    let ny = finalY + 12;
    notes.forEach(n => {
      doc.text(n, 14, ny);
      ny += 6;
    });

    // Signatures
    ny += 15;
    doc.setTextColor(10, 25, 47);
    doc.setFont('helvetica', 'bold');
    doc.text('For Ojaswi Innovations:', 14, ny);
    doc.text('Client Acceptance Sign-Off:', 120, ny);
    doc.setFont('helvetica', 'normal');
    doc.text('Authorized Signatory (Tejomay Group)', 14, ny + 15);
    doc.text('Signature / Date', 120, ny + 15);

    doc.save(`Ojaswi_Proposal_${slug}_${companyName || 'Client'}.pdf`);
  };

  const whatsappText = `Hello Ojaswi Innovations Team,
I have customized and generated my official proposal:
*Package:* ${pkg.name} (${isChaturyug ? 'Chaturyug Edition - 4 Years' : 'Prarambh Edition - 1 Year'})
*Total Investment:* ₹${activePrice.toLocaleString('en-IN')}
*My Company:* ${companyName || 'Not Provided'}
*Name:* ${clientName || 'Not Provided'}
*Domain Idea:* ${domainReq || 'Not Provided'}

Please send invoice details so we can initiate the 48-hour build!`;

  const whatsappUrl = `https://wa.me/917069424393?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="space-y-16 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-gold-500/10 text-gold-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-gold-500/30">
          <Sparkles className="w-3.5 h-3.5" /> Dynamic Proposal Engine
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-navy-900 tracking-tight">
          Customize Your Royal Specification
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Configure your enterprise variables below to preview your formal architectural contract and download the official PDF proposal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Questionnaire Form (Cols 1-7) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-xl font-display font-bold text-navy-900">1. Select Tier & Edition</h3>
            <p className="text-xs text-slate-500 mt-1">Switch between our 1-year launch tier and our 4-year discounted growth tier.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setEdition('prarambh')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                !isChaturyug 
                  ? 'border-gold-500 bg-gold-500/10 shadow-md ring-2 ring-gold-500/50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-bold uppercase text-slate-500">Prarambh Edition</div>
              <div className="text-lg font-bold text-navy-900 mt-1">1 Year Plan</div>
              <div className="text-xs font-semibold text-gold-600 mt-2">₹{pkg.prarambhPrice.toLocaleString('en-IN')}</div>
            </button>

            <button
              type="button"
              onClick={() => setEdition('chaturyug')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isChaturyug 
                  ? 'border-gold-500 bg-navy-900 text-ivory-50 shadow-xl ring-2 ring-gold-500' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-gold-400">Chaturyug Edition ⭐</span>
                <span className="text-[10px] bg-success-500 text-ivory-50 px-1.5 py-0.5 rounded font-bold">Best Value</span>
              </div>
              <div className="text-lg font-bold mt-1">4 Year Plan</div>
              <div className="text-xs font-semibold text-gold-300 mt-2">₹{pkg.chaturyugPrice.toLocaleString('en-IN')}</div>
            </button>
          </div>

          <div className="border-b border-slate-200 pb-4 pt-4">
            <h3 className="text-xl font-display font-bold text-navy-900">2. Corporate Details</h3>
            <p className="text-xs text-slate-500 mt-1">Used to format your official PDF header and contractual sign-off.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Tejomay Exports Pvt Ltd"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Authorized Contact Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Rajesh Bhai Patel"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">WhatsApp Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Corporate Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rajesh@tejomay.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Preferred Domain Name (.com / .in)</label>
            <input
              type="text"
              value={domainReq}
              onChange={(e) => setDomainReq(e.target.value)}
              placeholder="www.tejomayexports.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Live Proposal Preview Card (Cols 8-12) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 text-ivory-50 p-6 sm:p-8 rounded-3xl border-2 border-gold-500 shadow-2xl space-y-6 relative overflow-hidden">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gold-400">Formal Specification</div>
                <h3 className="text-xl font-display font-bold text-ivory-50 mt-0.5">{pkg.name}</h3>
              </div>
              <span className="text-xs bg-gold-500 text-navy-900 font-bold px-2.5 py-1 rounded-md">
                {isChaturyug ? '4 Years' : '1 Year'}
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Client Entity:</span>
                <strong className="text-ivory-50">{companyName || 'Pending Input...'}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Contact Lead:</span>
                <strong className="text-ivory-50">{clientName || 'Pending Input...'}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Page Limit:</span>
                <strong className="text-gold-300">{pkg.maxPages}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Free Changes:</span>
                <strong className="text-success-400">{pkg.changesMonths} Full Months Included</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Delivery SLA:</span>
                <strong className="text-success-400 flex items-center gap-1"><Zap className="w-3 h-3" /> 48-Hour Guarantee</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Regular Price:</span>
                <span className="line-through">₹{regPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold text-gold-300">Total Investment:</span>
                <span className="text-3xl font-extrabold text-ivory-50 tracking-tight">₹{activePrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="text-[11px] text-center text-success-400 font-medium pt-1 border-t border-white/5">
                Eligible for ₹5,500/yr Independence Day AMC Lock
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-white hover:bg-gold-50 text-navy-900 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4 text-gold-600" /> Download Official PDF Proposal
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={recordLead}
                className="w-full btn-gold py-4 px-4 rounded-xl font-bold text-sm text-center block shadow-xl flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" /> Buy & Send to WhatsApp HQ
              </a>
            </div>

            <div className="text-center text-[11px] text-slate-400 pt-2 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" /> Backed by Tejomay Group Corporate SLA
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
