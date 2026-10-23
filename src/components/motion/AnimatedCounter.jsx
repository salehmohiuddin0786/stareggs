'use client';

import CountUp from './CountUp';

export default function AnimatedCounter({
  value = 0,
  suffix = '',
  prefix = '',
  duration = 2.0,
  decimals,
  className = 'font-display font-black',
}) {
  // Extract clean numerical target
  const numVal =
    typeof value === 'number'
      ? value
      : parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;

  return (
    <CountUp
      end={numVal}
      duration={duration}
      prefix={prefix}
      suffix={suffix}
      decimals={decimals}
      className={className}
    />
  );
}
