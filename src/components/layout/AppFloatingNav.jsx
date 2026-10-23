'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [visible, setVisible] = useState(true);
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
      icon: <Home size={18} />,
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
      icon: <Layers size={18} />,
      onClick: () => router.push('/products'),
    },
    {
      id: 2,
      label: 'Wholesale',
      icon: <Building2 size={18} />,
      onClick: () => router.push('/wholesale'),
    },
    {
      id: 3,
      label: 'Dispatch',
      icon: <Truck size={18} />,
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
      icon: <MapPin size={18} />,
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
      icon: <Compass size={18} />,
      onClick: () => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('start-brand-tour'));
        }
      },
    },
    {
      id: 6,
      label: 'Contact',
      icon: <Phone size={18} />,
      onClick: () => router.push('/contact'),
    },
  ];

  // Sync active index with pathname
  useEffect(() => {
    if (pathname === '/products') setActive(1);
    else if (pathname === '/wholesale') setActive(2);
    else if (pathname === '/distribution') setActive(4);
    else if (pathname === '/contact') setActive(6);
    else if (pathname === '/') setActive(0);
  }, [pathname]);

  // Update sliding indicator position
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
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [active]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-md sm:max-w-lg px-3 pointer-events-none">
      <div
        ref={containerRef}
        className="pointer-events-auto relative flex items-center justify-between bg-brand-navy-dark/95 backdrop-blur-2xl shadow-2xl rounded-full px-1.5 py-1.5 border border-brand-blue/30 text-white"
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
              className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 text-xs font-semibold transition-colors duration-200 ${
                isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={item.label}
            >
              <div className="z-10 transition-transform duration-200 hover:scale-110">
                {item.icon}
              </div>
              <span className="text-[10px] mt-0.5 hidden sm:block tracking-tight font-medium">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Sliding Active Indicator */}
        <motion.div
          animate={indicatorStyle}
          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
          className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-brand-blue/40 to-brand-red/30 border border-brand-blue/50 shadow-glow-blue"
        />
      </div>
    </div>
  );
}
