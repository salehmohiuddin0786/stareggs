'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const DEFAULT_WORDS = [
  'WHOLESALE DISTRIBUTORS',
  'SUPERMARKET CHAINS',
  'HOTELS & RESTAURANTS',
  'COMMERCIAL BAKERIES',
  'DISTRICT AGGREGATORS',
];

export default function WordRotator({
  words = DEFAULT_WORDS,
  interval = 2800,
  prefix = 'SUPPLYING FOR',
  className = '',
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <div className={`inline-flex flex-wrap items-center gap-2 ${className}`}>
      {prefix && (
        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-400">
          {prefix}
        </span>
      )}
      <div className="relative inline-flex items-center overflow-hidden h-[34px] sm:h-[40px] px-3.5 py-1 rounded-xl bg-brand-navy-light/80 border border-brand-blue/40 shadow-glow-blue/40 backdrop-blur-md">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, y: 22, rotateX: -60, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -22, rotateX: 60, filter: 'blur(6px)' }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display text-xs sm:text-sm font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-brand-red whitespace-nowrap"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>

        {/* Indicator dots */}
        <div className="ml-3 flex items-center gap-1">
          {words.map((_, i) => (
            <span
              key={i}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                i === index ? 'w-2.5 bg-brand-red' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
