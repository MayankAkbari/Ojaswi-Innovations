import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-8 text-navy-900">
      <h1 className="text-3xl sm:text-4xl font-display font-bold">Privacy Policy</h1>
      <p className="text-xs text-slate-500">Effective Date: June 28, 2026 &bull; Tejomay Group Pvt Ltd</p>
      
      <div className="space-y-6 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="text-lg font-bold text-navy-900 mb-2">1. Data Collection & Usage</h2>
          <p>Ojaswi Innovations collects minimal personal and business information (such as name, email, WhatsApp phone number, and company requirements) strictly for the purpose of communicating architectural estimates, generating PDF proposals, and providing ongoing web maintenance support.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-navy-900 mb-2">2. Zero Third-Party Sharing</h2>
          <p>We do not sell, rent, or trade your corporate information to external marketing agencies or brokers. Your contact details remain encrypted inside our Ahmedabad headquarters servers.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-navy-900 mb-2">3. WhatsApp Communication Gate</h2>
          <p>By registering on our portal or claiming our ₹5,500/year AMC offer, you consent to receive direct transactional updates regarding your website deployment timeline via WhatsApp (+91 70694 24393).</p>
        </section>
      </div>
    </div>
  );
}
