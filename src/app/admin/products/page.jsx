'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Box, Plus, Trash2, Edit2, Check, AlertCircle, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import Button from '@/components/common/Button';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    description: '',
    unitType: 'Pulp Tray (30 Eggs)',
    minOrderQty: '10 Trays',
    availabilityStatus: 'IN_STOCK',
    imageUrl: '/images/products/egg-tray.svg',
  });
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.products) setProducts(data.products);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          categoryId: products[0]?.categoryId || 'default',
        }),
      });
      if (res.ok) {
        setShowAddModal(false);
        fetchProducts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleStatus = async (id, current) => {
    const nextStatus = current === 'IN_STOCK' ? 'ORDER_ONLY' : 'IN_STOCK';
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ availabilityStatus: nextStatus }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, availabilityStatus: nextStatus } : p))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) setProducts((prev) => prev.filter((p) => p.id !== id));
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
              Product Catalogue Management
            </h1>
            <p className="text-xs text-brand-muted mt-0.5">
              Control commercial packaging specs, minimum order quantities (MOQ), and daily stock availability.
            </p>
          </div>

          <Button
            onClick={() => setShowAddModal(true)}
            variant="primary"
            size="sm"
            icon={Plus}
          >
            Add New Product
          </Button>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 text-brand-blue animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="rounded-2xl bg-brand-navy border border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
              >
                <div className="space-y-3">
                  <div className="relative h-40 rounded-xl bg-brand-navy-dark border border-slate-800 flex items-center justify-center p-3 overflow-hidden">
                    <Image
                      src={prod.imageUrl || '/images/products/egg-tray.svg'}
                      alt={prod.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold text-white">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-brand-muted line-clamp-2 mt-1">
                      {prod.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs py-2 border-y border-slate-800/80">
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-500">Packaging:</span>
                      <span className="font-semibold">{prod.unitType}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-500">MOQ:</span>
                      <span className="font-semibold text-brand-red">{prod.minOrderQty}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => handleToggleStatus(prod.id, prod.availabilityStatus)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border transition ${
                      prod.availabilityStatus === 'IN_STOCK'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {prod.availabilityStatus === 'IN_STOCK' ? 'In Stock' : 'Order Only'}
                  </button>

                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Product Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-lg bg-brand-navy border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="font-display text-lg font-bold text-white uppercase">
                Add Commercial Product
              </h3>

              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Premium White Eggs (30-Egg Tray)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe packaging protection, egg grading, and retail application..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Packaging Unit
                    </label>
                    <input
                      type="text"
                      value={formData.unitType}
                      onChange={(e) => setFormData({ ...formData, unitType: e.target.value })}
                      className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Minimum Order (MOQ)
                    </label>
                    <input
                      type="text"
                      value={formData.minOrderQty}
                      onChange={(e) => setFormData({ ...formData, minOrderQty: e.target.value })}
                      className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <Button
                    onClick={() => setShowAddModal(false)}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Save Product
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
