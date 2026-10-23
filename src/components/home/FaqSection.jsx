'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import ScrollReveal from '@/components/motion/ScrollReveal';

const faqs = [
  {
    q: 'What is the minimum order quantity (MOQ) for commercial delivery?',
    a: 'For retail shops within active Hyderabad daily fleet routes, standard MOQ is 10 trays (300 eggs). For wholesale bulk master boxes (210 eggs/box), MOQ is typically 5 master cartons (1,050 eggs). Custom arrangements can be structured for high-volume standing contracts.',
  },
  {
    q: 'Which districts in Telangana are currently eligible for direct delivery?',
    a: 'We currently run daily active routes across Greater Hyderabad, Rangareddy, Medchal-Malkajgiri, and Sangareddy. We are actively expanding regional hub distribution into Warangal, Karimnagar, Nizamabad, Khammam, Mahbubnagar, and Nalgonda. Buyers in all other Telangana districts can request custom bulk dispatches.',
  },
  {
    q: 'How is daily wholesale egg pricing determined?',
    a: 'Wholesale prices are linked to regional benchmark market indices, volume commitments, and delivery logistics tiers. When you submit a quotation request, our commercial desk provides verified, confirmed rates applicable to your delivery schedule.',
  },
  {
    q: 'What is your policy regarding broken or damaged eggs during transit?',
    a: 'We utilize heavy-duty molded pulp trays and double-walled master cartons engineered to minimize vibration damage. In the rare event of transit breakage, quantities documented during joint unloading inspection are credited or replaced in subsequent dispatches.',
  },
  {
    q: 'Can hotels, cloud kitchens, and bakeries establish standing daily orders?',
    a: 'Yes. We provide scheduled recurring standing agreements for hospitality and institutional clients, ensuring guaranteed morning delivery before 7:00 AM with standardized size grading.',
  },
  {
    q: 'How can an existing logistics operator or trader apply for a district partnership?',
    a: 'You can submit our Distribution Partner Application via the website. Our operations team reviews warehouse capacity, fleet availability, and regional retail connectivity before scheduling a formal discussion.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-24 bg-brand-navy-dark relative overflow-hidden border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy border border-slate-700/60 text-xs font-bold uppercase tracking-widest text-brand-blue">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>COMMERCIAL INQUIRIES</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              FREQUENTLY ASKED QUESTIONS.
            </h2>

            <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
              Key details on wholesale logistics, order minimums, delivery routes, and commercial terms.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={faq.q} direction="up" delay={0.08 * idx}>
                <div
                  className="rounded-2xl bg-brand-navy border border-slate-800/90 overflow-hidden transition-colors hover:border-slate-700"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-white">
                      {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg bg-brand-navy-light flex items-center justify-center text-brand-blue flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-brand-blue text-white' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-slate-800/60 pt-3 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
