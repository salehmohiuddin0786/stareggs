'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowUpRight, CheckCircle2, ShieldAlert, Truck, Box, Phone, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';
import { TELANGANA_DISTRICTS, BUSINESS_TYPES, PACKAGING_OPTIONS, DELIVERY_FREQUENCIES } from '@/lib/constants';
import Button from '@/components/common/Button';
import { getWhatsAppLink } from '@/lib/whatsapp';

function WholesaleFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    whatsapp: '',
    email: '',
    businessType: 'Wholesaler / Bulk Trader',
    district: 'Adilabad',
    locality: '',
    productName: 'Standard White Eggs (30-Egg Tray)',
    estimatedVolume: '',
    packagingPreference: 'Standard Pulp Trays (30 Eggs)',
    deliveryFrequency: 'Daily Morning Supply (Standing Order)',
    expectedStartDate: 'Immediate',
    additionalNotes: '',
    website_fax_honey: '', // Honeypot field for bot traps
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

  // Pre-populate fields from query params if available
  useEffect(() => {
    const productParam = searchParams.get('product');
    const districtParam = searchParams.get('district');
    const typeParam = searchParams.get('type');

    setFormData((prev) => ({
      ...prev,
      ...(productParam && { productName: productParam }),
      ...(districtParam && TELANGANA_DISTRICTS.includes(districtParam) && { district: districtParam }),
      ...(typeParam === 'retailer' && { businessType: 'Retailer / Kirana Shop' }),
      ...(typeParam === 'wholesaler' && { businessType: 'Wholesaler / Bulk Trader' }),
      ...(typeParam === 'institutional' && { businessType: 'Hotel or Restaurant' }),
    }));
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic client validation
    if (!formData.businessName.trim()) {
      setError('Please provide your business or trading entity name.');
      return;
    }
    if (!formData.contactPerson.trim()) {
      setError('Please enter contact person name.');
      return;
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: formData.businessType.includes('Retail') ? 'RETAIL' : 'WHOLESALE',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setSuccessData(data);
      // Also navigate to dedicated success screen after brief delay or offer modal
    } catch (err) {
      setError(err.message || 'Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24 bg-brand-navy min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy-light border border-slate-700/60 text-xs font-bold uppercase tracking-widest text-brand-blue">
            <Truck className="w-3.5 h-3.5" />
            <span>COMMERCIAL PROCUREMENT DESK</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            REQUEST WHOLESALE PRICING{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">
              & REPEAT SUPPLY.
            </span>
          </h1>

          <p className="text-brand-muted text-base leading-relaxed">
            Fill in your commercial requirements below. No account required. Our Adilabad operations desk confirms daily benchmark wholesale rates, delivery slots, and packaging specs within business hours.
          </p>
        </div>

        {/* Success Modal / Banner */}
        {successData ? (
          <div className="rounded-3xl bg-brand-navy-dark border border-emerald-500/40 p-8 sm:p-12 space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase">
                QUOTATION REQUEST REGISTERED!
              </h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                Thank you, <strong>{formData.contactPerson}</strong>. Your enquiry for{' '}
                <strong>{formData.businessName}</strong> in <strong>{formData.district}</strong> has been assigned reference ID:
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-brand-navy border border-slate-700 font-mono text-sm font-bold text-brand-blue mt-2">
                REF #{successData.referenceId}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-brand-navy border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-brand-blue" />
                <span>Next Commercial Steps:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>Our Adilabad operations coordinator will verify daily wholesale rates for your required volume.</li>
                <li>You will receive a call or WhatsApp message on {formData.phone} with current spot pricing.</li>
                <li>Delivery route and morning dispatch schedule will be allocated upon confirmation.</li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={getWhatsAppLink({
                  type: 'WHOLESALE',
                  businessName: formData.businessName,
                  district: formData.district,
                  volume: formData.estimatedVolume || 'Regular Bulk',
                  product: formData.productName,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 rounded-xl text-sm font-bold shadow-lg transition"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send via WhatsApp for Faster Quote</span>
              </a>

              <Button
                onClick={() => {
                  setSuccessData(null);
                  setFormData((prev) => ({ ...prev, businessName: '', contactPerson: '', phone: '', additionalNotes: '' }));
                }}
                variant="outline"
                size="md"
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-brand-navy-dark/95 border border-slate-800/90 p-6 sm:p-10 shadow-2xl space-y-8"
          >
            {/* Honeypot field (hidden from humans, trapped for spam bots) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_fax_honey">Fax Number</label>
              <input
                id="website_fax_honey"
                name="website_fax_honey"
                type="text"
                value={formData.website_fax_honey}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-brand-red/10 border border-brand-red/30 text-xs text-red-400 flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Section 1: Business & Contact Information */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
                1. Business & Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Business / Entity Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    placeholder="e.g. Balaji Traders / Deccan Kitchens"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    required
                    placeholder="e.g. K. Venkatesh"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    WhatsApp Number (if different)
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="e.g. +91 98490 12345"
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
                    placeholder="e.g. purchase@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Business Category *
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-blue"
                  >
                    {BUSINESS_TYPES.map((bt) => (
                      <option key={bt} value={bt}>
                        {bt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Location in Telangana */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
                2. Delivery Location in Telangana
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Select Telangana District *
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-blue font-medium"
                  >
                    {TELANGANA_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist} District
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Locality / Area / Landmark *
                  </label>
                  <input
                    type="text"
                    name="locality"
                    placeholder="e.g. Market Road / Gandhi Chowk / Industrial Area"
                    value={formData.locality}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Product & Volume Specifications */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
                3. Order Specifications & Frequency
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Primary Product Selection *
                  </label>
                  <select
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-blue"
                  >
                    <option value="Standard White Eggs (30-Egg Tray)">
                      Standard White Eggs (30-Egg Pulp Tray)
                    </option>
                    <option value="Commercial Wholesale Carton (210 Eggs)">
                      Commercial Wholesale Carton (7 Trays / 210 Eggs)
                    </option>
                    <option value="Select Table White Eggs (Commercial Crate)">
                      Select Table White Eggs (Commercial Crate)
                    </option>
                    <option value="Farm Fresh Brown Eggs (30-Egg Tray)">
                      Farm Fresh Brown Eggs (30-Egg Tray)
                    </option>
                    <option value="Daily Standing Supply (Hotels & Caterers)">
                      Daily Standing Supply (Hotels & Caterers)
                    </option>
                    <option value="Bakery High-Volume Batch Lot">
                      Industrial Bakery High-Volume Batch Lot
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Estimated Volume / Quantity *
                  </label>
                  <input
                    type="text"
                    name="estimatedVolume"
                    placeholder="e.g. 50 Trays daily or 20 Cartons weekly"
                    value={formData.estimatedVolume}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Packaging Preference
                  </label>
                  <select
                    name="packagingPreference"
                    value={formData.packagingPreference}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-blue"
                  >
                    {PACKAGING_OPTIONS.map((pkg) => (
                      <option key={pkg} value={pkg}>
                        {pkg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Delivery Frequency
                  </label>
                  <select
                    name="deliveryFrequency"
                    value={formData.deliveryFrequency}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-blue"
                  >
                    {DELIVERY_FREQUENCIES.map((df) => (
                      <option key={df} value={df}>
                        {df}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Expected Start Date
                  </label>
                  <input
                    type="text"
                    name="expectedStartDate"
                    placeholder="e.g. Immediate / From next Monday"
                    value={formData.expectedStartDate}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Additional Requirements or Unloading Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    name="additionalNotes"
                    placeholder="Specific delivery timing requirements, dock access notes, or special packaging preferences..."
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    className="w-full bg-brand-navy border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                🔒 Official enquiry submission • Verified directly by dispatch operations.
              </div>

              <Button
                type="submit"
                disabled={loading}
                variant="primary"
                size="lg"
                icon={loading ? Loader2 : ArrowUpRight}
                className="w-full sm:w-auto shadow-glow-blue"
              >
                {loading ? 'Registering Enquiry...' : 'Submit Wholesale Quotation Request'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function WholesalePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-white">Loading Quotation Desk...</div>}>
      <WholesaleFormContent />
    </Suspense>
  );
}
