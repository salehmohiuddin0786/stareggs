'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { ArrowUpRight, ShieldCheck, Truck, Sparkles, Building2, Store } from 'lucide-react';
import Button from '@/components/common/Button';
import HeroFallback from '@/components/3d/HeroFallback';
import AnimatedCounter from '@/components/motion/AnimatedCounter';

// Dynamically load 3D Canvas on client only
const Hero3DCanvas = dynamic(() => import('@/components/3d/Hero3DCanvas'), {
  ssr: false,
  loading: () => <HeroFallback />,
});

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
    <section className="relative min-h-[92vh] flex items-center bg-brand-navy overflow-hidden">
      {/* Studio Lighting Background Gradients */}
      <div className="absolute inset-0 bg-radial-spotlight opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-brand-blue/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

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
          {/* Left Column: Headlines & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Brand Statement Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-navy-light/90 border border-brand-blue/40 shadow-glow-blue/50 text-xs font-bold tracking-widest uppercase text-white backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span>WHOLESALE • RETAIL • DISTRIBUTION</span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-1">
              <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white uppercase leading-[1.05]">
                FRESH EGGS.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-400 to-white">
                  RELIABLE SUPPLY.
                </span>
                <br />
                <span className="relative inline-block">
                  TELANGANA-WIDE.
                  <span className="absolute -bottom-1.5 left-0 w-24 h-1.5 bg-brand-red rounded-full" />
                </span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-brand-muted text-base sm:text-lg max-w-xl leading-relaxed pt-2">
              Your trusted partner for quality egg supply — from individual neighborhood retailers to high-volume wholesale distribution networks based in Adilabad and serving across Telangana.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
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
            </div>

            {/* Trust Micro-Metrics with Live Scroll Counters */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-brand-blue">
                  <Truck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Dispatch</span>
                </div>
                <div className="text-base font-bold text-white flex items-center">
                  <span>Daily 5 AM</span>
                </div>
                <div className="text-[11px] text-slate-500">Morning Fleet</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Quality</span>
                </div>
                <div className="text-base font-bold text-white flex items-center gap-1">
                  <AnimatedCounter value={0} suffix="%" />
                  <span>Transit Shock</span>
                </div>
                <div className="text-[11px] text-slate-500">Pulp Cradling</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-brand-red">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Network</span>
                </div>
                <div className="text-base font-bold text-white flex items-center gap-1">
                  <AnimatedCounter value={33} suffix=" Districts" />
                </div>
                <div className="text-[11px] text-slate-500">Telangana Reach</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Egg Experience */}
          <div className="lg:col-span-5 relative h-[420px] sm:h-[480px] lg:h-[580px] flex items-center justify-center">
            {/* Subtle Studio Glow Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent z-10 pointer-events-none" />

            {/* 3D Scene or Mobile Fallback */}
            <div className="w-full h-full relative z-0">
              {isMobile ? (
                <HeroFallback />
              ) : (
                <Hero3DCanvas mousePos={mousePos} />
              )}
            </div>

            {/* Floating Quality Callout Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute bottom-4 right-4 z-20 bg-brand-navy-dark/90 border border-brand-blue/30 rounded-2xl p-3.5 backdrop-blur-xl shadow-2xl hidden sm:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center text-brand-blue font-bold">
                ★
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-white">
                  Farm-Direct Grading
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
