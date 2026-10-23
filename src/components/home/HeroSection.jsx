'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  ShieldCheck,
  Truck,
  Sparkles,
  MapPin,
  Clock,
  Compass,
} from 'lucide-react';
import Button from '@/components/common/Button';
import HeroFallback from '@/components/3d/HeroFallback';
import CountUp from '@/components/motion/CountUp';
import WordRotator from '@/components/motion/WordRotator';

// Dynamically load 3D Canvas on client only
const Hero3DCanvas = dynamic(() => import('@/components/3d/Hero3DCanvas'), {
  ssr: false,
  loading: () => <HeroFallback />,
});

// Staggered reveal animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const maskItemVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      if (window.innerWidth >= 768) {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        setMousePos({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="relative min-h-[94vh] flex items-center bg-brand-navy overflow-hidden"
    >
      {/* Studio Lighting Background Gradients with entrance bloom */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.75, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="absolute inset-0 bg-radial-spotlight pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute top-1/4 -right-24 w-[560px] h-[560px] bg-brand-blue rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-10 left-10 w-[420px] h-[420px] bg-brand-red rounded-full blur-[150px] pointer-events-none"
      />

      {/* Grid Floor Lines for Cinematic Perspective */}
      <div
        className="absolute bottom-0 inset-x-0 h-64 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(23,75,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,75,255,0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'perspective(600px) rotateX(65deg)',
          transformOrigin: 'bottom center',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines, Word Rotator & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            {/* 1. Brand Statement Pill (Hero Reveal Item) */}
            <motion.div variants={fadeUpVariants}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-navy-light/90 border border-brand-blue/40 shadow-glow-blue/50 text-xs font-bold tracking-widest uppercase text-white backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                <span>WHOLESALE • RETAIL • DISTRIBUTION HUB</span>
                <span className="text-slate-400 font-normal">| Adilabad HQ</span>
              </div>
            </motion.div>

            {/* 2. Main Editorial Headline with Mask Clip-Path Reveal */}
            <div className="space-y-1">
              <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white uppercase leading-[1.05]">
                {/* Line 1 */}
                <span className="block overflow-hidden pb-1">
                  <motion.span variants={maskItemVariants} className="block">
                    FRESH EGGS.
                  </motion.span>
                </span>

                {/* Line 2 */}
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    variants={maskItemVariants}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-300 to-white"
                  >
                    RELIABLE SUPPLY.
                  </motion.span>
                </span>

                {/* Line 3 */}
                <span className="block overflow-hidden pb-1">
                  <motion.span variants={maskItemVariants} className="relative inline-block">
                    TELANGANA-WIDE.
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{ originX: 0 }}
                      className="absolute -bottom-1.5 left-0 w-28 h-1.5 bg-brand-red rounded-full"
                    />
                  </motion.span>
                </span>
              </h1>
            </div>

            {/* 3. Kinetic Word Rotator */}
            <motion.div variants={fadeUpVariants} className="pt-1">
              <WordRotator
                prefix="RELIABLE BULK SUPPLY FOR:"
                words={[
                  'WHOLESALE DISTRIBUTORS',
                  'SUPERMARKET CHAINS',
                  'HOTELS & RESTAURANTS',
                  'COMMERCIAL BAKERIES',
                  'DISTRICT AGGREGATORS',
                ]}
                interval={2800}
              />
            </motion.div>

            {/* 4. Supporting Editorial Copy */}
            <motion.p
              variants={fadeUpVariants}
              className="text-brand-muted text-base sm:text-lg max-w-xl leading-relaxed"
            >
              Your trusted partner for commercial egg supply — from neighborhood retail grocers to high-capacity wholesale distribution networks. Headquartered in Adilabad, delivering fresh daily across all 33 districts of Telangana.
            </motion.p>

            {/* 5. CTAs with Interactive Tours & Quote */}
            <motion.div
              variants={fadeUpVariants}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Button
                href="/wholesale"
                variant="primary"
                size="lg"
                icon={ArrowUpRight}
                className="shadow-glow-blue"
              >
                Request Wholesale Pricing
              </Button>
              <Button
                href="/distribution"
                variant="secondary"
                size="lg"
              >
                Become a Distribution Partner
              </Button>
            </motion.div>

            {/* 6. Trust Micro-Metrics with Live CountUp Start Animations */}
            <motion.div
              variants={fadeUpVariants}
              className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg"
            >
              {/* Stat 1: Daily Capacity */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-brand-blue">
                  <Truck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Capacity</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white font-display">
                  <CountUp end={100000} duration={2.2} suffix="+" />
                </div>
                <div className="text-[11px] text-slate-500">Daily Eggs Procured</div>
              </div>

              {/* Stat 2: Zero Shock / Quality */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Quality</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white font-display">
                  <CountUp end={99.8} decimals={1} duration={2.0} suffix="%" />
                </div>
                <div className="text-[11px] text-slate-500">Zero Crack Rate</div>
              </div>

              {/* Stat 3: Telangana Coverage */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-brand-red">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Network</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white font-display">
                  <CountUp end={33} duration={1.6} suffix=" Districts" />
                </div>
                <div className="text-[11px] text-slate-500">Telangana Coverage</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Egg Experience Reveal */}
          <div className="lg:col-span-5 relative h-[420px] sm:h-[480px] lg:h-[580px] flex items-center justify-center">
            {/* Subtle Studio Glow Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent z-10 pointer-events-none" />

            {/* 3D Scene or Mobile Fallback with entrance fade-in */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative z-0"
            >
              {isMobile ? (
                <HeroFallback />
              ) : (
                <Hero3DCanvas mousePos={mousePos} />
              )}
            </motion.div>

            {/* Floating Quality Callout Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-4 right-4 z-20 bg-brand-navy-dark/95 border border-brand-blue/30 rounded-2xl p-3.5 backdrop-blur-xl shadow-2xl hidden sm:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center text-brand-blue font-bold">
                ★
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-white">
                  Farm-Direct Optical Candling
                </div>
                <div className="text-[11px] text-brand-muted">
                  Calibrated for wholesale & culinary standards
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
