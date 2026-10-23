import Link from 'next/link';
import { Truck, ChevronRight } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-navy-dark border-b border-slate-800/80 text-xs py-2 px-4 relative z-40 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-brand-muted truncate">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue flex-shrink-0">
            <Truck className="w-3 h-3" />
          </span>
          <span className="font-medium text-white truncate">
            Serving Adilabad Daily & Expanding Across All 33 Districts of Telangana
          </span>
          <span className="hidden md:inline-block text-slate-500">•</span>
          <span className="hidden md:inline-block text-slate-400">
            Direct Farm Procurement • Zero Broken Shell Transit Care
          </span>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <Link
            href="/distribution"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand-red hover:text-red-400 transition"
          >
            <span>Partner With Us</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
          <div className="h-3 w-px bg-slate-800 hidden sm:block" />
          <Link
            href="/admin/login"
            className="text-[11px] text-slate-500 hover:text-brand-muted transition"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
