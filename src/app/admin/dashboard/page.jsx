import { redirect } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Inbox,
  Users,
  MapPin,
  Box,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Download,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { ENQUIRY_STATUSES } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  // Fetch real database counts
  const totalEnquiries = await prisma.enquiry.count();
  const newEnquiries = await prisma.enquiry.count({ where: { status: 'NEW' } });
  const wholesaleEnquiries = await prisma.enquiry.count({ where: { type: 'WHOLESALE' } });
  const retailEnquiries = await prisma.enquiry.count({ where: { type: 'RETAIL' } });

  const totalApplications = await prisma.distributionApplication.count();
  const newApplications = await prisma.distributionApplication.count({ where: { status: 'NEW' } });

  const activeDistricts = await prisma.districtCoverage.count({
    where: { status: 'CURRENTLY_SERVED' },
  });
  const expansionDistricts = await prisma.districtCoverage.count({
    where: { status: 'PLANNED_EXPANSION' },
  });

  const totalProducts = await prisma.product.count();

  // Recent 6 enquiries
  const recentEnquiries = await prisma.enquiry.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <AdminLayout user={session}>
      <div className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              OPERATIONS OVERVIEW
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Live commercial enquiry pipeline, distribution partner network, and Telangana route logistics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/api/enquiries?export=csv"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-navy border border-slate-700/80 text-xs font-bold text-white hover:bg-white/5 transition"
            >
              <Download className="w-3.5 h-3.5 text-brand-blue" />
              <span>Export Enquiries CSV</span>
            </a>
          </div>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-brand-navy border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">New Enquiries</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-brand-blue flex items-center justify-center">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl font-black text-white">{newEnquiries}</div>
            <div className="text-[11px] text-slate-500 flex items-center justify-between">
              <span>Total recorded: {totalEnquiries}</span>
              <span className="text-brand-red font-semibold">{wholesaleEnquiries} wholesale</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-brand-navy border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Partner Applications</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl font-black text-white">{totalApplications}</div>
            <div className="text-[11px] text-slate-500 flex items-center justify-between">
              <span>{newApplications} pending review</span>
              <span className="text-purple-400 font-semibold">Telangana expansion</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-brand-navy border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Active Districts</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl font-black text-white">{activeDistricts}</div>
            <div className="text-[11px] text-slate-500 flex items-center justify-between">
              <span>{expansionDistricts} in planned expansion</span>
              <span className="text-emerald-400 font-semibold">33 total</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-brand-navy border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Catalogued Products</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Box className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl font-black text-white">{totalProducts}</div>
            <div className="text-[11px] text-slate-500 flex items-center justify-between">
              <span>Pulp trays & master cartons</span>
              <span className="text-brand-blue font-semibold">Active</span>
            </div>
          </div>
        </div>

        {/* Recent Enquiries Feed */}
        <div className="rounded-2xl bg-brand-navy border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="font-display text-lg font-bold text-white uppercase">
                Recent Customer Enquiries
              </h2>
              <p className="text-xs text-brand-muted">
                Latest commercial wholesale and retail supply submissions
              </p>
            </div>

            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-brand-blue hover:text-white transition flex items-center gap-1"
            >
              <span>View All Enquiries</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="pb-3">Business / Buyer</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">District</th>
                  <th className="pb-3">Product Required</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentEnquiries.map((enq) => {
                  const statusMeta = ENQUIRY_STATUSES[enq.status] || ENQUIRY_STATUSES.NEW;
                  return (
                    <tr key={enq.id} className="hover:bg-white/[0.02] transition">
                      <td className="py-3.5">
                        <div className="font-bold text-white">{enq.businessName}</div>
                        <div className="text-[10px] text-slate-500">{enq.businessType}</div>
                      </td>
                      <td className="py-3.5">
                        <div className="text-slate-300">{enq.contactPerson}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{enq.phone}</div>
                      </td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                          {enq.type}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <div className="text-white font-medium">{enq.district || 'Hyderabad'}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[120px]">
                          {enq.locality || 'N/A'}
                        </div>
                      </td>
                      <td className="py-3.5">
                        <div className="text-slate-300 truncate max-w-[180px]">
                          {enq.productName}
                        </div>
                        <div className="text-[10px] text-brand-red font-semibold">
                          {enq.estimatedVolume}
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${statusMeta.color}`}
                        >
                          {statusMeta.label}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <Link
                          href={`/admin/enquiries?id=${enq.id}`}
                          className="px-2.5 py-1.5 rounded-lg bg-brand-navy-light hover:bg-brand-blue hover:text-white text-slate-300 text-[11px] font-semibold transition"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
