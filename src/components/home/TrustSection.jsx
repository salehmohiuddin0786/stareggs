'use client';

import { CheckCircle2, Shield, Eye, PackageCheck, AlertCircle, Award, Truck, CheckCheck, Users } from 'lucide-react';
import ScrollReveal from '@/components/motion/ScrollReveal';
import TiltCard from '@/components/motion/TiltCard';
import CountUp from '@/components/motion/CountUp';

const standards = [
  {
    icon: Eye,
    title: 'Candling & Purity Inspection',
    desc: 'Each production lot undergoes focused candling inspection to verify shell consistency and detect any hairline structural cracks prior to transit pack-out.',
  },
  {
    icon: PackageCheck,
    title: 'Shock-Absorbing Pulp Packaging',
    desc: 'High-density recycled paper pulp trays cushion every individual egg with deep cradling, reducing transit vibration and lateral load friction.',
  },
  {
    icon: Shield,
    title: 'Hygienic Handling Protocol',
    desc: 'Strict warehouse cleanliness and vehicle sanitation standards maintain clean outer shells suitable for commercial kitchens and premium supermarket shelves.',
  },
  {
    icon: CheckCircle2,
    title: 'Breakage Accountability',
    desc: 'Transparent verification during delivery unloading with fair commercial adjustment policies on documented transit breakage.',
  },
];

export default function TrustSection() {
  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <ScrollReveal direction="left" delay={0.1} className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy-light border border-slate-700/60 text-xs font-bold uppercase tracking-widest text-brand-blue">
              <Shield className="w-3.5 h-3.5" />
              <span>QUALITY & STANDARDS</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              PRECISION HANDLING.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">
                UNCOMPROMISED FRESHNESS.
              </span>
            </h2>

            <p className="text-brand-muted text-base leading-relaxed">
              In food supply, claims mean nothing without operational discipline. Star Eggs enforces strict procurement criteria, candling checks, and protective packaging to safeguard your inventory investment.
            </p>

            <div className="p-4 rounded-xl bg-brand-navy-dark border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
              <span>
                <strong>Commercial Notice:</strong> Stock availability, weight grading specifications, and transit windows are systematically configured and verified per consignment. No arbitrary pricing or unconfirmed volume claims.
              </span>
            </div>
          </ScrollReveal>

          {/* Right Cards Column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {standards.map((s, idx) => {
              const Icon = s.icon;
              return (
                <ScrollReveal
                  key={s.title}
                  direction="up"
                  delay={0.15 + idx * 0.1}
                  className="h-full"
                >
                  <TiltCard
                    className="h-full p-6 rounded-2xl bg-brand-navy-dark/90 border border-slate-800/90 space-y-3 hover:border-brand-blue/50 transition-all hover:shadow-card-navy"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-navy border border-slate-700/60 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-base font-bold text-white">
                      {s.title}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {s.desc}
                    </p>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Live CountUp Commercial Metrics Strip */}
        <ScrollReveal direction="up" delay={0.25} className="mt-16">
          <div className="p-8 rounded-3xl bg-brand-navy-dark border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-black font-display text-white">
                <CountUp end={100000} duration={2.2} suffix="+" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-blue">Daily Capacity</div>
              <div className="text-[11px] text-slate-500">Eggs Handled & Dispatched</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-black font-display text-emerald-400">
                <CountUp end={99.8} decimals={1} duration={2.0} suffix="%" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Intact Arrival</div>
              <div className="text-[11px] text-slate-500">Zero Transit Shock Record</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-black font-display text-white">
                <CountUp end={500} duration={1.8} suffix="+" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-red">Active Clients</div>
              <div className="text-[11px] text-slate-500">Retailers, HORECA & Bakeries</div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-black font-display text-white">
                <CountUp end={33} duration={1.5} suffix=" Districts" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">Coverage Network</div>
              <div className="text-[11px] text-slate-500">Serving Across Telangana</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
