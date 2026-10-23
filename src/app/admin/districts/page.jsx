'use client';

import { useState, useEffect } from 'react';
import { MapPin, Truck, Check, Edit2, Loader2, Save } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { DISTRICT_STATUSES } from '@/lib/constants';

export default function AdminDistrictsPage() {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingDistrict, setEditingDistrict] = useState(null);
  const [editHub, setEditHub] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchDistricts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/districts');
      const data = await res.json();
      if (data.districts) setDistricts(data.districts);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  const handleStatusChange = async (districtName, newStatus) => {
    try {
      const res = await fetch('/api/districts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ districtName, status: newStatus }),
      });
      if (res.ok) {
        setDistricts((prev) =>
          prev.map((d) => (d.districtName === districtName ? { ...d, status: newStatus } : d))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveHub = async (districtName) => {
    setSaving(true);
    try {
      const res = await fetch('/api/districts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          districtName,
          status: editingDistrict.status,
          coverageHub: editHub,
        }),
      });
      if (res.ok) {
        setDistricts((prev) =>
          prev.map((d) => (d.districtName === districtName ? { ...d, coverageHub: editHub } : d))
        );
        setEditingDistrict(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-black text-white uppercase tracking-tight">
            Telangana District Logistics Coverage (33 Districts)
          </h1>
          <p className="text-xs text-brand-muted mt-0.5">
            Manage public status (Currently Served / Planned Expansion / Enquire Availability) and route hub notes for each district.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 text-brand-blue animate-spin mx-auto" />
          </div>
        ) : (
          <div className="rounded-2xl bg-brand-navy border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-navy-dark text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-4">District</th>
                    <th className="p-4">Public Coverage Status</th>
                    <th className="p-4">Logistics / Route Hub Note</th>
                    <th className="p-4 text-right">Edit Hub</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {districts.map((dist) => {
                    const statusMeta = DISTRICT_STATUSES[dist.status] || DISTRICT_STATUSES.ENQUIRE_AVAILABILITY;
                    const isEditing = editingDistrict?.districtName === dist.districtName;

                    return (
                      <tr key={dist.districtName} className="hover:bg-white/[0.02] transition">
                        <td className="p-4 font-bold text-white">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${statusMeta.dot}`} />
                            <span>{dist.districtName} District</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <select
                            value={dist.status}
                            onChange={(e) => handleStatusChange(dist.districtName, e.target.value)}
                            className="bg-brand-navy-dark border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                          >
                            <option value="CURRENTLY_SERVED">Currently Served</option>
                            <option value="PLANNED_EXPANSION">Planned Expansion</option>
                            <option value="ENQUIRE_AVAILABILITY">
                              Contact us to confirm availability
                            </option>
                          </select>
                        </td>

                        <td className="p-4">
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={editHub}
                                onChange={(e) => setEditHub(e.target.value)}
                                className="bg-brand-navy-dark border border-slate-700 rounded-lg px-3 py-1 text-xs text-white w-full max-w-sm focus:outline-none focus:border-brand-blue"
                              />
                              <button
                                onClick={() => handleSaveHub(dist.districtName)}
                                disabled={saving}
                                className="px-2.5 py-1 rounded-lg bg-brand-blue text-white text-[11px] font-bold"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingDistrict(null)}
                                className="px-2 py-1 text-slate-400 hover:text-white"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-300">
                              {dist.coverageHub || 'N/A'}
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-right">
                          {!isEditing && (
                            <button
                              onClick={() => {
                                setEditingDistrict(dist);
                                setEditHub(dist.coverageHub || '');
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
                              title="Edit Route Note"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
