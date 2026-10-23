'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Network, CheckCircle2, Truck, Warehouse, ArrowUpRight, ShieldCheck, AlertCircle, MessageCircle, Loader2 } from 'lucide-react';
import { TELANGANA_DISTRICTS } from '@/lib/constants';
import Button from '@/components/common/Button';
import { getWhatsAppLink } from '@/lib/whatsapp';

export default function DistributionPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    applicantName: '',
    phone: '',
    whatsapp: '',
    email: '',
    preferredDistricts: 'Warangal',
    coldStorageCapacity: '',
    deliveryFleet: '',
    currentExperience: '',
    monthlyDemandEstimated: '',
    website_fax_honey: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.businessName.trim() || !formData.applicantName.trim()) {
      setError('Please provide business and applicant names.');
      return;
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/distribution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit partner application.');
      }

      setSuccess(data);
    } catch (err) {
      setError(err.message || 'Error submitting application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24 bg-brand-navy min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy-light border border-brand-blue/40 text-xs font-bold uppercase tracking-widest text-brand-blue">
            <Network className="w-3.5 h-3.5 text-brand-red" />
            <span>TELANGANA REGIONAL EXPANSION INITIATIVE</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-tight">
            BECOME A STAR EGGS{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">
              DISTRIBUTION PARTNER.
            </span>
          </h1>

          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            We are partnering with established FMCG distributors, poultry stockists, and logistics operators to build the most dependable, high-velocity egg supply infrastructure across all districts of Telangana.
          </p>

          <div className="p-4 rounded-xl bg-brand-navy-dark border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
            <span>
              <strong>Commercial Note:</strong> Distribution partnerships are subject to operational infrastructure review, warehousing readiness, and territory viability. Star Eggs does not promise guaranteed exclusivity or returns; partnerships are commercial supply contracts.
            </span>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 rounded-2xl bg-brand-navy-dark border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-navy border border-slate-700 flex items-center justify-center text-brand-blue">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-white uppercase">
              Direct Highway Fleet Delivery
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Consignments are loaded directly at primary facilities and routed via scheduled trucks to your regional depot with minimum transit touchpoints.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-brand-navy-dark border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-navy border border-slate-700 flex items-center justify-center text-emerald-400">
              <Warehouse className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-white uppercase">
              Primary Wholesale Margins
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Access Tier-1 primary wholesale commercial rates, allowing your business to profitably supply local kirana networks, bakeries, and food businesses.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-brand-navy-dark border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-navy border border-slate-700 flex items-center justify-center text-brand-red">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-white uppercase">
              Packaging & Quality Assurance
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Pre-candled, uniform grade-A stock delivered in shock-absorbing pulp trays and double-walled cartons engineered to safeguard transit value.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-4xl mx-auto">
          {success ? (
            <div className="rounded-3xl bg-brand-navy-dark border border-emerald-500/40 p-8 sm:p-12 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase">
                  APPLICATION RECEIVED!
                </h2>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Thank you, <strong>{formData.applicantName}</strong>. Your distribution application for{' '}
                  <strong>{formData.businessName}</strong> covering <strong>{formData.preferredDistricts}</strong> has been logged.
                </p>
                <div className="inline-block px-4 py-2 rounded-xl bg-brand-navy border border-slate-700 font-mono text-sm font-bold text-brand-blue mt-2">
                  APPLICATION REF #{success.referenceId}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-brand-navy border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-white">Next Steps:</div>
                <p className="text-slate-400">
                  Our regional expansion coordinator will evaluate your storage capacity and vehicle capabilities. A verification call will be scheduled within 2 business days.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={getWhatsAppLink({
                    type: 'DISTRIBUTION',
                    businessName: formData.businessName,
                    district: formData.preferredDistricts,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 rounded-xl text-sm font-bold shadow-lg transition"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Notify via WhatsApp</span>
                </a>

                <Button
                  onClick={() => setSuccess(null)}
                  variant="outline"
                  size="md"
                >
                  Submit Another Application
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-brand-navy-dark/95 border border-slate-800/90 p-6 sm:p-10 shadow-2xl space-y-8"
            >
              {/* Anti-spam honeypot */}
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

              <div className="space-y-2 pb-4 border-b border-slate-800">
                <h3 className="font-display text-xl font-bold text-white uppercase tracking-wider">
                  Distribution Partnership Application
                </h3>
                <p className="text-xs text-brand-muted">
                  Provide verifiable details regarding your commercial operations in Telangana.
                </p>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-brand-red/10 border border-brand-red/30 text-xs text-red-400">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Trading / Firm / Company Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    placeholder="e.g. Kakatiya Agro Traders"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Managing Partner / Applicant Name *
                  </label>
                  <input
                    type="text"
                    name="applicantName"
                    required
                    placeholder="e.g. Ramesh Reddy"
                    value={formData.applicantName}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Primary Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +91 94400 98765"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="e.g. +91 94400 98765"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Business Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. distributor@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Target Telangana District(s) *
                  </label>
                  <select
                    name="preferredDistricts"
                    value={formData.preferredDistricts}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-blue"
                  >
                    {TELANGANA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d} District
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Warehouse / Covered Storage Capacity
                  </label>
                  <input
                    type="text"
                    name="coldStorageCapacity"
                    placeholder="e.g. 2,000 sq ft covered godown with ventilation"
                    value={formData.coldStorageCapacity}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Delivery Vehicles / Fleet in Operation
                  </label>
                  <input
                    type="text"
                    name="deliveryFleet"
                    placeholder="e.g. 2 Tata Ace, 1 Ashok Leyland Dost commercial vehicles"
                    value={formData.deliveryFleet}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Current Distribution Experience & Existing Retail Accounts
                  </label>
                  <textarea
                    rows={2}
                    name="currentExperience"
                    placeholder="Briefly describe your existing distribution network (e.g. 10 years in FMCG / Dairy supplying 150+ retailers)..."
                    value={formData.currentExperience}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Expected Monthly Demand Volume (Estimated)
                  </label>
                  <input
                    type="text"
                    name="monthlyDemandEstimated"
                    placeholder="e.g. 8,000 Trays (240,000 Eggs) per month"
                    value={formData.monthlyDemandEstimated}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Applications are reviewed by Star Eggs operations management.
                </span>

                <Button
                  type="submit"
                  disabled={loading}
                  variant="primary"
                  size="lg"
                  icon={loading ? Loader2 : ArrowUpRight}
                  className="w-full sm:w-auto shadow-glow-blue"
                >
                  {loading ? 'Submitting Application...' : 'Submit Partner Application'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
