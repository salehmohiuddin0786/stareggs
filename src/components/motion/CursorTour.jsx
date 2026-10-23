'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  CheckCircle2,
  Layers,
  Truck,
  ShieldCheck,
  Building2,
} from 'lucide-react';

const TOUR_STEPS = [
  {
    targetId: 'hero-section',
    badge: 'STOP 01 / 05 • 3D OPTICAL INSPECTION',
    icon: Sparkles,
    title: 'Adilabad Central Hub & Optical Candling',
    description:
      'Explore our interactive 3D egg showcase. Every layer intake in Adilabad undergoes high-intensity optical candling and weight sorting before loading into our distribution stream.',
    highlightLabel: '3D Real-Time Inspection',
  },
  {
    targetId: 'dispatch-lineup',
    badge: 'STOP 02 / 05 • COMMERCIAL ROSTER',
    icon: Layers,
    title: 'Standardized Egg Calibers & Master Cartons',
    description:
      'Explore our 5 core commercial lines — from 30-egg anti-shock pulp trays for supermarket shelves to 210-egg heavy corrugated master cartons for regional stockists.',
    highlightLabel: 'Commercial Lineup',
  },
  {
    targetId: 'dispatch-timetable',
    badge: 'STOP 03 / 05 • FLEET SCHEDULE',
    icon: Truck,
    title: 'Daily Highway Dispatch Timetable',
    description:
      'Our dedicated transport fleet departs Adilabad at 5:00 AM daily across northern, eastern, and weekend commercial routes, ensuring zero broken shells and on-time drops.',
    highlightLabel: '5 AM Morning Fleet',
  },
  {
    targetId: 'telangana-coverage',
    badge: 'STOP 04 / 05 • STATEWIDE REACH',
    icon: Building2,
    title: 'All 33 Telangana Districts Covered',
    description:
      'Search your specific district or highway trading corridor to review active delivery frequency, regional stockists, or distributor partnership opportunities.',
    highlightLabel: '33 Districts Logistics',
  },
  {
    targetId: 'contact-cta',
    badge: 'STOP 05 / 05 • QUOTATION ENGINE',
    icon: ShieldCheck,
    title: 'Direct Wholesale Pricing & Partnership',
    description:
      'Submit your daily egg tray requirements or retail volume directly to our Adilabad commercial desk for instant quotation and standing contract allocations.',
    highlightLabel: 'Fast Commercial Quote',
  },
];

export default function CursorTour() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default'); // 'default', 'hover', 'drag', 'view'
  const [cursorLabel, setCursorLabel] = useState('');
  const [isTouch, setIsTouch] = useState(true);

  // Guided Tour State
  const [tourActive, setTourActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Detect mouse capabilities & setup cursor tracking
  useEffect(() => {
    // Only enable custom cursor if fine pointer (mouse) is available
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    setIsTouch(!hasFinePointer);

    if (!hasFinePointer) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Detect hover target attributes or elements
      const target = e.target;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, textarea');
      const canvas3D = target.closest('canvas, #hero-section .cursor-grab');
      const rosterRow = target.closest('.roster-row, .dispatch-card');

      if (canvas3D) {
        setCursorType('drag');
        setCursorLabel('DRAG 3D');
      } else if (rosterRow) {
        setCursorType('view');
        setCursorLabel('VIEW');
      } else if (interactive) {
        setCursorType('hover');
        setCursorLabel('');
      } else {
        setCursorType('default');
        setCursorLabel('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Custom event to start brand tour from anywhere
    const handleStartTourEvent = () => {
      startTour();
    };
    window.addEventListener('start-brand-tour', handleStartTourEvent);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('start-brand-tour', handleStartTourEvent);
    };
  }, []);

  // Keyboard navigation for tour
  useEffect(() => {
    if (!tourActive) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        endTour();
      } else if (e.key === 'ArrowRight') {
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        prevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tourActive, currentStepIndex]);

  // Smooth scroll to step target
  const scrollToTarget = (targetId) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -90, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const startTour = () => {
    setTourActive(true);
    setCurrentStepIndex(0);
    scrollToTarget(TOUR_STEPS[0].targetId);
  };

  const endTour = () => {
    setTourActive(false);
  };

  const nextStep = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      scrollToTarget(TOUR_STEPS[nextIdx].targetId);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      scrollToTarget(TOUR_STEPS[prevIdx].targetId);
    }
  };

  const currentStep = TOUR_STEPS[currentStepIndex];
  const StepIcon = currentStep?.icon || Sparkles;

  return (
    <>
      {/* ========================================================
          1. FLUID INTERACTIVE CURSOR (DESKTOP ONLY)
          ======================================================== */}
      {!isTouch && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {/* Inner Precision Dot */}
          <motion.div
            className="fixed top-0 left-0 w-2.5 h-2.5 bg-brand-red rounded-full"
            style={{
              x: mousePos.x - 5,
              y: mousePos.y - 5,
            }}
            animate={{
              scale: cursorType === 'hover' ? 0.4 : cursorType === 'drag' ? 0 : 1,
              opacity: mousePos.x < 0 ? 0 : 1,
            }}
            transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
          />

          {/* Outer Halo / Interactive Bubble */}
          <motion.div
            className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-colors duration-200 border ${
              cursorType === 'drag'
                ? 'w-16 h-16 bg-brand-blue/30 border-brand-blue backdrop-blur-sm'
                : cursorType === 'view'
                ? 'w-16 h-16 bg-brand-red/25 border-brand-red backdrop-blur-sm'
                : cursorType === 'hover'
                ? 'w-12 h-12 bg-white/10 border-white/50'
                : 'w-8 h-8 bg-brand-blue/10 border-brand-blue/30'
            }`}
            style={{
              x: mousePos.x - (cursorType === 'drag' || cursorType === 'view' ? 32 : cursorType === 'hover' ? 24 : 16),
              y: mousePos.y - (cursorType === 'drag' || cursorType === 'view' ? 32 : cursorType === 'hover' ? 24 : 16),
            }}
            animate={{
              opacity: mousePos.x < 0 ? 0 : 1,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.15 }}
          >
            {cursorLabel && (
              <span className="text-[9px] font-black tracking-widest uppercase text-white font-mono drop-shadow">
                {cursorLabel}
              </span>
            )}
          </motion.div>
        </div>
      )}

      {/* ========================================================
          2. FLOATING "COMMERCIAL TOUR" TOGGLE PILL
          ======================================================== */}
      {!tourActive && (
        <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startTour}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-brand-navy-dark/95 border border-brand-blue/50 text-white shadow-2xl backdrop-blur-xl hover:border-brand-red hover:shadow-glow-blue transition-all"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-red" />
            </span>
            <Compass className="w-4 h-4 text-brand-blue group-hover:text-brand-red transition-colors" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Take 60-Sec Tour
            </span>
          </motion.button>
        </div>
      )}

      {/* ========================================================
          3. GUIDED TOUR INTERACTIVE HUD OVERLAY
          ======================================================== */}
      <AnimatePresence>
        {tourActive && (
          <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-end sm:justify-start items-center p-4 sm:p-8">
            {/* Top Navigation HUD Card */}
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto max-w-xl w-full bg-brand-navy-dark/95 border border-brand-blue/60 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl text-white relative mt-2 sm:mt-12"
            >
              {/* Progress bar line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-slate-800 rounded-t-3xl overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-blue to-brand-red"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentStepIndex + 1) / TOUR_STEPS.length) * 100}%`,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Close Button */}
              <button
                onClick={endTour}
                className="absolute top-4 right-4 p-2 rounded-full bg-brand-navy hover:bg-slate-800 text-slate-400 hover:text-white transition"
                title="Exit Tour (Esc)"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Step Badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/40 text-[10px] font-mono font-bold tracking-widest uppercase text-brand-blue">
                  {currentStep.badge}
                </span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Star Eggs Guided Walkthrough
                </span>
              </div>

              {/* Step Title & Icon */}
              <div className="flex items-start gap-3 mt-3">
                <div className="w-10 h-10 rounded-xl bg-brand-navy border border-slate-700 flex items-center justify-center flex-shrink-0 text-brand-red">
                  <StepIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-black uppercase text-white tracking-tight">
                    {currentStep.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-muted mt-1 leading-relaxed">
                    {currentStep.description}
                  </p>
                </div>
              </div>

              {/* Tour Controls Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                <button
                  onClick={prevStep}
                  disabled={currentStepIndex === 0}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition ${
                    currentStepIndex === 0
                      ? 'opacity-30 border-slate-800 text-slate-500 cursor-not-allowed'
                      : 'border-slate-700 hover:border-white text-slate-300 hover:text-white'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {TOUR_STEPS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentStepIndex(idx);
                        scrollToTarget(TOUR_STEPS[idx].targetId);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentStepIndex
                          ? 'w-6 bg-brand-red'
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      title={`Jump to step ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextStep}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl bg-brand-red hover:bg-brand-red-light text-white shadow-glow-red transition"
                >
                  <span>
                    {currentStepIndex === TOUR_STEPS.length - 1
                      ? 'Finish Tour'
                      : 'Next Stop'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
