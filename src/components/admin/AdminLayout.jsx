'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Users,
  Box,
  MapPin,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import Logo from '@/components/common/Logo';

export default function AdminLayout({ children, user }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      router.push('/admin/login');
    }
  };

  const navItems = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Enquiries', href: '/admin/enquiries', icon: Inbox },
    { label: 'Partner Applications', href: '/admin/distributors', icon: Users },
    { label: 'Product Catalogue', href: '/admin/products', icon: Box },
    { label: 'Telangana Districts', href: '/admin/districts', icon: MapPin },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-brand-navy-dark flex text-slate-200">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-brand-navy border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <Logo subtitle={false} />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-brand-blue/15 border border-brand-blue/30 text-[10px] font-bold uppercase tracking-wider text-brand-blue">
            Admin Management Console
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-glow-blue'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Account & Actions */}
        <div className="p-6 border-t border-slate-800 space-y-3">
          <div className="text-xs">
            <div className="font-bold text-white truncate">{user?.name || 'Administrator'}</div>
            <div className="text-[11px] text-slate-500 truncate">{user?.email || 'admin@stareggs.in'}</div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800/80">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Mobile Header Bar */}
        <header className="lg:hidden bg-brand-navy border-b border-slate-800 p-4 flex items-center justify-between">
          <Logo subtitle={false} />
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-brand-navy-light text-white border border-slate-700"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Content Viewport */}
        <main className="p-4 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
