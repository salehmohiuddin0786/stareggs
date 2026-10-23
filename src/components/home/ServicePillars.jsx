'use client';

import Link from 'next/link';
import { Store, Building2, UtensilsCrossed, Network, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '@/components/motion/ScrollReveal';
import TiltCard from '@/components/motion/TiltCard';

const services = [
  {
    icon: Building2,
    badge: 'High-Volume Wholesale',
    badgeColor: 'bg-brand-blue/15 text-brand-blue border-brand-blue/30',
    title: 'Distributors & Bulk Traders',
    description:
      'Engineered for large-volume aggregators, grain & egg commission agents, and regional stockists requiring steady trailer-load and pallet-level reliability.',
    features: [
      'Master cartons (210 eggs / 7 trays)',
      'Multi-crate & pallet dispatch schedules',
      'Direct farm-to-warehouse logistics',
      'Contracted volume rate structures',
    ],
    ctaText: 'Request Wholesale Tiers',
    ctaHref: '/wholesale?type=wholesaler',
    accentBorder: 'hover:border-brand-blue/60',
  },
  {
    icon: Store,
    badge: 'Everyday Retail Supply',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    title: 'Retailers, Kiranas & Supermarts',
    description:
      'Guaranteed morning replenishment for neighborhood grocery stores, retail chains, and supermarkets with zero shelf damage and clean presentation.',
    features: [
      'Standard 30-egg rigid pulp trays',
      'Pre-scheduled morning delivery routes',
      'Breakage replacement policy',
      'Flexible weekly or alternate-day billing',
    ],
    ctaText: 'Enquire for Retail Supply',
    ctaHref: '/wholesale?type=retailer',
    accentBorder: 'hover:border-emerald-500/50',
  },
  {
    icon: UtensilsCrossed,
    badge: 'HORECA & Institutional',
    badgeColor: 'bg-brand-red/15 text-brand-red border-brand-red/30',
    title: 'Hotels, Bakeries & Caterers',
    description:
      'Tailored for commercial kitchens, industrial bakeries, banquet caterers, and cloud kitchens requiring uniform egg size and unbroken daily replenishment.',
    features: [
      'Consistent weight-graded batches',
      'High yolk-to-white protein ratio',
      'Early-morning 6:00 AM dispatch slots',
      'Emergency supplementary deliveries',
    ],
    ctaText: 'Get Institutional Quotation',
    ctaHref: '/wholesale?type=institutional',
    accentBorder: 'hover:border-brand-red/60',
  },
  {
    icon: Network,
    badge: 'Telangana Expansion',
    badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    title: 'District Distribution Partners',
    description:
      'Strategic partnership opportunities for established logistics operators and traders to anchor exclusive Star Eggs regional distribution across Telangana districts.',
    features: [
      'Direct primary wholesale margins',
      'Scheduled district highway logistics',
      'Brand collateral & operational support',
      'Priority territorial allocations',
    ],
    ctaText: 'Apply for District Partnership',
    ctaHref: '/distribution',
    accentBorder: 'hover:border-purple-500/60',
  },
];

export default function ServicePillars() {
  return (
    <section className="py-24 bg-brand-navy-dark relative overflow-hidden border-t border-slate-800/80">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy border border-slate-700/60 text-xs font-bold uppercase tracking-widest text-brand-blue">
              <span>COMMERCIAL CAPABILITIES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              BUILT FOR SCALE.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">
                OPTIMIZED FOR EVERY BUYER.
              </span>
            </h2>
            <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
              Whether you operate a high-volume trading business, a single retail storefront, or a multi-location hospitality chain, Star Eggs delivers uncompromised reliability and calibrated fresh stock.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Commercial Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <ScrollReveal
                key={svc.title}
                direction="up"
                delay={0.15 + idx * 0.1}
                className="h-full"
              >
                <TiltCard
                  className={`h-full flex flex-col justify-between p-7 rounded-2xl bg-brand-navy/80 border border-slate-800/90 backdrop-blur-xl transition-all duration-300 hover:shadow-card-navy ${svc.accentBorder}`}
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-brand-navy-light border border-slate-700/60 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-brand-blue transition-all">
                        <Icon className="w-6 h-6 text-brand-blue" />
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${svc.badgeColor}`}
                      >
                        {svc.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-brand-blue transition-colors">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-brand-muted leading-relaxed">
                        {svc.description}
                      </p>
                    </div>

                    {/* Bullet features */}
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      {svc.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800/80">
                    <Link
                      href={svc.ctaHref}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-brand-blue transition group-hover:translate-x-1"
                    >
                      <span>{svc.ctaText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-brand-red" />
                    </Link>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
