'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Box, Layers, ShieldCheck, Check, Sparkles } from 'lucide-react';
import Button from '@/components/common/Button';
import ScrollReveal from '@/components/motion/ScrollReveal';
import TiltCard from '@/components/motion/TiltCard';

const products = [
  {
    id: 'prod-1',
    name: 'Standard White Eggs (30-Egg Tray)',
    category: 'Commercial Pulp Trays',
    packaging: 'Rigid Molded Pulp Tray (30 Eggs)',
    moq: '10 Trays (300 Eggs)',
    status: 'IN_STOCK',
    statusLabel: 'Daily In Stock',
    description:
      'Rigid paper pulp tray containing 30 graded, clean white eggs. Built for stackability, minimal shell shock during transit, and effortless retail display.',
    image: '/images/products/egg-tray.svg',
    highlight: 'Retail Favorite',
  },
  {
    id: 'prod-2',
    name: 'Commercial Wholesale Carton (210 Eggs)',
    category: 'Master Corrugated Boxes',
    packaging: 'Heavy-Duty Master Box (7 Trays / 210 Eggs)',
    moq: '5 Cartons (1,050 Eggs)',
    status: 'IN_STOCK',
    statusLabel: 'Wholesale Standard',
    description:
      'Heavy-duty corrugated master box housing 7 trays (210 eggs). Engineered for long-haul stability, distributor warehouse stocking, and bulk transit.',
    image: '/images/products/egg-carton.svg',
    highlight: 'Volume Best-Seller',
  },
  {
    id: 'prod-3',
    name: 'Select Table White Eggs (Commercial Crate)',
    category: 'Table White Eggs',
    packaging: 'Commercial Returnable Crate (300-360 Eggs)',
    moq: '5 Crates',
    status: 'IN_STOCK',
    statusLabel: 'Daily In Stock',
    description:
      'Uniform size-graded white eggs sorted through rigorous candling standards. Ideal for supermarkets, bakeries, and high-turnover grocery retail counters.',
    image: '/images/products/egg-cluster.svg',
    highlight: 'Calibrated Uniformity',
  },
  {
    id: 'prod-4',
    name: 'Farm Fresh Brown Eggs (30-Egg Tray)',
    category: 'Brown & Specialty',
    packaging: 'Pulp Tray (30 Eggs)',
    moq: '5 Trays (150 Eggs)',
    status: 'ORDER_ONLY',
    statusLabel: 'Batch Pre-Order',
    description:
      'Thick-shelled natural brown eggs with rich golden yolks. Available subject to farm batches; preferred by modern retail marts and boutique culinary businesses.',
    image: '/images/products/brown-eggs.svg',
    highlight: 'Specialty Selection',
  },
  {
    id: 'prod-5',
    name: 'Daily Standing Supply (Hotels & Caterers)',
    category: 'Institutional Logistics',
    packaging: 'Dedicated Morning Dispatch Lot',
    moq: '20 Trays / Day',
    status: 'IN_STOCK',
    statusLabel: 'Contract Priority',
    description:
      'Dedicated morning replenishment contract for commercial kitchens, banquet halls, and industrial cafeterias requiring guaranteed daily volume consistency.',
    image: '/images/products/institutional-supply.svg',
    highlight: 'Guaranteed Slot',
  },
  {
    id: 'prod-6',
    name: 'Bakery High-Volume Batch Lot',
    category: 'Industrial Bakery',
    packaging: 'Batch Pallet (50+ Master Cartons)',
    moq: '50 Cartons (10,500 Eggs)',
    status: 'IN_STOCK',
    statusLabel: 'High Volume',
    description:
      'Optimized bulk egg procurement for industrial bakeries, confectioneries, and sweet manufacturers requiring continuous high-volume shell egg supply.',
    image: '/images/products/bakery-grade.svg',
    highlight: 'Wholesale Tier-1',
  },
];

export default function ProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    { label: 'All Products', value: 'ALL' },
    { label: 'Pulp Trays & Master Boxes', value: 'Commercial Pulp Trays' },
    { label: 'Table White Eggs', value: 'Table White Eggs' },
    { label: 'Brown Eggs', value: 'Brown & Specialty' },
    { label: 'Institutional Supply', value: 'Institutional Logistics' },
  ];

  const filteredProducts =
    selectedCategory === 'ALL'
      ? products
      : products.filter(
          (p) =>
            p.category === selectedCategory ||
            (selectedCategory === 'Commercial Pulp Trays' &&
              (p.category === 'Commercial Pulp Trays' || p.category === 'Master Corrugated Boxes'))
        );

  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden border-t border-slate-800">
      {/* Background Lighting */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy-light border border-slate-700/60 text-xs font-bold uppercase tracking-widest text-brand-red">
              <span>COMMERCIAL CATALOGUE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              PRECISION GRADED.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">
                COMMERCIALLY PACKAGED.
              </span>
            </h2>
            <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
              Every unit is handled with specialized shock-absorbing trays and clean packing standards to prevent breakage in transit. Select a product to request verified wholesale pricing.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-blue hover:text-white transition group flex-shrink-0"
          >
            <span>View Full Catalogue</span>
            <ArrowUpRight className="w-4 h-4 text-brand-red group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 pb-8 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat.value
                  ? 'bg-brand-blue text-white shadow-glow-blue border border-blue-400/30'
                  : 'bg-brand-navy-light text-brand-muted hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((prod, idx) => (
            <ScrollReveal
              key={prod.id}
              direction="up"
              delay={0.1 + (idx % 3) * 0.12}
              className="h-full"
            >
              <TiltCard
                className="h-full flex flex-col justify-between rounded-2xl bg-brand-navy-dark/90 border border-slate-800 hover:border-brand-blue/50 overflow-hidden transition-all duration-300 hover:shadow-card-navy"
              >
                {/* Product Visual Container */}
                <div className="relative h-60 w-full bg-brand-navy flex items-center justify-center p-4 overflow-hidden border-b border-slate-800/80">
                  {/* Visual Highlight Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy-dark/80 border border-slate-700/80 text-[10px] font-bold uppercase tracking-wider text-slate-300 backdrop-blur-md">
                    <Sparkles className="w-3 h-3 text-brand-blue" />
                    <span>{prod.highlight}</span>
                  </div>

                  {/* Stock Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        prod.status === 'IN_STOCK'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {prod.statusLabel}
                    </span>
                  </div>

                  {/* Product SVG Graphic */}
                  <div className="w-full h-full relative transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">
                      {prod.category}
                    </div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-brand-blue transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed line-clamp-2">
                      {prod.description}
                    </p>
                  </div>

                  {/* Technical Packaging Specifications */}
                  <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Box className="w-3.5 h-3.5 text-slate-400" />
                        Packaging
                      </span>
                      <span className="font-semibold text-right truncate max-w-[170px]">
                        {prod.packaging}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        Minimum Order (MOQ)
                      </span>
                      <span className="font-semibold text-brand-red text-right">
                        {prod.moq}
                      </span>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-1">
                    <Button
                      href={`/wholesale?product=${encodeURIComponent(prod.name)}`}
                      variant="outline"
                      size="sm"
                      className="w-full justify-center group-hover:bg-brand-blue group-hover:text-white group-hover:border-transparent transition-all"
                      icon={ArrowUpRight}
                    >
                      Request Wholesale Quotation
                    </Button>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
