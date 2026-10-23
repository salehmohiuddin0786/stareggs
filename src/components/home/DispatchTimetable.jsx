'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  Truck,
  ShieldCheck,
  Calendar,
  ArrowUpRight,
  MapPin,
  Package,
  Layers,
  Sparkles,
  ChevronRight,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/common/Button';

// Day timetable schedules
const SCHEDULE_DAYS = [
  {
    id: 'day-1',
    dayLabel: 'Mon – Wed',
    corridor: 'Northern Highway Corridor',
    summary: 'Adilabad HQ & Dispatch → Nirmal → Nizamabad → Armoor Belt',
    leadTime: 'Order cut-off: 8:00 PM previous evening',
    slots: [
      {
        time: '05:00 AM – 06:00 AM',
        status: 'DISPATCH_BAY',
        statusText: 'Primary Loading Dock',
        statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        title: 'Farm Reception & Optical Candling',
        description:
          'Primary layer transit trailers arrive at Adilabad distribution bay. Pre-transit candling verification and calibrated sorting to guarantee zero hairline cracks.',
        specs: ['100% Candling Verified', 'Direct Farm Reception', 'Adilabad Central Bay'],
      },
      {
        time: '06:15 AM – 07:30 AM',
        status: 'IN_TRANSIT',
        statusText: 'Fleet En Route',
        statusColor: 'bg-brand-blue/15 text-brand-blue border-brand-blue/30',
        title: 'Northern Fleet Early Dispatch',
        description:
          'Dedicated morning transport fleet departs Adilabad heading south via NH44, serving bulk distribution stockists and highway commercial stops.',
        specs: ['Temperature Cradling', 'Anti-Shock Pulp Trays', 'GPS Route Tracking'],
      },
      {
        time: '07:30 AM – 09:30 AM',
        status: 'DELIVERING',
        statusText: 'Retail Delivery',
        statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        title: 'Retail Storefront & Supermarket Unloading',
        description:
          'Direct shelf replenishment for neighborhood kiranas, retail marts, and supermarkets in Nirmal and Nizamabad prior to morning customer rush.',
        specs: ['Unbroken Shelf Guarantee', 'Joint Count Inspection', 'Receipt Voucher'],
      },
      {
        time: '10:00 AM – 01:00 PM',
        status: 'SCHEDULED',
        statusText: 'Commercial Kitchens',
        statusColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
        title: 'HORECA & Industrial Kitchen Drop-offs',
        description:
          'Standardized weight-graded batch drops for hotels, restaurants, industrial cafeterias, and bakeries requiring uniform albumen-to-yolk quality.',
        specs: ['Calibrated Size Lot', 'Standing Order Priority', 'Commercial Invoicing'],
      },
    ],
  },
  {
    id: 'day-2',
    dayLabel: 'Thu – Fri',
    corridor: 'Eastern Industrial & Mining Belt',
    summary: 'Adilabad HQ → Mancherial → Bellampalli → Asifabad Highway',
    leadTime: 'Order cut-off: 8:00 PM previous evening',
    slots: [
      {
        time: '05:00 AM – 06:15 AM',
        status: 'DISPATCH_BAY',
        statusText: 'Bulk Packaging Hub',
        statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        title: 'Corrugated Master Box Palletization',
        description:
          'High-density 210-egg master cartons locked onto pallet beds for heavy long-distance transit across eastern coal and industrial townships.',
        specs: ['210-Egg Master Cartons', 'Palletized Strapping', 'Zero Vibration Packing'],
      },
      {
        time: '06:30 AM – 08:30 AM',
        status: 'IN_TRANSIT',
        statusText: 'Industrial Logistics',
        statusColor: 'bg-brand-blue/15 text-brand-blue border-brand-blue/30',
        title: 'Industrial Sector Transit Dispatch',
        description:
          'Heavy commercial transport vehicles deployed to Mancherial and Bellampalli trading zones supplying regional aggregators and bulk stockists.',
        specs: ['Wholesale Tier-1 Batches', 'Trailer Load Capacity', 'Scheduled Arrival Windows'],
      },
      {
        time: '09:00 AM – 12:30 PM',
        status: 'DELIVERING',
        statusText: 'Township Distribution',
        statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        title: 'Supermarket Chains & Township Markets',
        description:
          'Scheduled replenishment drops for supermarkets, bakery chains, and institutional canteens across the eastern corridor.',
        specs: ['Breakage Accountability', 'Immediate Replenishment', 'Credit Adjustments'],
      },
    ],
  },
  {
    id: 'day-3',
    dayLabel: 'Saturday – Sunday',
    corridor: 'Weekend High-Turnover Rush',
    summary: 'Adilabad Urban District, Regional Marts & Weekend Buffer Dispatch',
    leadTime: 'Order cut-off: 7:00 PM Friday',
    slots: [
      {
        time: '05:00 AM – 06:00 AM',
        status: 'DISPATCH_BAY',
        statusText: 'Priority Fleet Prep',
        statusColor: 'bg-brand-red/15 text-brand-red border-brand-red/30',
        title: 'Weekend Volume Sizing & Cold Bay Load',
        description:
          'Maximum capacity staging at Adilabad central bay to fulfill 3x weekend demand from caterers, banquets, biryani houses, and retail counters.',
        specs: ['3x Peak Capacity Buffer', 'High Yolk-to-White Ratio', 'Express Fleet Loading'],
      },
      {
        time: '06:00 AM – 08:30 AM',
        status: 'IN_TRANSIT',
        statusText: 'Express Dispatch',
        statusColor: 'bg-brand-blue/15 text-brand-blue border-brand-blue/30',
        title: 'Urban Market & Catering Fleet Run',
        description:
          'Rapid early-morning delivery runs to wedding caterers, banquet kitchens, bakery lines, and retail grocery hubs before 8:30 AM.',
        specs: ['Guaranteed 8:30 AM Unloading', 'Emergency Backup Reserve', 'Dedicated Route Master'],
      },
      {
        time: '01:00 PM – 04:00 PM',
        status: 'SCHEDULED',
        statusText: 'Secondary Restock',
        statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        title: 'Midday Buffer Drop & Monday Allocation',
        description:
          'Secondary emergency replenishment for high-turnover retailers and allocation staging for Monday morning primary dispatches.',
        specs: ['Next-Day Allocation', 'Walk-In Wholesale Desk', 'Spot Market Rate Lock'],
      },
    ],
  },
];

// Product Lineup (Festival-Roster Style)
const PRODUCT_ROSTER = [
  {
    number: '01',
    name: 'Standard White Eggs (30 Tray)',
    caliber: '50g - 55g Calibrated Grade A',
    packaging: 'Rigid Pulp Tray (30 Eggs)',
    target: 'Retailers, Kiranas & Supermarts',
    timeSlot: 'Daily Morning Dispatch • 05:30 AM',
    highlight: 'High-Turnover Leader',
    badgeColor: 'border-brand-blue text-brand-blue bg-brand-blue/10',
    image: '/images/products/egg-tray.svg',
  },
  {
    number: '02',
    name: 'Master Corrugated Box (210 Eggs)',
    caliber: '7 Molded Trays • Double Walled',
    packaging: 'Corrugated Master Box (210 Eggs)',
    target: 'Wholesale Distributors & Regional Stockists',
    timeSlot: 'Corridor Transit • Mon / Thu Slots',
    highlight: 'Volume Commercial Standard',
    badgeColor: 'border-brand-red text-brand-red bg-brand-red/10',
    image: '/images/products/egg-carton.svg',
  },
  {
    number: '03',
    name: 'Select Table White Eggs (Crate)',
    caliber: 'Candling-Sorted Uniform Calibration',
    packaging: 'Returnable Commercial Crate (300-360 Eggs)',
    target: 'Bakery Chains, Sweet Makers & Hotels',
    timeSlot: 'Dedicated Kitchen Slot • 06:00 AM',
    highlight: 'Uniform Size Batching',
    badgeColor: 'border-amber-400 text-amber-400 bg-amber-400/10',
    image: '/images/products/egg-cluster.svg',
  },
  {
    number: '04',
    name: 'Farm Fresh Brown Eggs (30 Tray)',
    caliber: 'Rich Golden Yolk • Robust Shell',
    packaging: 'Pulp Tray (30 Brown Eggs)',
    target: 'Gourmet Marts, Fitness & Premium Retail',
    timeSlot: 'Scheduled Farm Batch • Pre-Order',
    highlight: 'Specialty Selection',
    badgeColor: 'border-emerald-400 text-emerald-400 bg-emerald-400/10',
    image: '/images/products/brown-eggs.svg',
  },
  {
    number: '05',
    name: 'Institutional Standing Contract Lot',
    caliber: 'Guaranteed Daily Quota Allocation',
    packaging: 'Multi-Carton Scheduled Pallet Bed',
    target: 'Hotels, Cloud Kitchens & Institutional Cafeterias',
    timeSlot: 'Standing Morning Slot • 05:00 AM Daily',
    highlight: 'Zero-Interruption Guarantee',
    badgeColor: 'border-purple-400 text-purple-400 bg-purple-400/10',
    image: '/images/products/institutional-supply.svg',
  },
];

export default function DispatchTimetable() {
  const [activeDay, setActiveDay] = useState('day-1');
  const sectionRef = useRef(null);
  const lineupRef = useRef(null);

  // GSAP Scroll Animations (inspired by 21st.dev / 8b festival lineup)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 1. Lineup Rows Scrub Animation (Scale and slide on scroll)
      const rows = lineupRef.current?.querySelectorAll('.roster-row');
      if (rows && rows.length > 0) {
        rows.forEach((row, idx) => {
          const badge = row.querySelector('.roster-badge');
          const title = row.querySelector('.roster-title');
          const meta = row.querySelector('.roster-meta');

          gsap
            .timeline({
              scrollTrigger: {
                trigger: row,
                start: 'top 88%',
                end: 'bottom 45%',
                toggleActions: 'play reverse play reverse',
              },
            })
            .fromTo(
              row,
              { opacity: 0.35, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
            )
            .fromTo(
              badge,
              { scale: 0.8, rotate: -6 },
              { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.5)' },
              0
            )
            .fromTo(
              title,
              { letterSpacing: '0.05em' },
              { letterSpacing: '-0.02em', duration: 0.6, ease: 'power2.out' },
              0
            );
        });
      }

      // 2. Timeline Slot Stagger Reveal
      const timelineCards = sectionRef.current?.querySelectorAll('.timetable-card');
      if (timelineCards && timelineCards.length > 0) {
        gsap.fromTo(
          timelineCards,
          { opacity: 0, y: 25, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current?.querySelector('.timetable-container'),
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, [activeDay]);

  const currentSchedule = SCHEDULE_DAYS.find((d) => d.id === activeDay) || SCHEDULE_DAYS[0];

  return (
    <section
      ref={sectionRef}
      id="dispatch-timetable"
      className="py-24 bg-brand-navy-dark relative overflow-hidden border-t border-slate-800"
    >
      {/* Background Lighting Accents */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Floor Line Guide */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(23,75,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,75,255,0.25) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        {/* ========================================================
            PART 1: DAILY FLEET DISPATCH TIMETABLE (DAY-BY-DAY MATRIX)
            ======================================================== */}
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy border border-brand-blue/40 text-xs font-bold uppercase tracking-widest text-brand-blue">
                <Clock className="w-3.5 h-3.5 text-brand-red" />
                <span>COMMERCIAL DISPATCH LINEUP & SCHEDULE</span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
                DAILY FLEET TIMETABLE.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-400 to-white">
                  ADILABAD TO TELANGANA.
                </span>
              </h2>

              <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
                Precision logistics timed for commercial efficiency. From 5:00 AM primary layer candling to pre-rush retail replenishment, our fleet operates like clockwork.
              </p>
            </div>

            {/* Quick Action */}
            <div className="flex-shrink-0">
              <Button
                href="/wholesale"
                variant="primary"
                size="md"
                icon="arrow-up-right"
                className="shadow-glow-blue"
              >
                Book a Dispatch Route Slot
              </Button>
            </div>
          </div>

          {/* Interactive Day Selector Tabs */}
          <div className="flex flex-wrap items-center gap-3 p-2 rounded-2xl bg-brand-navy border border-slate-800 mb-8 max-w-2xl">
            {SCHEDULE_DAYS.map((day) => {
              const isActive = activeDay === day.id;
              return (
                <button
                  key={day.id}
                  onClick={() => setActiveDay(day.id)}
                  className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-glow-blue border border-blue-400/40'
                      : 'text-brand-muted hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{day.dayLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Current Corridor Banner */}
          <div className="p-4 rounded-xl bg-brand-navy border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs mb-8">
            <div className="flex items-center gap-2.5 text-white">
              <MapPin className="w-4 h-4 text-brand-red flex-shrink-0" />
              <div>
                <span className="font-bold text-brand-blue uppercase tracking-wider">
                  Active Corridor:
                </span>{' '}
                <span className="font-semibold">{currentSchedule.corridor}</span>
                <span className="hidden sm:inline text-slate-500 mx-2">•</span>
                <span className="text-slate-400">{currentSchedule.summary}</span>
              </div>
            </div>
            <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 w-fit">
              {currentSchedule.leadTime}
            </div>
          </div>

          {/* Timetable Slots Grid */}
          <div className="timetable-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentSchedule.slots.map((slot, idx) => (
              <div
                key={slot.time + idx}
                className="timetable-card rounded-2xl bg-brand-navy/90 border border-slate-800 hover:border-brand-blue/50 p-6 flex flex-col justify-between space-y-5 transition-all duration-300 hover:shadow-card-navy hover:-translate-y-1 relative group"
              >
                {/* Top Timing Badge */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white">
                    <Clock className="w-3.5 h-3.5 text-brand-blue" />
                    <span>{slot.time}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${slot.statusColor}`}
                  >
                    {slot.statusText}
                  </span>
                </div>

                {/* Slot Details */}
                <div className="space-y-2.5 flex-1">
                  <h3 className="font-display text-base font-bold text-white group-hover:text-brand-blue transition-colors">
                    {slot.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {slot.description}
                  </p>
                </div>

                {/* Spec Pills */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  {slot.specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-1.5 text-[11px] text-slate-300"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            PART 2: COMMERCIAL PRODUCT LINEUP (FESTIVAL ROSTER STYLE)
            ======================================================== */}
        <div ref={lineupRef} className="pt-8 border-t border-slate-800">
          <div className="max-w-3xl mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy border border-brand-red/40 text-xs font-bold uppercase tracking-widest text-brand-red">
              <Package className="w-3.5 h-3.5" />
              <span>THE OFFICIAL SUPPLY ROSTER</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              ON THE SUPPLY LINEUP.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-orange-400 to-white">
                CALIBRATED GRADES.
              </span>
            </h2>

            <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
              Every production grade is inspected through optical candling, size-calibrated, and packed in engineered pulp cradling to eliminate transit shock.
            </p>
          </div>

          {/* Roster Rows List */}
          <div className="space-y-4">
            {PRODUCT_ROSTER.map((item) => (
              <div
                key={item.number}
                className="roster-row p-6 sm:p-8 rounded-2xl bg-brand-navy border border-slate-800 hover:border-brand-blue transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group hover:bg-brand-navy-light/60 hover:shadow-card-navy cursor-pointer"
              >
                {/* Left: Number + Graphic Badge */}
                <div className="flex items-center gap-5 sm:gap-6 flex-shrink-0">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-slate-600 group-hover:text-brand-red transition-colors">
                    {item.number}
                  </span>

                  <div className="roster-badge w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-navy-dark border border-slate-700/80 flex items-center justify-center p-2.5 relative group-hover:scale-105 group-hover:border-brand-blue transition-all shadow-md">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                      >
                        {item.highlight}
                      </span>
                      <span className="text-xs text-slate-400 hidden sm:inline">
                        • {item.caliber}
                      </span>
                    </div>

                    <h3 className="roster-title font-display text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase tracking-tight mt-1 group-hover:text-brand-blue transition-colors">
                      {item.name}
                    </h3>

                    <div className="text-xs text-slate-400 mt-0.5 sm:hidden">
                      {item.caliber}
                    </div>
                  </div>
                </div>

                {/* Right: Meta Details + CTA */}
                <div className="roster-meta flex flex-wrap items-center gap-6 sm:gap-8 lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800/80">
                  <div className="space-y-0.5">
                    <div className="text-[10px] uppercase font-bold text-slate-500">
                      Standard Packaging
                    </div>
                    <div className="text-xs font-semibold text-slate-200">
                      {item.packaging}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="text-[10px] uppercase font-bold text-slate-500">
                      Recommended For
                    </div>
                    <div className="text-xs font-semibold text-slate-200">
                      {item.target}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="text-[10px] uppercase font-bold text-brand-red">
                      Dispatch Schedule
                    </div>
                    <div className="text-xs font-mono font-bold text-white">
                      {item.timeSlot}
                    </div>
                  </div>

                  <Button
                    href={`/wholesale?product=${encodeURIComponent(item.name)}`}
                    variant="primary"
                    size="sm"
                    icon="arrow-up-right"
                    className="whitespace-nowrap"
                  >
                    Get Quotation
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Lineup Banner */}
          <div className="mt-8 p-6 rounded-2xl bg-brand-navy border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-brand-red flex-shrink-0" />
              <span>
                Need special culinary batch sizing, custom master box labeling, or standing hotel route reservations?
              </span>
            </div>
            <Link
              href="/contact"
              className="font-bold text-brand-blue hover:text-white transition inline-flex items-center gap-1 flex-shrink-0"
            >
              <span>Talk to Our Dispatch Coordinator</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
