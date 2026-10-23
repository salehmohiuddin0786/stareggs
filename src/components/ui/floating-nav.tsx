"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Search, Bell, User, Settings, Bookmark } from "lucide-react";

export interface NavItem {
  id: number | string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface FloatingNavProps {
  items?: NavItem[];
  defaultActive?: number;
  className?: string;
  onItemChange?: (item: NavItem, index: number) => void;
}

const defaultItems: NavItem[] = [
  { id: 0, icon: <Home size={22} />, label: "Home" },
  { id: 1, icon: <Search size={22} />, label: "Search" },
  { id: 2, icon: <Bell size={22} />, label: "Alerts" },
  { id: 3, icon: <User size={22} />, label: "Profile" },
  { id: 4, icon: <Bookmark size={22} />, label: "Saved" },
  { id: 5, icon: <User size={22} />, label: "Account" },
  { id: 6, icon: <Settings size={22} />, label: "Settings" },
];

const FloatingNav = ({
  items = defaultItems,
  defaultActive = 0,
  className = "",
  onItemChange,
}: FloatingNavProps) => {
  const [active, setActive] = useState(defaultActive);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Update indicator position when active changes or resize
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
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [active, items]);

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-2 ${className}`}
    >
      <div
        ref={containerRef}
        className="relative flex items-center justify-between bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-2xl rounded-full px-1.5 py-2 border border-gray-200/80 dark:border-gray-800"
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
                item.onClick?.();
                onItemChange?.(item, index);
              }}
              className={`relative flex flex-col items-center justify-center flex-1 px-2 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <div className="z-10">{item.icon}</div>
              {/* hide labels on small screens */}
              <span className="text-[11px] mt-0.5 hidden sm:block truncate max-w-[56px]">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Sliding Active Indicator */}
        <motion.div
          animate={indicatorStyle}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-1 bottom-1 rounded-full bg-blue-500/15 dark:bg-blue-400/20 border border-blue-500/20"
        />
      </div>
    </div>
  );
};

export default FloatingNav;
export { FloatingNav };
