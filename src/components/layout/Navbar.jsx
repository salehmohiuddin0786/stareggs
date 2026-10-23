'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Phone, MessageCircle } from 'lucide-react';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { getWhatsAppLink } from '../../lib/whatsapp';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Products', href: '/products' },
    { label: 'Wholesale Supply', href: '/wholesale' },
    { label: 'Become a Partner', href: '/distribution' },
    { label: 'Telangana Network', href: '/#telangana-coverage' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  // Don't render public navbar on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-brand-navy/95 backdrop-blur-md border-b border-slate-800 shadow-xl'
          : 'bg-brand-navy/70 backdrop-blur-sm border-b border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'text-white bg-brand-blue/15 border border-brand-blue/30'
                      : 'text-brand-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('start-brand-tour'));
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-navy-light/90 border border-brand-blue/40 hover:border-brand-red text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition shadow-sm"
              title="Launch Guided Commercial Tour"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
              <span>Take Tour</span>
            </button>

            <a
              href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || '+919876543210'}`}
              className="p-2.5 rounded-xl text-brand-muted hover:text-white hover:bg-white/5 border border-slate-800 transition"
              title="Call Dispatch Desk"
            >
              <Phone className="w-4 h-4" />
            </a>
            <Button
              href="/wholesale"
              variant="primary"
              size="sm"
              icon={ArrowUpRight}
            >
              Request Pricing
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={getWhatsAppLink({ type: 'GENERAL' })}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-brand-navy-light text-white border border-slate-700/60 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-brand-navy-dark/95 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition ${
                    isActive
                      ? 'bg-brand-blue/20 text-white border border-brand-blue/30'
                      : 'text-brand-muted hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-800 space-y-2.5">
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('start-brand-tour'));
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-navy border border-brand-blue/50 text-white font-bold text-xs uppercase tracking-wider"
              >
                <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                <span>Start Guided Brand Tour</span>
              </button>

              <Button
                href="/wholesale"
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={ArrowUpRight}
              >
                Request Wholesale Pricing
              </Button>
              <Button
                href="/distribution"
                variant="outline"
                size="md"
                className="w-full justify-center"
              >
                Become a Distribution Partner
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
