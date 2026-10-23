'use client';

import { useState, useEffect } from 'react';
import { Users, Download, Trash2, MapPin, Warehouse, Truck, Loader2, CheckCircle2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminDistributorsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/distribution');
      const data = await res.json();
      if (data.applications) setApplications(data.applications);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`/api/distribution/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status } : a))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      const res = await fetch(`/api/distribution/${id}`, { method: 'DELETE' });
      if (res.ok) setApplications((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-black text-white uppercase tracking-tight">
              Distribution Partner Applications
            </h1>
            <p className="text-xs text-brand-muted mt-0.5">
              Review logistics operators, regional stockists, and district partner candidates across Telangana.
            </p>
          </div>

          <a
            href="/api/distribution?export=csv"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-navy border border-slate-700/80 text-xs font-bold text-white hover:bg-white/5 transition"
          >
            <Download className="w-3.5 h-3.5 text-brand-blue" />
            <span>Export Applications CSV</span>
          </a>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 text-brand-blue animate-spin mx-auto" />
          </div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-brand-navy border border-slate-800 text-brand-muted text-xs">
            No partner applications logged yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="p-6 rounded-2xl bg-brand-navy border border-slate-800 space-y-4 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                      Partner Candidate
                    </span>
                    <h3 className="font-display text-lg font-bold text-white">
                      {app.businessName}
                    </h3>
                    <div className="text-xs text-slate-400">
                      {app.applicantName} • {app.phone}
                    </div>
                  </div>

                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className="bg-brand-navy-dark border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                  >
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="IN_REVIEW">In Review</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>

                <div className="space-y-2 text-xs py-3 border-y border-slate-800/80">
                  <div className="flex items-start gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Districts:</strong> {app.preferredDistricts}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-slate-300">
                    <Warehouse className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Storage:</strong> {app.coldStorageCapacity}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-slate-300">
                    <Truck className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Vehicles:</strong> {app.deliveryFleet}
                    </span>
                  </div>

                  <div className="pt-1 text-slate-400">
                    <strong>Experience:</strong> {app.currentExperience}
                  </div>
                  <div className="text-slate-400">
                    <strong>Estimated Monthly Demand:</strong> {app.monthlyDemandEstimated}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-[10px] text-slate-500">
                    Applied: {new Date(app.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition text-xs font-semibold"
                    >
                      WhatsApp
                    </a>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="p-1 rounded-lg text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
