'use client';

import { useMemo, useState } from 'react';
import { Edit, Eye, Package2, Plus, Search, SlidersHorizontal, Trash2 } from 'lucide-react';
import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Active' | 'Draft' | 'Out of Stock';
  image: string;
};

const demoProducts: Product[] = [
  {
    id: 'P-1001',
    name: 'Rose Gift Box',
    category: 'Romantic',
    price: 34,
    stock: 18,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'P-1002',
    name: 'Custom Mug Set',
    category: 'Personalized',
    price: 22,
    stock: 8,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'P-1003',
    name: 'Anniversary Frame',
    category: 'Couple',
    price: 41,
    stock: 0,
    status: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'P-1004',
    name: 'Birthday Surprise Pack',
    category: 'Birthday',
    price: 28,
    stock: 12,
    status: 'Draft',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'P-1005',
    name: 'Luxury Candle Gift',
    category: 'Premium',
    price: 19,
    stock: 24,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'P-1006',
    name: 'Love Letter Jar',
    category: 'Romantic',
    price: 26,
    stock: 15,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=300&q=80',
  },
];

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Product['status']>('All');

  const filteredProducts = useMemo(() => {
    return demoProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === 'All' ? true : product.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalProducts = demoProducts.length;
  const activeProducts = demoProducts.filter((p) => p.status === 'Active').length;
  const draftProducts = demoProducts.filter((p) => p.status === 'Draft').length;
  const outOfStockProducts = demoProducts.filter((p) => p.status === 'Out of Stock').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="overflow-hidden rounded-4xl border border-white/60 bg-linear-to-br from-rose-100 via-white to-violet-100 p-5 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">Admin Panel</p>
            <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl">Manage Products</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              Add, edit, organize, and monitor all store products from one polished admin workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-50">
              <SlidersHorizontal className="size-4" />
              Bulk Actions
            </button>

            <button className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-primary to-fuchsia-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5">
              <Plus className="size-4" />
              Add Product
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[28px] border border-rose-200/70 bg-linear-to-br from-rose-100 to-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Total Products</p>
            <Package2 className="size-5 text-slate-400" />
          </div>
          <p className="mt-4 text-3xl font-black tracking-tight text-slate-900">{totalProducts}</p>
        </div>

        <div className="rounded-[28px] border border-orange-200/70 bg-linear-to-br from-orange-100 to-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Active Products</p>
            <Package2 className="size-5 text-slate-400" />
          </div>
          <p className="mt-4 text-3xl font-black tracking-tight text-slate-900">{activeProducts}</p>
        </div>

        <div className="rounded-[28px] border border-violet-200/70 bg-linear-to-br from-violet-100 to-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Draft Items</p>
            <Package2 className="size-5 text-slate-400" />
          </div>
          <p className="mt-4 text-3xl font-black tracking-tight text-slate-900">{draftProducts}</p>
        </div>

        <div className="rounded-[28px] border border-slate-200/70 bg-linear-to-br from-slate-100 to-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Out of Stock</p>
            <Package2 className="size-5 text-slate-400" />
          </div>
          <p className="mt-4 text-3xl font-black tracking-tight text-slate-900">{outOfStockProducts}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-[28px] border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur md:p-5">
        <div className="flex flex-col md:flex-row justify-between gap-4 ">
          <div className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50/60 px-4 py-3 flex-1">
            <Search className="size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by product name, category, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setStatusFilter('All')}
              className={`rounded-2xl px-4 py-2.5 text-sm font-bold transition ${
                statusFilter === 'All'
                  ? 'bg-linear-to-r from-primary to-fuchsia-500 text-white shadow-md shadow-primary/20'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              All
            </button>

            {(['Active', 'Draft', 'Out of Stock'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`rounded-2xl px-4 py-2.5 text-sm font-bold transition ${
                  statusFilter === status
                    ? 'bg-linear-to-r from-primary to-fuchsia-500 text-white shadow-md shadow-primary/20'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop table */}
      <section className="hidden overflow-hidden rounded-4xl border border-white/60 bg-white/85 shadow-sm xl:block">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-xl font-black text-slate-900">Product List</h2>
          <p className="mt-1 text-sm text-slate-500">
            Showing {filteredProducts.length} of {demoProducts.length} products
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-xs uppercase tracking-[0.16em] text-slate-400">
                <th className="bg-transparent px-6 py-4">Product</th>
                <th className="bg-transparent px-6 py-4">Category</th>
                <th className="bg-transparent px-6 py-4">Price</th>
                <th className="bg-transparent px-6 py-4">Stock</th>
                <th className="bg-transparent px-6 py-4">Status</th>
                <th className="bg-transparent px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-slate-100 hover:bg-rose-50/40">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="size-14 rounded-2xl object-cover ring-1 ring-slate-100"
                      />
                      <div>
                        <p className="text-sm font-black text-slate-900">{product.name}</p>
                        <p className="mt-1 text-xs font-medium text-slate-500">{product.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">${product.price}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{product.stock}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-2 text-xs font-black ${
                        product.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : product.status === 'Draft'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                        <Eye className="size-4" />
                        View
                      </button>

                      <button className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-bold text-violet-700 transition hover:bg-violet-100">
                        <Edit className="size-4" />
                        Edit
                      </button>

                      <button className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-100">
                        <Trash2 className="size-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile / Tablet cards */}
      <section className="grid gap-4 xl:hidden">
        {filteredProducts.map((product) => (
          <div key={product.id} className="rounded-[28px] border border-white/60 bg-white/90 p-4 shadow-sm sm:p-5">
            {/* Top row */}
            <div className="flex items-start gap-3 sm:gap-4">
              <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                className="size-18 shrink-0 rounded-2xl object-cover ring-1 ring-slate-100 sm:size-20"
              />

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-black text-slate-900 sm:text-lg">{product.name}</h3>
                <p className="mt-1 text-xs font-medium text-slate-500">{product.id}</p>

                <div className="mt-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-2 text-xs font-black ${
                      product.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : product.status === 'Draft'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-3 sm:grid-cols-3">
              <div className="rounded-xl bg-white px-3 py-3 text-center">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Category</p>
                <p className="mt-1 truncate text-sm font-bold text-slate-700">{product.category}</p>
              </div>

              <div className="rounded-xl bg-white px-3 py-3 text-center">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Price</p>
                <p className="mt-1 text-sm font-bold text-slate-700">${product.price}</p>
              </div>

              <div className="col-span-2 rounded-xl bg-white px-3 py-3 text-center sm:col-span-1">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Stock</p>
                <p className="mt-1 text-sm font-bold text-slate-700">{product.stock}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                <Eye className="size-4" />
                View
              </button>

              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2.5 text-sm font-bold text-violet-700 transition hover:bg-violet-100">
                <Edit className="size-4" />
                Edit
              </button>

              <button className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-bold text-rose-700 transition hover:bg-rose-100 sm:col-span-1">
                <Trash2 className="size-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
