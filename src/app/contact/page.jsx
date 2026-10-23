'use client';

import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  Copy,
  Check,
  Navigation,
  Store,
  Warehouse,
  Truck,
  Sparkles,
} from 'lucide-react';
import Button from '@/components/common/Button';
import { getWhatsAppLink } from '@/lib/whatsapp';
import ScrollReveal from '@/components/motion/ScrollReveal';
import TiltCard from '@/components/motion/TiltCard';

const GOOGLE_MAPS_LINK =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_LINK || 'https://maps.app.goo.gl/BzzxbCL7VV8kjbS26';
const SHOP_ADDRESS =
  'Commercial Complex, Market Road, Near Old Bus Stand, Adilabad, Telangana 504001';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    district: 'Adilabad',
    additionalNotes: '',
    website_fax_honey: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(SHOP_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy address', e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.contactPerson.trim() || !formData.phone.trim()) {
      setError('Please provide your name and phone number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          businessName: formData.businessName || formData.contactPerson,
          type: 'QUICK_CONTACT',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message.');

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Error sending message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24 bg-brand-navy min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy-light border border-slate-700/60 text-xs font-bold uppercase tracking-widest text-brand-blue">
            <Phone className="w-3.5 h-3.5" />
            <span>COMMERCIAL DISPATCH DESK</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-tight">
            CONNECT WITH{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">
              STAR EGGS.
            </span>
          </h1>

          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            Have a wholesale requirement, retail route enquiry, or regional distribution question? Get in touch with our Adilabad operations team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Commercial Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-brand-navy-dark border border-slate-800 p-8 space-y-6">
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800">
                Direct Contact Channels
              </h3>

              <div className="space-y-4">
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || '+919876543210'}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-brand-navy border border-slate-800 hover:border-brand-blue transition group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/15 text-brand-blue flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-brand-muted">Phone Dispatch Desk</div>
                    <div className="text-sm font-bold text-white">
                      {process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 98765 43210'}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Click to call directly</div>
                  </div>
                </a>

                <a
                  href={getWhatsAppLink({ type: 'GENERAL' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-brand-navy border border-slate-800 hover:border-emerald-500/50 transition group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs text-brand-muted">WhatsApp Commercial Desk</div>
                    <div className="text-sm font-bold text-emerald-400">
                      Chat on WhatsApp
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Quick rate & route verification</div>
                  </div>
                </a>

                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || 'enquiry@stareggs.in'}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-brand-navy border border-slate-800 hover:border-brand-blue transition group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/15 text-brand-blue flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-brand-muted">Official Enquiries Email</div>
                    <div className="text-sm font-bold text-white">
                      {process.env.NEXT_PUBLIC_EMAIL || 'enquiry@stareggs.in'}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">For corporate vendor onboarding</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Operations Schedule & Location */}
            <div className="rounded-2xl bg-brand-navy-dark border border-slate-800 p-8 space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">
                    Warehouse & Dispatch Hours
                  </div>
                  <div className="text-xs text-brand-muted mt-1 leading-relaxed">
                    Monday – Saturday: 5:00 AM – 8:00 PM IST
                    <br />
                    Sunday: 5:00 AM – 1:00 PM IST (Morning Fleet Only)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-800">
                <MapPin className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-white">
                      Head Office & Registered Commercial Hub
                    </div>
                    <div className="text-xs text-brand-muted mt-1 leading-relaxed">
                      {SHOP_ADDRESS}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href={GOOGLE_MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-red/15 hover:bg-brand-red text-brand-red hover:text-white border border-brand-red/30 text-xs font-bold transition shadow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open in Google Maps</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-700/80 text-xs font-medium transition"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-brand-navy-dark border border-slate-800 p-8 sm:p-10 shadow-2xl">
              <div className="space-y-2 pb-6 border-b border-slate-800 mb-6">
                <h3 className="font-display text-xl font-bold text-white uppercase tracking-wider">
                  Send a Message to the Commercial Team
                </h3>
                <p className="text-xs text-brand-muted">
                  We respond promptly to commercial and distribution enquiries.
                </p>
              </div>

              {success ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-white">
                    MESSAGE SENT SUCCESSFULLY
                  </h4>
                  <p className="text-xs text-brand-muted max-w-md mx-auto">
                    Thank you. Our dispatch coordinator will review your note and contact you on{' '}
                    <strong>{formData.phone}</strong> shortly.
                  </p>
                  <Button
                    onClick={() => {
                      setSuccess(false);
                      setFormData({ businessName: '', contactPerson: '', phone: '', email: '', district: 'Adilabad', additionalNotes: '', website_fax_honey: '' });
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Send Another Note
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      name="website_fax_honey"
                      type="text"
                      value={formData.website_fax_honey}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {error && (
                    <div className="p-3.5 rounded-xl bg-brand-red/10 border border-brand-red/30 text-xs text-red-400">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        required
                        placeholder="e.g. S. Kumar"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Business / Store Name
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        placeholder="e.g. Kumar Stores"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. +91 98490 12345"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="e.g. name@domain.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Message / Enquiry Details *
                    </label>
                    <textarea
                      rows={4}
                      name="additionalNotes"
                      required
                      placeholder="Describe your requirement, delivery area, or questions for our team..."
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      variant="primary"
                      size="lg"
                      icon={loading ? Loader2 : ArrowUpRight}
                      className="w-full justify-center shadow-glow-blue"
                    >
                      {loading ? 'Submitting...' : 'Send Message to Operations Desk'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Full-Width Shop & Commercial Hub Location Showcase */}
        <ScrollReveal direction="up" delay={0.2} className="mt-20">
          <div className="rounded-3xl bg-brand-navy-dark border border-brand-blue/30 overflow-hidden shadow-2xl relative">
            {/* Ambient Lighting Gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="p-8 sm:p-12 lg:p-14 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Details Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy border border-brand-blue/40 text-xs font-bold uppercase tracking-widest text-brand-blue">
                    <Store className="w-3.5 h-3.5 text-brand-red" />
                    <span>REGISTERED COMMERCIAL HUB & SHOP</span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
                    VISIT OUR ADILABAD{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-400 to-white">
                      HQ & DISPATCH HUB.
                    </span>
                  </h2>

                  <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
                    Centrally situated in the commercial market zone of Adilabad with direct road access for transport vehicles, trader pickups, and scheduled morning fleet loading.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 text-xs">
                    <div className="p-4 rounded-xl bg-brand-navy border border-slate-800 space-y-1">
                      <div className="font-bold text-white flex items-center gap-2">
                        <Truck className="w-4 h-4 text-brand-blue" />
                        <span>Daily Fleet Dispatch</span>
                      </div>
                      <p className="text-slate-400">Early morning 5:00 AM dispatch routes across northern Telangana and highway connections.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-brand-navy border border-slate-800 space-y-1">
                      <div className="font-bold text-white flex items-center gap-2">
                        <Warehouse className="w-4 h-4 text-emerald-400" />
                        <span>Wholesale Walk-In Desk</span>
                      </div>
                      <p className="text-slate-400">Direct spot purchasing for local retailers, bakeries, and bulk egg stockists.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-brand-navy border border-slate-800 space-y-1">
                      <div className="font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-brand-red" />
                        <span>Candling & Grading</span>
                      </div>
                      <p className="text-slate-400">On-site optical inspection ensuring zero hairline cracks and consistent weight calibration.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-brand-navy border border-slate-800 space-y-1">
                      <div className="font-bold text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>Operating Hours</span>
                      </div>
                      <p className="text-slate-400">Monday to Saturday: 5 AM – 8 PM | Sunday: 5 AM – 1 PM (Fleet Dispatch).</p>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Button
                      href={GOOGLE_MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="red"
                      size="lg"
                      icon="arrow-up-right"
                      className="shadow-glow-red"
                    >
                      Open in Google Maps
                    </Button>

                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-brand-navy border border-slate-700/80 hover:border-brand-blue text-sm font-bold text-white transition hover:bg-white/5"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">Address Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-400" />
                          <span>Copy Full Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Map Graphic Preview Card */}
                <div className="lg:col-span-5">
                  <TiltCard className="rounded-2xl bg-brand-navy border border-slate-800 p-6 space-y-5 overflow-hidden hover:border-brand-blue/50">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          Verified GPS Location
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-brand-blue">
                        19.6641° N, 78.5320° E
                      </span>
                    </div>

                    {/* Stylized Dark Grid Map Canvas Visual */}
                    <div className="relative h-64 rounded-xl bg-gradient-to-b from-brand-navy-dark via-brand-navy to-brand-navy-dark border border-slate-800/80 overflow-hidden flex items-center justify-center p-4">
                      {/* Grid Lines */}
                      <div
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                          backgroundImage:
                            'linear-gradient(to right, rgba(23,75,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,75,255,0.3) 1px, transparent 1px)',
                          backgroundSize: '24px 24px',
                        }}
                      />

                      {/* Concentric Radar Rings */}
                      <div className="absolute w-44 h-44 rounded-full border border-brand-blue/20 pointer-events-none" />
                      <div className="absolute w-28 h-28 rounded-full border border-brand-red/30 pointer-events-none animate-ping" />
                      <div className="absolute w-28 h-28 rounded-full border border-brand-blue/40 pointer-events-none" />

                      {/* Map Pin Center */}
                      <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-brand-red shadow-glow-red flex items-center justify-center text-white font-black text-lg border border-red-300">
                          <MapPin className="w-6 h-6 animate-bounce" />
                        </div>
                        <div className="px-3 py-1 rounded-full bg-brand-navy-dark/90 border border-slate-700 text-xs font-bold text-white shadow-xl backdrop-blur-md">
                          STAR EGGS HEAD OFFICE
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Near Old Bus Stand, Market Road, Adilabad
                        </span>
                      </div>
                    </div>

                    {/* Direct Quick Link */}
                    <a
                      href={GOOGLE_MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-xl bg-brand-navy-dark border border-slate-700/80 hover:border-brand-red text-xs text-slate-300 hover:text-white transition group"
                    >
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-brand-red group-hover:scale-110 transition-transform" />
                        <span className="font-semibold">Get Navigation Directions</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  </TiltCard>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
