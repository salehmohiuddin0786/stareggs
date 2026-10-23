'use client';

import Link from 'next/link';
import { ClipboardList, Calculator, Truck, ArrowRight, ArrowUpRight } from 'lucide-react';
import Button from '@/components/common/Button';
import ScrollReveal from '@/components/motion/ScrollReveal';
import TiltCard from '@/components/motion/TiltCard';

const steps = [
  {
    step: '01',
    icon: ClipboardList,
    title: 'Select Category & Volume',
    description:
      'Choose your required egg specifications (30-egg pulp trays, 210-egg cartons, or crate loads) and specify your daily or weekly demand volume.',
  },
  {
    step: '02',
    icon: Calculator,
    title: 'Instant Commercial Quotation',
    description:
      'Our commercial team confirms daily wholesale market rates, delivery schedules, and payment terms via phone or WhatsApp dispatch desk.',
  },
  {
    step: '03',
    icon: Truck,
    title: 'Scheduled Morning Fleet Dispatch',
    description:
      'Your consignment is carefully loaded and dispatched via dedicated transit routes to your shop counter, warehouse bay, or culinary kitchen.',
  },
];

export default function OrderingProcess() {
  return (
    <section className="py-24 bg-brand-navy-dark relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy border border-slate-700/60 text-xs font-bold uppercase tracking-widest text-brand-red">
              <span>STREAMLINED WORKFLOW</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              HOW ORDERING WORKS.
            </h2>

            <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
              From your initial quotation request to morning warehouse unloading — structured for seamless business procurement.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-brand-blue via-brand-red to-brand-blue -translate-y-12 z-0 opacity-30" />

          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <ScrollReveal
                key={s.step}
                direction="up"
                delay={0.15 + idx * 0.15}
                className="h-full"
              >
                <TiltCard
                  className="relative z-10 h-full p-8 rounded-2xl bg-brand-navy border border-slate-800/80 hover:border-brand-blue/50 transition-all duration-300 hover:shadow-card-navy space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-brand-navy-light border border-slate-700/60 flex items-center justify-center text-brand-blue">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-display text-3xl font-black text-slate-700">
                      {s.step}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-white">
                      {s.title}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Button
            href="/wholesale"
            variant="primary"
            size="lg"
            icon={ArrowUpRight}
          >
            Start Your Wholesale Quotation
          </Button>
        </div>
      </div>
    </section>
  );
}
