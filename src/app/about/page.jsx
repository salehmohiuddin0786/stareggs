import Link from 'next/link';
import { ShieldCheck, Truck, Target, Award, HeartHandshake, Eye, ArrowUpRight } from 'lucide-react';
import Button from '@/components/common/Button';

export const metadata = {
  title: 'About Star Eggs — Reliable Egg Wholesale & Distribution in Telangana',
  description:
    'Learn about Star Eggs: our mission, quality-handling standards, commitment to zero-shell shock transit, and strategic vision for distribution across Telangana.',
};

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24 bg-brand-navy min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy-light border border-slate-700/60 text-xs font-bold uppercase tracking-widest text-brand-blue">
            <span>BRAND MISSION & OPERATIONS</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-tight">
            COMMITTED TO QUALITY.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">
              ENGINEERED FOR SUPPLY.
            </span>
          </h1>

          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            STAR EGGS is built on a clear foundation: eliminating the instability, random quality variations, and high transit breakage that have historically plagued commercial egg procurement.
          </p>
        </div>

        {/* Mission & Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-2xl bg-brand-navy-dark border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-navy border border-slate-700 flex items-center justify-center text-brand-blue">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white uppercase">
              Our Supply Mission
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              To be the most dependable and transparent primary egg supply partner in Telangana — ensuring every partner receives uniform size-graded, fresh stock when their business needs it.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-brand-navy-dark border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-navy border border-slate-700 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white uppercase">
              Zero Shell-Shock Quality
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              From optical candling inspection to heavy-density pulp tray packaging and secure master cartons, we treat egg transit as a calibrated precision logistics process.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-brand-navy-dark border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-navy border border-slate-700 flex items-center justify-center text-brand-red">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white uppercase">
              Partnership Integrity
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              We operate with transparent market-indexed pricing, fair transit breakage accountability, and dedicated customer account support across our retail and wholesale network.
            </p>
          </div>
        </div>

        {/* Operational Philosophy */}
        <div className="rounded-3xl bg-brand-navy-dark border border-slate-800 p-8 sm:p-14 mb-20 space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
              THE STAR EGGS SUPPLY ARCHITECTURE
            </h2>
            <p className="text-sm text-brand-muted">
              How we maintain quality standards across our transit routes:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-brand-navy border border-slate-800 space-y-2">
              <span className="font-display text-brand-blue font-bold text-lg">01. Direct Sourcing</span>
              <p className="text-xs text-brand-muted">
                Direct procurement from managed layer facilities ensures minimal time between laying and delivery dispatch.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-brand-navy border border-slate-800 space-y-2">
              <span className="font-display text-emerald-400 font-bold text-lg">02. Sorting & Grading</span>
              <p className="text-xs text-brand-muted">
                Uniform calibration standards eliminate cracked shells and uneven weight distribution before packaging.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-brand-navy border border-slate-800 space-y-2">
              <span className="font-display text-brand-red font-bold text-lg">03. Engineered Cradling</span>
              <p className="text-xs text-brand-muted">
                Rigid molded pulp trays protect shell geometry, allowing safe vertical stacking during transportation.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-brand-navy border border-slate-800 space-y-2">
              <span className="font-display text-purple-400 font-bold text-lg">04. Morning Fleets</span>
              <p className="text-xs text-brand-muted">
                Pre-scheduled morning deliveries ensure businesses are stocked ahead of retail rush hours and kitchen shifts.
              </p>
            </div>
          </div>
        </div>

        {/* Corporate Note & Placeholders */}
        <div className="rounded-2xl bg-brand-navy-light/60 border border-slate-800 p-6 text-xs text-slate-400 space-y-2 max-w-3xl">
          <div className="font-bold text-white uppercase tracking-wider">
            Commercial Transparency Note:
          </div>
          <p>
            Corporate registration documents, specific farm certifications, and regional warehouse facility addresses are maintained through the Star Eggs operations management portal and shared directly with authorized commercial partners during agreement execution.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Button
            href="/wholesale"
            variant="primary"
            size="lg"
            icon="arrow-up-right"
          >
            Partner With Star Eggs Today
          </Button>
        </div>
      </div>
    </div>
  );
}
