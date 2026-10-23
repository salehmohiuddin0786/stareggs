'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  Layers,
  Building2,
  Truck,
  MapPin,
  Compass,
  Phone,
} from 'lucide-react';

export default function AppFloatingNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const containerRef = useRef(null);
  const btnRefs = useRef([]);

  // Don't render on admin dashboard
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const items = [
    {
      id: 0,
      label: 'Home',
      icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
      onClick: () => {
        if (pathname === '/') {
          if (window.__lenis) {
            window.__lenis.scrollTo(0, { duration: 1.2 });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          router.push('/');
        }
      },
    },
    {
      id: 1,
      label: 'Products',
      icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5" />,
      onClick: () => router.push('/products'),
    },
    {
      id: 2,
      label: 'Wholesale',
      icon: <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />,
      onClick: () => router.push('/wholesale'),
    },
    {
      id: 3,
      label: 'Dispatch',
      icon: <Truck className="w-4 h-4 sm:w-5 sm:h-5" />,
      onClick: () => {
        if (pathname === '/') {
          const el = document.getElementById('dispatch-timetable');
          if (el) {
            if (window.__lenis) {
              window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
            } else {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        } else {
          router.push('/#dispatch-timetable');
        }
      },
    },
    {
      id: 4,
      label: 'Network',
      icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />,
      onClick: () => {
        if (pathname === '/') {
          const el = document.getElementById('telangana-coverage');
          if (el) {
            if (window.__lenis) {
              window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
            } else {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        } else {
          router.push('/#telangana-coverage');
        }
      },
    },
    {
      id: 5,
      label: 'Tour',
      icon: <Compass className="w-4 h-4 sm:w-5 sm:h-5" />,
      onClick: () => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('start-brand-tour'));
        }
      },
    },
    {
      id: 6,
      label: 'Contact',
      icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5" />,
      onClick: () => router.push('/contact'),
    },
  ];

  // Sync active index with pathname & homepage scroll position
  useEffect(() => {
    if (pathname === '/products') {
      setActive(1);
      return;
    }
    if (pathname === '/wholesale') {
      setActive(2);
      return;
    }
    if (pathname === '/distribution') {
      setActive(4);
      return;
    }
    if (pathname === '/contact') {
      setActive(6);
      return;
    }

    if (pathname === '/') {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const dispatchEl = document.getElementById('dispatch-timetable');
        const networkEl = document.getElementById('telangana-coverage');

        if (networkEl && scrollY >= networkEl.offsetTop - 300) {
          setActive(4);
        } else if (dispatchEl && scrollY >= dispatchEl.offsetTop - 300) {
          setActive(3);
        } else {
          setActive(0);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [pathname]);

  // Update sliding indicator position with robust bounding rect calculation
  useEffect(() => {
    const updateIndicator = () => {
      if (btnRefs.current[active] && containerRef.current) {
        const btn = btnRefs.current[active];
        const container = containerRef.current;
        if (!btn) return;
        const btnRect = btn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setIndicatorStyle({
          width: btnRect.width,
          left: btnRect.left - containerRect.left,
        });
      }
    };

    updateIndicator();
    // Use requestAnimationFrame for smooth layout adjustment
    const timer = setTimeout(updateIndicator, 50);
    window.addEventListener('resize', updateIndicator);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [active]);

  return (
    <nav
      aria-label="Primary Navigation"
      className="fixed bottom-3 sm:bottom-6 inset-x-0 z-40 flex justify-center px-2 sm:px-4 pointer-events-none"
    >
      <div
        ref={containerRef}
        className="pointer-events-auto relative flex items-center justify-between w-full max-w-[420px] xs:max-w-[460px] sm:max-w-xl md:max-w-2xl bg-brand-navy-dark/95 backdrop-blur-2xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.8)] rounded-full px-1 sm:px-2 py-1.5 border border-brand-blue/30 text-white"
      >
        {items.map((item, index) => {
          const isActive = active === index;
          return (
            <button
              key={item.id}
              ref={(el) => {
                btnRefs.current[index] = el;
              }}
              onClick={() => {
                setActive(index);
                item.onClick();
              }}
              className={`relative flex flex-col items-center justify-center flex-1 min-h-[44px] sm:min-h-[48px] py-1 px-0.5 sm:px-1 rounded-full transition-colors duration-200 select-none ${
                isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={item.label}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`z-10 transition-transform duration-200 ${
                  isActive ? 'scale-110 text-white' : 'hover:scale-105'
                }`}
              >
                {item.icon}
              </div>

              {/* Label: Responsive typography across small phones, tablets, and desktops */}
              <span
                className={`z-10 text-[8.5px] xs:text-[9.5px] sm:text-[11px] font-bold tracking-tight mt-0.5 transition-colors ${
                  isActive ? 'text-white' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Sliding Active Indicator with spring easing and subtle glow */}
        <motion.div
          animate={indicatorStyle}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-brand-blue/40 via-brand-blue/30 to-brand-red/30 border border-brand-blue/60 shadow-glow-blue pointer-events-none"
        />
      </div>
    </nav>
  );
}
