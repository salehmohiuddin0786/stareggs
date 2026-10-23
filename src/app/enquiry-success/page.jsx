'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Truck, ArrowRight, MessageCircle } from 'lucide-react';
import Button from '@/components/common/Button';
import { getWhatsAppLink } from '@/lib/whatsapp';

function SuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref') || 'SUBMITTED';

  return (
    <div className="py-20 md:py-32 bg-brand-navy min-h-[85vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto animate-in zoom-in duration-300">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          ENQUIRY REGISTERED SUCCESSFULLY!
        </h1>

        <p className="text-brand-muted text-base max-w-md mx-auto leading-relaxed">
          Your commercial enquiry has been logged with reference number:
        </p>

        <div className="inline-block px-5 py-2.5 rounded-2xl bg-brand-navy-dark border border-brand-blue/40 font-mono text-base font-bold text-brand-blue">
          REF: #{ref}
        </div>

        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Our Adilabad dispatch coordinator will review your requirement and reach out on your provided contact number during business hours.
        </p>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href={getWhatsAppLink({ type: 'WHOLESALE' })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 rounded-xl text-sm font-bold shadow-lg transition"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Connect on WhatsApp for Immediate Update</span>
          </a>

          <Button href="/" variant="outline" size="md">
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function EnquirySuccessPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-white">Loading confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
