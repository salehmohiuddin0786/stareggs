'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

export default function AnimatedCounter({ value, suffix = '', prefix = '', duration = 1.6 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Extract number from string if needed
  const targetNum = typeof value === 'number' ? value : parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0;

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(targetNum);
      return;
    }

    if (isInView) {
      let start = 0;
      const end = targetNum;
      const stepTime = Math.abs(Math.floor((duration * 1000) / (end || 1)));
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, Math.max(stepTime, 20));

      return () => clearInterval(timer);
    }
  }, [isInView, targetNum, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className="font-display font-black">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
