'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useSpring } from 'motion/react';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Plus,
  Download,
  Save,
  Loader2,
  Phone,
  MessageCircle,
} from 'lucide-react';

const ICON_MAP = {
  'arrow-up-right': ArrowUpRight,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  plus: Plus,
  download: Download,
  save: Save,
  loader: Loader2,
  phone: Phone,
  whatsapp: MessageCircle,
};

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary', // 'primary', 'secondary', 'red', 'outline', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  disabled = false,
  type = 'button',
  icon: IconProp,
  iconPosition = 'right',
  magnetic = true,
  ...props
}) {
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic spring physics
  const springConfig = { damping: 15, stiffness: 150, mass: 0.2 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!magnetic || disabled || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.16);
    y.set(distanceY * 0.16);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const baseClasses =
    'relative group inline-flex items-center justify-center font-display font-bold tracking-wide rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-navy active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none overflow-hidden';

  const sizeClasses = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2',
    lg: 'text-base px-8 py-4 gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-brand-blue text-white shadow-glow-blue hover:shadow-[0_0_45px_rgba(23,75,255,0.7)] focus:ring-brand-blue border border-blue-400/40',
    red:
      'bg-brand-red text-white shadow-glow-red hover:shadow-[0_0_40px_rgba(255,48,59,0.6)] focus:ring-brand-red border border-red-400/40',
    secondary:
      'bg-brand-navy-light/90 hover:bg-brand-navy-light text-white hover:text-brand-blue border border-slate-700/70 focus:ring-slate-500 backdrop-blur-md hover:border-brand-blue/50',
    outline:
      'bg-transparent hover:bg-brand-blue/15 text-white hover:text-brand-blue border border-brand-blue/50 focus:ring-brand-blue hover:border-brand-blue',
    ghost:
      'bg-transparent hover:bg-white/5 text-brand-muted hover:text-white border-transparent focus:ring-white/20',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  // Resolve icon component or string
  const ResolvedIcon = typeof IconProp === 'string' ? ICON_MAP[IconProp] : IconProp;

  const content = (
    <>
      {/* Shimmer light sweep highlight across the button */}
      <span className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-xl">
        <span className="absolute -left-full top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%]" />
      </span>

      {/* Glow pulse layer */}
      {(variant === 'primary' || variant === 'red') && (
        <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}

      {/* Button Content with smooth icon slide */}
      <span className="relative z-10 flex items-center gap-2">
        {ResolvedIcon && iconPosition === 'left' && (
          <ResolvedIcon className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" />
        )}
        <span>{children}</span>
        {ResolvedIcon && iconPosition === 'right' && (
          <ResolvedIcon className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        )}
      </span>
    </>
  );

  const motionWrapperProps = {
    ref: buttonRef,
    style: { x, y },
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    whileTap: { scale: 0.96 },
  };

  if (href) {
    return (
      <motion.div {...motionWrapperProps} className="inline-block">
        <Link href={href} className={combinedClasses} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...motionWrapperProps}
      {...props}
    >
      {content}
    </motion.button>
  );
}
