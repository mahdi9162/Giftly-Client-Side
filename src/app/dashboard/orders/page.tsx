'use client';

import React, { useState } from 'react';
import { Eye, Package, Search, Truck, Clock3, CheckCircle2, ChevronDown, SlidersHorizontal } from 'lucide-react';

const orders = [
  {
    id: '#GF-1024',
    date: 'Apr 2, 2026',
    items: 2,
    amount: '$84.00',
    payment: 'Paid',
    status: 'Pending',
  },
  {
    id: '#GF-1023',
    date: 'Apr 1, 2026',
    items: 1,
    amount: '$120.00',
    payment: 'Paid',
    status: 'Delivered',
  },
  {
    id: '#GF-1022',
    date: 'Mar 30, 2026',
    items: 3,
    amount: '$58.00',
    payment: 'Unpaid',
    status: 'Processing',
  },
  {
    id: '#GF-1021',
    date: 'Mar 28, 2026',
    items: 1,
    amount: '$42.00',
    payment: 'Paid',
    status: 'Delivered',
  },
];

const UserOrders = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
              Order History
            </p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">My Orders</h1>
            <p className="mt-2 text-sm text-slate-500 md:text-base">Track all your orders, payment status, and recent deliveries.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
              Total Orders: <span className="font-semibold text-slate-900">12</span>
            </div>
            <div className="rounded-2xl bg-linear-to-r from-rose-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/50">
              4 Delivered
            </div>
          </div>
        </div>
      </section>

      {/* Order Summary Cards */}
      <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50">
              <Package className="h-5 w-5 text-rose-500" />
            </div>
            <span className="text-xs text-slate-400">Total</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-slate-900">12</h3>
          <p className="text-sm text-slate-500">Orders placed</p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50">
              <Clock3 className="h-5 w-5 text-amber-500" />
            </div>
            <span className="text-xs text-slate-400">Pending</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-slate-900">3</h3>
          <p className="text-sm text-slate-500">Waiting for update</p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50">
              <Truck className="h-5 w-5 text-sky-500" />
            </div>
            <span className="text-xs text-slate-400">Processing</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-slate-900">5</h3>
          <p className="text-sm text-slate-500">On the way</p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </div>
            <span className="text-xs text-slate-400">Delivered</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-slate-900">4</h3>
          <p className="text-sm text-slate-500">Completed orders</p>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="space-y-4">
          {/* Top row */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
              <p className="mt-1 text-sm text-slate-500">Search and narrow down your order history</p>
            </div>

            {/* Mobile / Tablet Toggle */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Search always visible */}
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search your orders..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          {/* Desktop filters */}
          <div className="hidden grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 lg:grid">
            <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100">
              <option>Status: All</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Delivered</option>
            </select>

            <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100">
              <option>Payment: All</option>
              <option>Paid</option>
              <option>Unpaid</option>
            </select>

            <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100">
              <option>Date: Latest</option>
              <option>Oldest First</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
          </div>

          {/* Mobile / Tablet collapsible filters */}
          {showFilters && (
            <div className="grid grid-cols-1 gap-3 lg:hidden">
              <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100">
                <option>Status: All</option>
                <option>Pending</option>
                <option>Processing</option>
                <option>Delivered</option>
              </select>

              <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100">
                <option>Payment: All</option>
                <option>Paid</option>
                <option>Unpaid</option>
              </select>

              <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100">
                <option>Date: Latest</option>
                <option>Oldest First</option>
                <option>Last 7 Days</option>
                <option>This Month</option>
              </select>
            </div>
          )}
        </div>
      </section>

      {/* Desktop Table */}
      <section className="hidden rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-237.5 border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-slate-400">
                <th className="pb-2 font-semibold">Order</th>
                <th className="pb-2 font-semibold">Date</th>
                <th className="pb-2 font-semibold">Items</th>
                <th className="pb-2 font-semibold">Amount</th>
                <th className="pb-2 font-semibold">Payment</th>
                <th className="pb-2 font-semibold">Status</th>
                <th className="pb-2 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="bg-slate-50/80">
                  <td className="rounded-l-2xl px-4 py-4">
                    <div>
                      <p className="font-semibold text-slate-800">{order.id}</p>
                      <p className="mt-1 text-xs text-slate-400">Giftly order</p>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-500">{order.date}</td>

                  <td className="px-4 py-4 text-sm text-slate-600">{order.items} items</td>

                  <td className="px-4 py-4 text-sm font-medium text-slate-800">{order.amount}</td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        order.payment === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      {order.payment}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-600'
                          : order.status === 'Processing'
                            ? 'bg-sky-50 text-sky-600'
                            : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="rounded-r-2xl px-4 py-4 text-right">
                    <button className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500">
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile Cards */}
      <section className="grid grid-cols-1 gap-4 lg:hidden">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-3xl border border-white/70 bg-white/85 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-800">{order.id}</p>
                <p className="mt-1 text-sm text-slate-500">{order.date}</p>
              </div>

              <button className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-500 transition hover:bg-rose-100">
                <Eye className="h-3.5 w-3.5" />
                View
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50/80 p-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Items</p>
                <p className="mt-1 text-sm text-slate-600">{order.items} items</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Amount</p>
                <p className="mt-1 text-sm font-medium text-slate-800">{order.amount}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Payment</p>
                <div className="mt-1">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      order.payment === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {order.payment}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Status</p>
                <div className="mt-1">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-50 text-emerald-600'
                        : order.status === 'Processing'
                          ? 'bg-sky-50 text-sky-600'
                          : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default UserOrders;
