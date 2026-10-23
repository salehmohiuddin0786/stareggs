'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, ArrowUpRight, MessageCircle } from 'lucide-react';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function TopBrandHeader() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-brand-navy/85 backdrop-blur-md border-b border-slate-800/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo with Adilabad Subtitle */}
          <Logo />

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Quick Chat */}
            <a
              href={getWhatsAppLink({ type: 'GENERAL' })}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-xl text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition flex items-center gap-1.5 text-xs font-bold"
              aria-label="Direct WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || '+919876543210'}`}
              className="p-2 sm:p-2.5 rounded-xl text-slate-300 bg-white/5 border border-slate-800 hover:text-white hover:bg-white/10 transition flex items-center gap-1.5 text-xs font-bold"
              title="Call Dispatch Desk"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">Call Dispatch</span>
            </a>

            {/* Quick Request Pricing CTA */}
            <Button
              href="/wholesale"
              variant="primary"
              size="sm"
              icon={ArrowUpRight}
              className="shadow-glow-blue whitespace-nowrap text-xs sm:text-sm py-2 px-3 sm:px-4"
            >
              <span className="hidden xs:inline">Request</span> Pricing
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
