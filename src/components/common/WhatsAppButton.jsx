'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick popup menu */}
      {isOpen && (
        <div className="mb-3 w-72 rounded-2xl bg-brand-navy border border-slate-800 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Star Eggs Direct WhatsApp
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-brand-muted hover:text-white p-1 rounded-md transition"
              aria-label="Close WhatsApp Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-brand-muted mb-3 leading-relaxed">
            Need immediate wholesale pricing or dispatch availability? Chat directly with our Adilabad dispatch desk.
          </p>

          <div className="space-y-2">
            <a
              href={getWhatsAppLink({ type: 'WHOLESALE' })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full p-2.5 rounded-xl bg-brand-navy-light hover:bg-brand-blue/20 border border-slate-700/60 text-xs font-medium text-white transition group"
            >
              <span>Wholesale Bulk Pricing</span>
              <span className="text-brand-blue group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href={getWhatsAppLink({ type: 'RETAIL' })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full p-2.5 rounded-xl bg-brand-navy-light hover:bg-brand-blue/20 border border-slate-700/60 text-xs font-medium text-white transition group"
            >
              <span>Retail & Shop Daily Supply</span>
              <span className="text-brand-blue group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href={getWhatsAppLink({ type: 'DISTRIBUTION' })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full p-2.5 rounded-xl bg-brand-navy-light hover:bg-brand-blue/20 border border-slate-700/60 text-xs font-medium text-white transition group"
            >
              <span>District Partnership Enquiry</span>
              <span className="text-brand-blue group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        aria-label="Contact Star Eggs on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="text-sm font-bold tracking-wide hidden sm:inline-block">
          WhatsApp Enquiry
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-red rounded-full border-2 border-brand-navy animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-red rounded-full border-2 border-brand-navy" />
      </button>
    </div>
  );
}
