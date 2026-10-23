'use client';

import { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageCircle,
  X,
  CheckCircle2,
  Trash2,
  Edit3,
  Loader2,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { ENQUIRY_STATUSES } from '@/lib/constants';
import Button from '@/components/common/Button';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [internalNoteText, setInternalNoteText] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter !== 'ALL') params.append('status', statusFilter);
      if (typeFilter !== 'ALL') params.append('type', typeFilter);

      const res = await fetch(`/api/enquiries?${params.toString()}`);
      const data = await res.json();
      if (data.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter, typeFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      const res = await fetch(`/api/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === enquiryId ? { ...item, status: newStatus } : item))
        );
        if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
          setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          internalNotes: internalNoteText,
          actionNote: 'Internal dispatch notes updated by administrator.',
        }),
      });
      if (res.ok) {
        setSelectedEnquiry((prev) => ({ ...prev, internalNotes: internalNoteText }));
        setEnquiries((prev) =>
          prev.map((item) =>
            item.id === selectedEnquiry.id ? { ...item, internalNotes: internalNoteText } : item
          )
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-black text-white uppercase tracking-tight">
              Customer Enquiries & Quotations
            </h1>
            <p className="text-xs text-brand-muted mt-0.5">
              Manage incoming wholesale pricing requests, retail supply contracts, and dispatch statuses.
            </p>
          </div>

          <a
            href="/api/enquiries?export=csv"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-navy border border-slate-700/80 text-xs font-bold text-white hover:bg-white/5 transition"
          >
            <Download className="w-3.5 h-3.5 text-brand-blue" />
            <span>Download Enquiries CSV</span>
          </a>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl bg-brand-navy border border-slate-800 space-y-3">
          <div className="flex flex-col lg:flex-row items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="flex-1 w-full relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by business name, contact person, phone, or district..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl pl-9 pr-24 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-brand-blue text-white text-[11px] font-bold"
              >
                Search
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-brand-navy-dark border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
              >
                <option value="ALL">All Statuses</option>
                {Object.keys(ENQUIRY_STATUSES).map((st) => (
                  <option key={st} value={st}>
                    {ENQUIRY_STATUSES[st].label}
                  </option>
                ))}
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-brand-navy-dark border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
              >
                <option value="ALL">All Types</option>
                <option value="WHOLESALE">Wholesale</option>
                <option value="RETAIL">Retail</option>
                <option value="QUICK_CONTACT">Quick Contact</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="rounded-2xl bg-brand-navy border border-slate-800 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center space-y-2">
              <Loader2 className="w-8 h-8 text-brand-blue animate-spin mx-auto" />
              <p className="text-xs text-brand-muted">Loading enquiries pipeline...</p>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="py-20 text-center space-y-2">
              <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-sm font-bold text-white">No enquiries found</div>
              <p className="text-xs text-brand-muted">Try adjusting search or status filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-navy-dark text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-4">Reference & Date</th>
                    <th className="p-4">Business / Buyer</th>
                    <th className="p-4">Phone / WhatsApp</th>
                    <th className="p-4">District / Area</th>
                    <th className="p-4">Product & Volume</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {enquiries.map((enq) => {
                    const statusMeta = ENQUIRY_STATUSES[enq.status] || ENQUIRY_STATUSES.NEW;
                    return (
                      <tr key={enq.id} className="hover:bg-white/[0.02] transition">
                        <td className="p-4">
                          <div className="font-mono text-[11px] font-bold text-brand-blue">
                            #{enq.id.slice(0, 8)}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-white">{enq.businessName}</div>
                          <div className="text-[10px] text-slate-400">
                            {enq.contactPerson} • {enq.businessType}
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="font-mono text-white">{enq.phone}</div>
                          {enq.whatsapp && (
                            <a
                              href={`https://wa.me/${enq.whatsapp.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
                            >
                              <span>WhatsApp Chat</span>
                            </a>
                          )}
                        </td>

                        <td className="p-4">
                          <div className="text-white font-medium">{enq.district || 'Adilabad'}</div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[130px]">
                            {enq.locality || 'N/A'}
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="text-slate-300 truncate max-w-[170px]">
                            {enq.productName}
                          </div>
                          <div className="text-[10px] text-brand-red font-semibold">
                            {enq.estimatedVolume || 'Standard Bulk'}
                          </div>
                        </td>

                        <td className="p-4">
                          <select
                            value={enq.status}
                            onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase border bg-brand-navy-dark focus:outline-none ${statusMeta.color}`}
                          >
                            {Object.keys(ENQUIRY_STATUSES).map((st) => (
                              <option key={st} value={st} className="bg-brand-navy text-white">
                                {ENQUIRY_STATUSES[st].label}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setSelectedEnquiry(enq);
                              setInternalNoteText(enq.internalNotes || '');
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-brand-navy-light hover:bg-brand-blue hover:text-white text-slate-300 text-[11px] font-semibold transition"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => handleDelete(enq.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Modal / Drawer */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-2xl bg-brand-navy border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                    Enquiry Details • REF #{selectedEnquiry.id}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">
                    {selectedEnquiry.businessName}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid Specifications */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500">Contact Person:</span>
                  <div className="font-semibold text-white">{selectedEnquiry.contactPerson}</div>
                </div>

                <div>
                  <span className="text-slate-500">Phone & WhatsApp:</span>
                  <div className="font-semibold text-white font-mono">
                    {selectedEnquiry.phone} {selectedEnquiry.whatsapp ? `• WA: ${selectedEnquiry.whatsapp}` : ''}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500">Business Classification:</span>
                  <div className="font-semibold text-white">{selectedEnquiry.businessType}</div>
                </div>

                <div>
                  <span className="text-slate-500">Delivery District & Locality:</span>
                  <div className="font-semibold text-white">
                    {selectedEnquiry.district} {selectedEnquiry.locality ? `(${selectedEnquiry.locality})` : ''}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500">Product Required:</span>
                  <div className="font-semibold text-brand-blue">{selectedEnquiry.productName}</div>
                </div>

                <div>
                  <span className="text-slate-500">Estimated Demand Volume:</span>
                  <div className="font-semibold text-brand-red">{selectedEnquiry.estimatedVolume}</div>
                </div>

                <div>
                  <span className="text-slate-500">Packaging Preference:</span>
                  <div className="font-semibold text-white">{selectedEnquiry.packagingPreference}</div>
                </div>

                <div>
                  <span className="text-slate-500">Delivery Frequency:</span>
                  <div className="font-semibold text-white">{selectedEnquiry.deliveryFrequency}</div>
                </div>

                <div className="col-span-2">
                  <span className="text-slate-500">Customer Additional Notes:</span>
                  <div className="p-3 rounded-xl bg-brand-navy-dark border border-slate-800 text-slate-300 mt-1">
                    {selectedEnquiry.additionalNotes || 'No special unloading instructions provided.'}
                  </div>
                </div>
              </div>

              {/* Internal Notes Editor */}
              <div className="space-y-2 pt-4 border-t border-slate-800">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Internal Operations Notes:
                </label>
                <textarea
                  rows={3}
                  value={internalNoteText}
                  onChange={(e) => setInternalNoteText(e.target.value)}
                  placeholder="Record call logs, quoted prices, route allocations, or delivery instructions..."
                  className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue resize-none"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveNotes}
                    disabled={updating}
                    variant="primary"
                    size="sm"
                  >
                    {updating ? 'Saving...' : 'Save Internal Note'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
