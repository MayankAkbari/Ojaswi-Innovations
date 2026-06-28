import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-8 text-navy-900">
      <h1 className="text-3xl sm:text-4xl font-display font-bold">Terms of Service & SLAs</h1>
      <p className="text-xs text-slate-500">Effective Date: June 28, 2026 &bull; Ojaswi Innovations (Tejomay Group Pvt Ltd)</p>
      
      <div className="space-y-6 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="text-lg font-bold text-navy-900 mb-2">1. 48-Hour Rapid Delivery Guarantee</h2>
          <p>Ojaswi Innovations commits to deploying the initial staging build of your custom responsive website within 48 business hours following receipt of your brand assets (logo, content guidelines, and deposit).</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-navy-900 mb-2">2. Free Post-Delivery Modifications</h2>
          <p>Depending on your selected tier (Someshwar: 1-6 months, Adityanarayan: 1-6 months, Trivikram: 3-12 months), text and pricing updates are performed at zero extra charge. Complete design overhaul or structural logic changes fall outside free minor modifications.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-navy-900 mb-2">3. Independence Day AMC Offer</h2>
          <p>The ₹5,500/year promotional AMC rate applies to renewals and initial subscriptions finalized prior to August 20, 2026. This fee includes cloud server hosting, SSL renewals, and priority technical assistance.</p>
        </section>
      </div>
    </div>
  );
}
