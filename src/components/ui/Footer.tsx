import React from 'react';
import Link from 'next/link';
import { Sparkles, Phone, Mail, MapPin, ArrowUpRight, ShieldCheck, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-ivory-50 border-t border-gold-500/20 pt-16 pb-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-radial-gradient from-gold-500/10 to-transparent pointer-events-none rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-700">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <img src="/ojaswi-logo-new.png" alt="Ojaswi Innovations" className="h-14 w-auto object-contain brightness-110" />
            </Link>
            <p className="text-gold-300 font-display italic text-lg">
              &ldquo;Guided by Vision. Powered by Innovation.&rdquo;
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              India&apos;s fastest-growing premium website development company. Delivering luxury corporate platforms in exactly 44–48 hours with guaranteed free post-launch support.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-gold-300 bg-navy-800/80 px-3 py-2 rounded-lg border border-gold-500/30 w-fit">
              <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
              <span>A proud flagship sub-brand of <strong>Tejomay Group Pvt Ltd</strong></span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-gold-400 font-semibold text-sm tracking-wider uppercase">Navigation</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-300">
              <li><Link href="/" className="hover:text-gold-300 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-gold-300 transition-colors">About Ojaswi</Link></li>
              <li><Link href="/services" className="hover:text-gold-300 transition-colors">Core Services</Link></li>
              <li><Link href="/packages" className="hover:text-gold-300 transition-colors font-medium text-ivory-50">Royal Packages</Link></li>
              <li><Link href="/our-work" className="hover:text-gold-300 transition-colors">16-Industry Portfolio</Link></li>
              <li><Link href="/reviews" className="hover:text-gold-300 transition-colors">Client Testimonials</Link></li>
            </ul>
          </div>

          {/* Col 4: Royal Packages & AMC */}
          <div className="flex flex-col gap-3">
            <h4 className="text-gold-400 font-semibold text-sm tracking-wider uppercase">Packages & AMC</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-300">
              <li><Link href="/packages/someshwar" className="hover:text-gold-300 transition-colors">The Someshwar Package</Link></li>
              <li><Link href="/packages/adityanarayan" className="hover:text-gold-300 transition-colors">The Adityanarayan Package</Link></li>
              <li><Link href="/packages/trivikram" className="hover:text-gold-300 transition-colors text-gold-300 font-medium">The Trivikram Package ⭐</Link></li>
              <li className="pt-2">
                <Link href="/amc" className="inline-flex items-center gap-1 bg-gold-500/10 text-gold-300 px-2.5 py-1 rounded border border-gold-500/30 text-xs font-semibold hover:bg-gold-500/20 transition-colors">
                  <Sparkles className="w-3 h-3 text-gold-400" /> ₹5,500/yr AMC Offer
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-gold-400 font-semibold text-sm tracking-wider uppercase">Direct Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-300">
              <a
                href="https://wa.me/917069424393"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-gold-300 transition-colors group"
              >
                <Phone className="w-4 h-4 text-gold-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold text-ivory-50">+91 70694 24393</div>
                  <div className="text-xs text-slate-400">24×7 WhatsApp Executive</div>
                </div>
              </a>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span>contact@ojaswi.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span className="text-xs leading-relaxed">Ahmedabad Headquarters, Gujarat, Pan-India Support</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-success-500 bg-success-500/10 px-2.5 py-1.5 rounded w-fit font-medium">
                <Clock className="w-3.5 h-3.5" /> 48-Hour Delivery Active
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} <strong>Ojaswi Innovations</strong> (Tejomay Group Pvt Ltd). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gold-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-300 transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-gold-300 transition-colors">Sitemap</Link>
            <Link href="/login" className="hover:text-gold-300 transition-colors font-medium text-slate-300">Client Portal Gate</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
