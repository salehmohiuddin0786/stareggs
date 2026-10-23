import Link from 'next/link';

export default function Logo({ className = '', subtitle = true, light = false }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group focus:outline-none ${className}`}>
      {/* Star & Egg Geometric Symbol */}
      <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-blue-800 p-0.5 shadow-glow-blue transition-transform duration-300 group-hover:scale-105">
        <div className="w-full h-full bg-brand-navy rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle inner egg glow */}
          <div className="absolute inset-0 bg-radial-spotlight opacity-40" />
          
          <svg
            viewBox="0 0 40 40"
            className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:rotate-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Center Egg Form */}
            <path
              d="M20 7C14.5 7 11 15 11 23C11 28.5 15 33 20 33C25 33 29 28.5 29 23C29 15 25.5 7 20 7Z"
              fill="white"
              fillOpacity="0.95"
            />
            {/* Embedded 4-point Diamond Star */}
            <path
              d="M20 12L21.5 18.5L28 20L21.5 21.5L20 28L18.5 21.5L12 20L18.5 18.5L20 12Z"
              fill="#FF303B"
            />
            {/* Small Specular Sparkle */}
            <circle cx="17" cy="14" r="1.5" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-display text-xl font-black tracking-wider uppercase ${light ? 'text-brand-navy' : 'text-white'}`}>
            STAR
          </span>
          <span className="font-display text-xl font-black tracking-wider uppercase text-brand-red">
            EGGS
          </span>
        </div>
        {subtitle && (
          <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-brand-muted mt-1">
            WHOLESALE • RETAIL • TELANGANA
          </span>
        )}
      </div>
    </Link>
  );
}
