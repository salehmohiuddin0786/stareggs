import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy-dark text-white border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-brand-blue/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-800">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Logo subtitle={false} />
            <p className="text-brand-muted text-sm leading-relaxed max-w-sm mt-3">
              STAR EGGS is a premier egg wholesale, retail supply, and distribution brand headquartered in Adilabad and expanding across all 33 districts of Telangana. Direct farm sourcing, strict candling standards, and reliable daily logistics.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-navy border border-slate-800 text-xs text-slate-300">
                <Truck className="w-3.5 h-3.5 text-brand-blue" />
                <span>Daily Telangana Logistics</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-navy border border-slate-800 text-xs text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Shell-Shock Transit</span>
              </div>
            </div>
          </div>

          {/* Column 2: Commercial Supply */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white mb-4">
              Commercial Supply
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li>
                <Link href="/wholesale" className="hover:text-white transition flex items-center justify-between">
                  <span>Wholesale Pulp Trays (30s)</span>
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="hover:text-white transition flex items-center justify-between">
                  <span>Master Cartons (210s)</span>
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="hover:text-white transition flex items-center justify-between">
                  <span>Retail Shop Standing Orders</span>
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="hover:text-white transition flex items-center justify-between">
                  <span>Supermarket Bulk Supplies</span>
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="hover:text-white transition flex items-center justify-between">
                  <span>Hotel & Bakery Contracts</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Network & Coverage */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white mb-4">
              Telangana Network
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li>
                <Link href="/#telangana-coverage" className="hover:text-white transition">
                  Adilabad HQ (Daily Active Hub)
                </Link>
              </li>
              <li>
                <Link href="/#telangana-coverage" className="hover:text-white transition">
                  Nizamabad & Nirmal
                </Link>
              </li>
              <li>
                <Link href="/#telangana-coverage" className="hover:text-white transition">
                  Warangal & Karimnagar
                </Link>
              </li>
              <li>
                <Link href="/#telangana-coverage" className="hover:text-white transition">
                  Mancherial & Asifabad
                </Link>
              </li>
              <li>
                <Link href="/distribution" className="text-brand-red hover:text-red-400 font-semibold transition flex items-center gap-1">
                  <span>Become a Distributor</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Commercial Contacts */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white mb-4">
              Commercial Desk
            </h4>
            <div className="space-y-3 text-sm text-brand-muted">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || '+919876543210'}`}
                className="flex items-start gap-2.5 hover:text-white transition group"
              >
                <Phone className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                <span>{process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 98765 43210'}</span>
              </a>

              <a
                href={getWhatsAppLink({ type: 'GENERAL' })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-emerald-400 hover:text-emerald-300 transition group"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>WhatsApp Dispatch Desk</span>
              </a>

              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || 'enquiry@stareggs.in'}`}
                className="flex items-start gap-2.5 hover:text-white transition group"
              >
                <Mail className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                <span>{process.env.NEXT_PUBLIC_EMAIL || 'enquiry@stareggs.in'}</span>
              </a>

              <a
                href={process.env.NEXT_PUBLIC_GOOGLE_MAPS_LINK || 'https://maps.app.goo.gl/BzzxbCL7VV8kjbS26'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 pt-1 text-xs text-slate-400 hover:text-white transition group"
              >
                <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-semibold text-slate-300 group-hover:text-brand-blue transition-colors">Head Office & Shop Location:</span>
                  <br />
                  <span>Commercial Complex, Market Road, Near Old Bus Stand, Adilabad, Telangana 504001</span>
                  <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-brand-red group-hover:underline">
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} STAR EGGS. All rights reserved. Commercial wholesale & retail egg supply network across Telangana, India.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-brand-muted transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-muted transition">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-brand-muted transition">
              Support Desk
            </Link>
            <Link href="/admin/login" className="text-slate-600 hover:text-brand-blue transition">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
