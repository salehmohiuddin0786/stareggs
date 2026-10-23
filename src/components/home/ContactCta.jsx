'use client';

import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Phone, Mail, ShieldCheck } from 'lucide-react';
import Button from '@/components/common/Button';
import { getWhatsAppLink } from '@/lib/whatsapp';
import ScrollReveal from '@/components/motion/ScrollReveal';

export default function ContactCta() {
  return (
    <section className="py-20 bg-brand-navy relative overflow-hidden border-t border-slate-800">
      {/* Dynamic Background Highlights */}
      <div className="absolute inset-0 bg-radial-spotlight opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="scale" delay={0.1}>
          <div className="rounded-3xl bg-gradient-to-br from-brand-navy-light via-brand-navy to-brand-navy-dark border border-brand-blue/30 p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          {/* Subtle Top Light Accent */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy border border-slate-700/80 text-xs font-bold uppercase tracking-widest text-brand-red">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span>READY TO STREAMLINE YOUR EGG SUPPLY?</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              SECURE DEPENDABLE WHOLESALE SUPPLY{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">
                FOR YOUR BUSINESS TODAY.
              </span>
            </h2>

            <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
              Connect directly with our Hyderabad commercial operations desk. Request customized volume quotation tiers or discuss regional distribution partnership terms across Telangana.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                href="/wholesale"
                variant="primary"
                size="lg"
                icon={ArrowUpRight}
                className="shadow-glow-blue"
              >
                Request Commercial Quotation
              </Button>

              <a
                href={getWhatsAppLink({ type: 'WHOLESALE' })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-4 rounded-xl font-display font-bold text-sm tracking-wide shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Quick WhatsApp Connect</span>
              </a>
            </div>

            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Direct Farm Logistics
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Phone className="w-4 h-4 text-brand-blue" />
                Dispatch Desk: {process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 98765 43210'}
              </span>
              <span>•</span>
              <span className="text-slate-400">
                Daily Morning Deliveries Across Greater Hyderabad & Expanding Telangana Corridors
              </span>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
