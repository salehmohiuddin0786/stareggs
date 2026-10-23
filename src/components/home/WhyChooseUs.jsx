'use client';

import { ShieldCheck, Truck, Clock, Award, CheckCircle, RefreshCcw, Layers } from 'lucide-react';
import ScrollReveal from '@/components/motion/ScrollReveal';
import TiltCard from '@/components/motion/TiltCard';

const reasons = [
  {
    icon: Clock,
    title: 'Daily Fresh Procurement',
    description:
      'Direct primary farm dispatch guarantees that eggs arrive at your counter within optimal freshness windows, preserving shell integrity and albumen thickness.',
  },
  {
    icon: ShieldCheck,
    title: 'Candling & Size Calibration',
    description:
      'Rigorous optical candling inspection removes hairline fractures, internal defects, and inconsistent sizes before trays are locked into transit.',
  },
  {
    icon: Layers,
    title: 'Engineered Anti-Shock Trays',
    description:
      'Heavy-density molded pulp trays and corrugated master boxes prevent friction and transit vibration, bringing breakage to near zero.',
  },
  {
    icon: Truck,
    title: 'Scheduled Morning Dispatches',
    description:
      'Early morning fleet dispatches ensure your shelves and kitchens are fully stocked before morning peak business hours begin.',
  },
  {
    icon: RefreshCcw,
    title: 'Volume-Linked Commercial Tiers',
    description:
      'Transparent wholesale rate tiers designed for consistent repeat buyers, with no volatile middlemen markups or unannounced surges.',
  },
  {
    icon: Award,
    title: 'Dedicated Account Support',
    description:
      'Direct access to our Adilabad dispatch desk and WhatsApp coordination desk for standing orders, emergency loads, and route adjustments.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy-light border border-slate-700/60 text-xs font-bold uppercase tracking-widest text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>COMMERCIAL ADVANTAGES</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              WHY LEADING BUSINESSES{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">
                RELY ON STAR EGGS.
              </span>
            </h2>

            <p className="text-brand-muted text-base leading-relaxed">
              In commercial egg distribution, reliability and product preservation dictate your bottom line. We have built an unyielding supply architecture designed to protect your margins.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={item.title}
                direction="up"
                delay={0.1 + (idx % 3) * 0.1}
                className="h-full"
              >
                <TiltCard
                  className="h-full p-8 rounded-2xl bg-brand-navy-dark/80 border border-slate-800/90 hover:border-brand-blue/50 transition-all duration-300 hover:shadow-card-navy space-y-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-navy border border-slate-700/60 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-white group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-brand-muted leading-relaxed">
                    {item.description}
                  </p>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
