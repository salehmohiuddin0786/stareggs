'use client';

export default function HeroFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative select-none pointer-events-none">
      {/* Background Radial Glow */}
      <div className="absolute w-[450px] h-[450px] bg-brand-blue/20 rounded-full blur-[100px] animate-pulse-subtle" />
      <div className="absolute w-72 h-72 bg-brand-red/15 rounded-full blur-[90px] translate-x-24 -translate-y-12" />

      {/* Stylized Egg Composition */}
      <div className="relative z-10 w-full max-w-md aspect-square flex items-center justify-center">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full filter drop-shadow-[0_25px_35px_rgba(4,11,21,0.9)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="eggShading" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#E2E8F0" />
              <stop offset="90%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </radialGradient>
            <linearGradient id="rimBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#174BFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#174BFF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FF303B" stopOpacity="0.6" />
            </linearGradient>
            <radialGradient id="floorShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#040b15" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#040b15" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Floor Shadow */}
          <ellipse cx="250" cy="420" rx="180" ry="25" fill="url(#floorShadow)" />

          {/* Left Flanking Egg */}
          <path
            d="M140 220C100 220 80 280 80 330C80 375 110 400 140 400C170 400 200 375 200 330C200 280 180 220 140 220Z"
            fill="url(#eggShading)"
            stroke="#174BFF"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />

          {/* Right Flanking Egg */}
          <path
            d="M360 230C320 230 300 290 300 340C300 380 330 405 360 405C390 405 420 380 420 340C420 290 400 230 360 230Z"
            fill="url(#eggShading)"
            stroke="#FF303B"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />

          {/* Central Hero Egg */}
          <path
            d="M250 80C170 80 130 190 130 290C130 370 180 415 250 415C320 415 370 370 370 290C370 190 330 80 250 80Z"
            fill="url(#eggShading)"
            filter="drop-shadow(0 15px 25px rgba(23,75,255,0.25))"
          />

          {/* Dramatic Cobalt-Blue Rim Path */}
          <path
            d="M170 160C140 220 132 280 134 320"
            stroke="#174BFF"
            strokeWidth="6"
            strokeLinecap="round"
            filter="blur(2px)"
          />

          {/* Subtle Red Rim Opposite Path */}
          <path
            d="M330 180C360 230 366 280 364 320"
            stroke="#FF303B"
            strokeWidth="4"
            strokeLinecap="round"
            filter="blur(2px)"
          />

          {/* Specular Glint */}
          <ellipse cx="225" cy="140" rx="15" ry="30" transform="rotate(-25 225 140)" fill="#FFFFFF" fillOpacity="0.6" filter="blur(1px)" />
        </svg>
      </div>
    </div>
  );
}
