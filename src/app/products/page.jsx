import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Box, Layers, ShieldCheck, Check, Sparkles, AlertCircle } from 'lucide-react';
import Button from '@/components/common/Button';
import ScrollReveal from '@/components/motion/ScrollReveal';
import TiltCard from '@/components/motion/TiltCard';

export const metadata = {
  title: 'Commercial Product Catalogue & Supply Packaging',
  description:
    'Explore Star Eggs commercial egg catalogue: Standard 30-egg pulp trays, 210-egg wholesale master cartons, select table white eggs, farm fresh brown eggs, and standing institutional supply.',
};

const fullProducts = [
  {
    id: 'prod-1',
    name: 'Standard White Eggs (30-Egg Tray)',
    category: 'Commercial Pulp Trays',
    packaging: 'Rigid Molded Pulp Tray (30 Eggs)',
    moq: '10 Trays (300 Eggs)',
    status: 'IN_STOCK',
    statusLabel: 'Daily In Stock',
    specs: {
      averageWeight: '50g - 55g per egg (Standard Grade A)',
      packingMaterial: 'Molded natural recycled fiber pulp tray',
      stackability: 'Up to 6 trays high without shell pressure',
      shelfStorage: 'Store in cool, dry ventilated area away from moisture',
    },
    description:
      'Rigid paper pulp tray containing 30 graded, clean white eggs. Built for stackability, minimal shell shock during transit, and effortless retail display.',
    image: '/images/products/egg-tray.svg',
    idealFor: 'Kirana Stores, Grocery Retailers, Supermarkets, Cloud Kitchens',
  },
  {
    id: 'prod-2',
    name: 'Commercial Wholesale Master Carton (210 Eggs)',
    category: 'Master Corrugated Boxes',
    packaging: 'Heavy-Duty Master Box (7 Trays / 210 Eggs)',
    moq: '5 Cartons (1,050 Eggs)',
    status: 'IN_STOCK',
    statusLabel: 'Wholesale Standard',
    specs: {
      capacity: '7 Packed Trays (210 Eggs total)',
      boxType: 'Double-walled heavy corrugated fluted box',
      transitGrade: 'Engineered for regional highway transit and warehouse stacking',
      burstingStrength: 'Commercial transit rating',
    },
    description:
      'Heavy-duty corrugated master box housing 7 trays (210 eggs). Engineered for long-haul stability, distributor warehouse stocking, and bulk transit.',
    image: '/images/products/egg-carton.svg',
    idealFor: 'Wholesalers, Bulk Traders, Food Processors, Caterers',
  },
  {
    id: 'prod-3',
    name: 'Select Table White Eggs (Commercial Crate)',
    category: 'Table White Eggs',
    packaging: 'Commercial Returnable Crate (300-360 Eggs)',
    moq: '5 Crates',
    status: 'IN_STOCK',
    statusLabel: 'Daily In Stock',
    specs: {
      crateMaterial: 'High-density food-grade polyethylene (HDPE)',
      hygiene: 'Sanitized and washed returnable crates',
      yolkRatio: 'High-protein yolk and thick albumen standards',
      calibration: 'Pre-sorted for visual and volumetric uniformity',
    },
    description:
      'Uniform size-graded white eggs sorted through rigorous candling standards. Ideal for supermarkets, bakeries, and high-turnover grocery retail counters.',
    image: '/images/products/egg-cluster.svg',
    idealFor: 'High-turnover bakeries, hotels, banquet halls, restaurants',
  },
  {
    id: 'prod-4',
    name: 'Farm Fresh Brown Eggs (30-Egg Tray)',
    category: 'Brown & Specialty',
    packaging: 'Pulp Tray (30 Eggs)',
    moq: '5 Trays (150 Eggs)',
    status: 'ORDER_ONLY',
    statusLabel: 'Batch Pre-Order',
    specs: {
      shellType: 'Natural dense brown pigment shell',
      dietCare: 'Naturally fed layer birds with enriched diets',
      leadTime: 'Requires 24-hour advance dispatch scheduling',
      nicheMarket: 'Premium consumer retail and specialty culinary markets',
    },
    description:
      'Thick-shelled natural brown eggs with rich golden yolks. Available subject to farm batches; preferred by modern retail marts and boutique culinary businesses.',
    image: '/images/products/brown-eggs.svg',
    idealFor: 'Gourmet supermarkets, organic food counters, boutique cafes',
  },
  {
    id: 'prod-5',
    name: 'Daily Standing Supply (Hotels & Caterers)',
    category: 'Institutional Logistics',
    packaging: 'Dedicated Morning Dispatch Lot',
    moq: '20 Trays / Day',
    status: 'IN_STOCK',
    statusLabel: 'Contract Priority',
    specs: {
      deliveryWindow: 'Early morning slot (5:30 AM - 7:30 AM)',
      invoiceCycle: 'Structured weekly or fortnightly billing available',
      accountSupport: 'Dedicated route manager and immediate buffer reserves',
      qualityCommitment: 'Pre-inspected breakage buffer included',
    },
    description:
      'Dedicated morning replenishment contract for commercial kitchens, banquet halls, and industrial cafeterias requiring guaranteed daily volume consistency.',
    image: '/images/products/institutional-supply.svg',
    idealFor: 'Hotels, Catering Firms, Industrial Canteens, Hospital Kitchens',
  },
  {
    id: 'prod-6',
    name: 'Industrial Bakery High-Volume Batch Lot',
    category: 'Industrial Bakery',
    packaging: 'Batch Pallet (50+ Master Cartons)',
    moq: '50 Cartons (10,500 Eggs)',
    status: 'IN_STOCK',
    statusLabel: 'High Volume',
    specs: {
      eggConsistency: 'Optimized whipping and emulsion properties for baking',
      logistics: 'Direct heavy commercial transport to bakery dock',
      batchCode: 'Batch-tracked for food safety trace compliance',
      rateStructure: 'Volume-contracted wholesale index pricing',
    },
    description:
      'Optimized bulk egg procurement for industrial bakeries, confectioneries, and sweet manufacturers requiring continuous high-volume shell egg supply.',
    image: '/images/products/bakery-grade.svg',
    idealFor: 'Industrial Bakeries, Biscuit Manufacturers, Confectioneries',
  },
];

export default function ProductsPage() {
  return (
    <div className="py-16 md:py-24 bg-brand-navy min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy-light border border-slate-700/60 text-xs font-bold uppercase tracking-widest text-brand-blue">
            <span>COMMERCIAL INVENTORY SPECIFICATIONS</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-tight">
            COMMERCIAL EGG SUPPLY{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">
              & PACKAGING.
            </span>
          </h1>

          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            Engineered packaging solutions and calibrated egg grades designed specifically for wholesale distributors, retail supermarkets, bakeries, and food service businesses.
          </p>

          <div className="p-4 rounded-xl bg-brand-navy-dark border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
            <span>
              Prices fluctuate based on daily wholesale poultry market benchmarks. Request a personalized quotation to receive current verified spot rates and scheduled volume pricing.
            </span>
          </div>
        </div>

        {/* Product Catalogue Grid */}
        <div className="space-y-12">
          {fullProducts.map((prod, idx) => (
            <ScrollReveal key={prod.id} direction="up" delay={0.1}>
              <div
                className="rounded-3xl bg-brand-navy-dark/90 border border-slate-800/90 hover:border-brand-blue/40 overflow-hidden transition-all duration-300 p-6 sm:p-10 hover:shadow-card-navy"
              >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Visual Graphic Column */}
                <div className="lg:col-span-5 relative h-72 rounded-2xl bg-brand-navy border border-slate-800 flex items-center justify-center p-6 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy-dark/90 border border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    <Sparkles className="w-3 h-3 text-brand-blue" />
                    <span>{prod.category}</span>
                  </div>

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

                  <div className="w-full h-full relative">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Details Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2">
                      {prod.name}
                    </h2>
                    <p className="text-sm text-brand-muted leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  {/* Packaging Specifications Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-slate-800/80 text-xs">
                    <div className="space-y-1">
                      <span className="text-slate-500 font-medium">Packaging Unit:</span>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Box className="w-3.5 h-3.5 text-brand-blue" />
                        <span>{prod.packaging}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-slate-500 font-medium">Minimum Order Quantity (MOQ):</span>
                      <div className="font-bold text-brand-red flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{prod.moq}</span>
                      </div>
                    </div>

                    <div className="sm:col-span-2 space-y-2 pt-2">
                      <span className="text-slate-500 font-medium">Commercial Specifications:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                        {Object.entries(prod.specs).map(([k, v]) => (
                          <div key={k} className="flex items-start gap-1.5 bg-brand-navy/60 p-2 rounded-lg border border-slate-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
                            <span className="capitalize">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-2 pt-2">
                      <span className="text-slate-500 font-medium">Recommended For: </span>
                      <span className="text-slate-300 font-semibold">{prod.idealFor}</span>
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Button
                      href={`/wholesale?product=${encodeURIComponent(prod.name)}`}
                      variant="primary"
                      size="md"
                      icon="arrow-up-right"
                      className="shadow-glow-blue"
                    >
                      Request Quotation for This Product
                    </Button>
                    <Link
                      href="/contact"
                      className="text-xs font-semibold text-brand-muted hover:text-white transition"
                    >
                      Need Custom Packaging? Talk to Us →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
