'use client';

import { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import Button from '@/components/common/Button';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    BUSINESS_NAME: 'STAR EGGS',
    PRIMARY_PHONE: '+91 98765 43210',
    WHATSAPP_NUMBER: '919876543210',
    CONTACT_EMAIL: 'enquiry@stareggs.in',
    HEAD_OFFICE_ADDRESS: 'Commercial Complex, Market Road, Near Old Bus Stand, Adilabad, Telangana 504001',
    BUSINESS_HOURS: 'Monday - Saturday: 5:00 AM – 8:00 PM IST | Sunday: 5:00 AM – 1:00 PM IST',
    ANNOUNCEMENT_BANNER: 'Serving Adilabad Daily & Expanding Across All 33 Districts of Telangana • Direct Farm Procurement',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.settings && Object.keys(data.settings).length > 0) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="font-display text-2xl font-black text-white uppercase tracking-tight">
            Commercial Business Settings
          </h1>
          <p className="text-xs text-brand-muted mt-0.5">
            Configure public dispatch desk phone numbers, official WhatsApp click-to-chat numbers, registered office address, and top announcement banner.
          </p>
        </div>

        {saved && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings updated successfully in database.</span>
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 text-brand-blue animate-spin mx-auto" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-brand-navy border border-slate-800 p-6 sm:p-8 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Registered Brand / Business Name
                </label>
                <input
                  type="text"
                  value={settings.BUSINESS_NAME}
                  onChange={(e) => handleChange('BUSINESS_NAME', e.target.value)}
                  className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Dispatch Desk Phone
                </label>
                <input
                  type="text"
                  value={settings.PRIMARY_PHONE}
                  onChange={(e) => handleChange('PRIMARY_PHONE', e.target.value)}
                  className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Official WhatsApp Number (digits only, e.g. 919876543210)
                </label>
                <input
                  type="text"
                  value={settings.WHATSAPP_NUMBER}
                  onChange={(e) => handleChange('WHATSAPP_NUMBER', e.target.value)}
                  className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Commercial Enquiries Email
                </label>
                <input
                  type="email"
                  value={settings.CONTACT_EMAIL}
                  onChange={(e) => handleChange('CONTACT_EMAIL', e.target.value)}
                  className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Registered Office & Warehouse Address
                </label>
                <input
                  type="text"
                  value={settings.HEAD_OFFICE_ADDRESS}
                  onChange={(e) => handleChange('HEAD_OFFICE_ADDRESS', e.target.value)}
                  className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Google Maps Store & Hub Location Link
                </label>
                <input
                  type="url"
                  placeholder="https://maps.app.goo.gl/..."
                  value={settings.GOOGLE_MAPS_LINK || ''}
                  onChange={(e) => handleChange('GOOGLE_MAPS_LINK', e.target.value)}
                  className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Warehouse Operations & Dispatch Schedule
                </label>
                <input
                  type="text"
                  value={settings.BUSINESS_HOURS}
                  onChange={(e) => handleChange('BUSINESS_HOURS', e.target.value)}
                  className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Header Announcement Marquee Banner
                </label>
                <input
                  type="text"
                  value={settings.ANNOUNCEMENT_BANNER}
                  onChange={(e) => handleChange('ANNOUNCEMENT_BANNER', e.target.value)}
                  className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <Button
                type="submit"
                disabled={saving}
                variant="primary"
                size="md"
                icon={saving ? Loader2 : Save}
              >
                {saving ? 'Saving...' : 'Save Configuration Changes'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
