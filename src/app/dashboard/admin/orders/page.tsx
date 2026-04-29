'use client';

import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import OrderActionCell from '@/components/dashboard/OrderActionCell';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { formattedDateTime } from '@/lib/utils';
import Pagination from '@/components/shared/Pagination';

type AdminOrder = {
  _id: string;
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  total: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
};

const AdminOrderPage = () => {
  const [search, setSearch] = useState('');
  const [orderStatus, setOrderStatus] = useState('all');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [date, setDate] = useState('latest');
  const [amount, setAmount] = useState('any');
  const [currentPage, setCurrentPage] = useState(1);

  const queryString: Record<string, string | number> = {};

  if (search !== '') {
    queryString.search = search;
  }
  if (orderStatus !== 'all') {
    queryString.orderStatus = orderStatus;
  }
  if (paymentStatus !== 'all') {
    queryString.paymentStatus = paymentStatus;
  }
  if (date !== 'latest') {
    queryString.date = date;
  }
  if (amount !== 'any') {
    queryString.amount = amount;
  }

  queryString.page = currentPage;
  queryString.limit = 9;

  const { data } = useQuery({
    queryKey: ['orders', queryString],
    queryFn: () => axiosInstance.get(`/admin/orders`, { params: queryString }),
  });

  const orders = data?.data?.data || [];
  const totalPages = data?.data.meta.totalPages || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
              Orders Management
            </p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">All Orders</h1>
            <p className="mt-2 text-sm text-slate-500 md:text-base">
              Review new orders, confirm them, mark COD as paid, and manage delivery flow.
            </p>
          </div>

          <button className="rounded-2xl bg-linear-to-r from-rose-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.01]">
            Export Orders
          </button>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search by customer or order..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          {/* Filters */}
          {/* status */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <select
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option value="all">Status: All</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option value="all">Payment: All</option>
              <option value="paid">Paid</option>
              <option value="pending">Unpaid</option>
              <option value="refunded">Refunded</option>
            </select>

            <select
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              onChange={(e) => setDate(e.target.value)}
            >
              <option value="latest">Date: Latest</option>
              <option value="oldest">Oldest First</option>
              <option value="today">Today</option>
              <option value="last-7-days">Last 7 Days</option>
              <option value="this-month">This Month</option>
            </select>

            <select
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              onChange={(e) => setAmount(e.target.value)}
            >
              <option value="any">Amount: Any</option>
              <option value="under-50">Under $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="above-200">Above $200</option>
            </select>
          </div>
        </div>
      </section>

      {/* Desktop Table */}
      <section className="hidden rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-275 border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-slate-400">
                <th className="pb-2 font-semibold pl-2">No</th>
                <th className="pb-2 font-semibold pl-4">Customer</th>
                <th className="pb-2 font-semibold pl-4">Date</th>
                <th className="pb-2 font-semibold pr-2">Amount</th>
                <th className="pb-2 font-semibold pl-2">Payment</th>
                <th className="pb-2 font-semibold pl-5">Status</th>
                <th className="pb-2 text-right font-semibold pr-8">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders?.map((order: AdminOrder, index: number) => (
                <tr key={order._id} className="bg-slate-50/80">
                  {/* Serial Number Column */}
                  <td className="px-4 py-4 text-sm text-slate-500">{index + 1}</td>
                  {/* Customer + Order ID */}
                  <td className="flex rounded-l-2xl px-4 py-4">
                    <div>
                      <p className="font-semibold text-slate-800">{order.customerInfo.fullName}</p>
                      <p className="mt-1 text-xs text-slate-400">{order._id}</p>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-500">{formattedDateTime(order.createdAt)}</td>

                  <td className="px-4 py-4 text-sm font-medium text-slate-700">{order.total}</td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        order.paymentStatus === 'paid'
                          ? 'bg-emerald-50 text-emerald-600'
                          : order.paymentStatus === 'pending'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        order.orderStatus === 'delivered'
                          ? 'bg-emerald-50 text-emerald-600'
                          : order.orderStatus === 'processing'
                            ? 'bg-violet-50 text-violet-600'
                            : order.orderStatus === 'pending'
                              ? 'bg-amber-50 text-amber-600'
                              : 'bg-rose-50 text-rose-500'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="rounded-r-2xl px-4 py-4">
                    <OrderActionCell initialStatus={order.orderStatus} initialPaymentStatus={order.paymentStatus} orderId={order._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile / Tablet Cards */}
      <section className="grid grid-cols-1 gap-4 lg:hidden">
        {orders?.map((order: AdminOrder) => (
          <div
            key={order._id}
            className="rounded-3xl border border-white/70 bg-white/85 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-800">{order.customerInfo.fullName}</p>
                <p className="mt-1 text-xs text-slate-400">{order._id}</p>
              </div>

              <button className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-500 transition hover:bg-rose-100">
                <Eye className="h-3.5 w-3.5" />
                View
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50/80 p-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Date</p>
                <p className="mt-1 text-xs w-20 md:w-full md:text-sm text-slate-600">{formattedDateTime(order.createdAt)}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Amount</p>
                <p className="mt-1 text-sm font-medium text-slate-700">{order.total}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Payment</p>
                <div className="mt-1">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      order.paymentStatus === 'paid'
                        ? 'bg-emerald-50 text-emerald-600'
                        : order.paymentStatus === 'pending'
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Status</p>
                <div className="mt-1">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      order.orderStatus === 'delivered'
                        ? 'bg-emerald-50 text-emerald-600'
                        : order.orderStatus === 'processing'
                          ? 'bg-violet-50 text-violet-600'
                          : order.orderStatus === 'pending'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-rose-50 text-rose-500'
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            </div>

            <OrderActionCell initialStatus={order.orderStatus} initialPaymentStatus={order.paymentStatus} orderId={order._id} />
          </div>
        ))}
      </section>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default AdminOrderPage;
