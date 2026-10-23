'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import Logo from '@/components/common/Logo';
import Button from '@/components/common/Button';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@stareggs.in');
  const [password, setPassword] = useState('Admin@StarEggs2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy-dark flex items-center justify-center p-4">
      {/* Background radial glow */}
      <div className="absolute w-[450px] h-[450px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full rounded-3xl bg-brand-navy border border-slate-800 p-8 sm:p-10 shadow-2xl relative z-10 space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo subtitle={false} />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-brand-blue">
            Staff & Management Portal
          </div>
          <h1 className="font-display text-2xl font-black text-white uppercase">
            ADMINISTRATOR SIGN IN
          </h1>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-brand-red/10 border border-brand-red/30 text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@stareggs.in"
                className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Secure Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              size="lg"
              icon={loading ? Loader2 : ArrowRight}
              className="w-full justify-center shadow-glow-blue"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-300 transition">
            ← Return to Star Eggs Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
