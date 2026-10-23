'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

/**
 * Format a number with optional decimals and custom thousands separator
 */
function formatNumber(num, decimals = 0, separator = ',') {
  const fixed = num.toFixed(decimals);
  const parts = fixed.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return parts.join('.');
}

/**
 * High-performance CountUp animation using requestAnimationFrame and easeOutExpo
 */
export default function CountUp({
  end = 0,
  start = 0,
  duration = 2.0,
  decimals,
  prefix = '',
  suffix = '',
  separator = ',',
  className = '',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const shouldReduceMotion = useReducedMotion();

  // Auto-detect decimals if not explicitly passed (e.g. 99.8 has 1 decimal)
  const numDecimals =
    decimals !== undefined
      ? decimals
      : String(end).includes('.')
      ? (String(end).split('.')[1] || '').length
      : 0;

  const [currentVal, setCurrentVal] = useState(shouldReduceMotion ? end : start);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentVal(end);
      return;
    }

    if (!isInView) return;

    let startTime = null;
    let animationFrameId = null;

    const startVal = Number(start);
    const endVal = Number(end);
    const totalDurationMs = duration * 1000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / totalDurationMs, 1);

      // easeOutExpo function for ultra-smooth natural deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = startVal + (endVal - startVal) * easeProgress;

      setCurrentVal(val);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrentVal(endVal);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, end, start, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(currentVal, numDecimals, separator)}
      {suffix}
    </span>
  );
}
