'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

export default function TiltCard({
  children,
  className = '',
  spotlightColor = 'rgba(23, 75, 255, 0.18)',
  borderGlowColor = 'rgba(23, 75, 255, 0.4)',
  tiltFactor = 8,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });

  const shouldReduceMotion = useReducedMotion();

  // Motion values for tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltFactor, -tiltFactor]), {
    damping: 20,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltFactor, tiltFactor]), {
    damping: 20,
    stiffness: 200,
  });

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMouseCoord({ x, y });

    // Normalized between -0.5 and 0.5
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
      }}
      className={`relative group rounded-2xl transition-shadow duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      {isHovered && !shouldReduceMotion && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(450px circle at ${mouseCoord.x}px ${mouseCoord.y}px, ${spotlightColor}, transparent 75%)`,
          }}
        />
      )}

      {/* Dynamic Border Glow on hover */}
      {isHovered && !shouldReduceMotion && (
        <div
          className="absolute -inset-px rounded-2xl pointer-events-none z-0"
          style={{
            background: `radial-gradient(280px circle at ${mouseCoord.x}px ${mouseCoord.y}px, ${borderGlowColor}, transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
}
