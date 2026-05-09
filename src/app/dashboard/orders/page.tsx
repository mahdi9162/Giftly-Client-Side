'use client';

import React, { useState } from 'react';
import { Eye, Package, Search, Truck, Clock3, CheckCircle2, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { formattedDate } from '@/lib/utils';
import Pagination from '@/components/shared/Pagination';

type UserOrderItem = {
  _id: string;
  items: {
    productId: string;
    quantity: number;
    priceAtPurchase: number;
  }[];
  total: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
};

type UserOrdersResponse = {
  meta: {
    totalOrders: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  };
  data: UserOrderItem[];
};

const UserOrders = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [search, getSearch] = useState('');
  const [orderStatus, setOrderStatus] = useState('all');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [date, setDate] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);

  // queary
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

  queryString.page = currentPage;
  queryString.limit = 9;

  // fetch data
  const { data: ordersResponse } = useQuery<UserOrdersResponse>({
    queryKey: ['order-list', queryString],
    queryFn: async () => {
      const res = await axiosInstance.get('/orders/my-orders', { params: queryString });
      return res?.data as UserOrdersResponse;
    },
  });

  const ordersList = ordersResponse?.data || [];

  const delivered = ordersList.filter((order) => order.orderStatus === 'delivered').length;
  const pending = ordersList.filter((order) => order.orderStatus === 'pending').length;
  const onTheWay = ordersList.filter((order) => order.orderStatus === 'processing' || order.orderStatus === 'shipped').length;

  const totalPages = ordersResponse?.meta?.totalPages || 1;

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
              Total Orders: <span className="font-semibold text-slate-900">{ordersResponse?.meta?.totalOrders || 0}</span>
            </div>
            <div className="rounded-2xl bg-linear-to-r from-rose-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/50">
              {delivered}
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
          <h3 className="mt-4 text-2xl font-bold text-slate-900">{ordersResponse?.meta?.totalOrders || 0}</h3>
          <p className="text-sm text-slate-500">Orders placed</p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50">
              <Clock3 className="h-5 w-5 text-amber-500" />
            </div>
            <span className="text-xs text-slate-400">Pending</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-slate-900">{pending}</h3>
          <p className="text-sm text-slate-500">Waiting for update</p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50">
              <Truck className="h-5 w-5 text-sky-500" />
            </div>
            <span className="text-xs text-slate-400">Processing</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-slate-900">{onTheWay}</h3>
          <p className="text-sm text-slate-500">On the way</p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </div>
            <span className="text-xs text-slate-400">Delivered</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-slate-900">{delivered}</h3>
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
              onChange={(e) => {
                getSearch(e.target.value);
                setCurrentPage(1);
              }}
              value={search}
              placeholder="Search your orders..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          {/* Desktop filters */}
          <div className="hidden grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 lg:grid">
            <select
              onChange={(e) => {
                setOrderStatus(e.target.value);
                setCurrentPage(1);
              }}
              value={orderStatus}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            >
              <option value={'all'}>Status: All</option>
              <option value={'pending'}>Pending</option>
              <option value={'processing'}>Processing</option>
              <option value={'shipped'}>shipped</option>
              <option value={'delivered'}>Delivered</option>
              <option value={'cancelled'}>Cancelled</option>
            </select>

            <select
              onChange={(e) => {
                setPaymentStatus(e.target.value);
                setCurrentPage(1);
              }}
              value={paymentStatus}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            >
              <option value={'all'}>Payment: All</option>
              <option value={'paid'}>Paid</option>
              <option value={'pending'}>Unpaid</option>
            </select>

            <select
              onChange={(e) => {
                setDate(e.target.value);
                setCurrentPage(1);
              }}
              value={date}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            >
              <option value={'latest'}>Date: Latest</option>
              <option value={'oldest'}>Oldest First</option>
              <option value={'last-7-days'}>Last 7 Days</option>
              <option value={'this-month'}>This Month</option>
            </select>
          </div>

          {/* Mobile / Tablet collapsible filters */}
          {showFilters && (
            <div className="grid grid-cols-1 gap-3 lg:hidden">
              <select
                onChange={(e) => {
                  setOrderStatus(e.target.value);
                  setCurrentPage(1);
                }}
                value={orderStatus}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              >
                <option value={'all'}>Status: All</option>
                <option value={'pending'}>Pending</option>
                <option value={'processing'}>Processing</option>
                <option value={'shipped'}>shipped</option>
                <option value={'delivered'}>Delivered</option>
                <option value={'cancelled'}>Cancelled</option>
              </select>

              <select
                onChange={(e) => {
                  setPaymentStatus(e.target.value);
                  setCurrentPage(1);
                }}
                value={paymentStatus}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              >
                <option value={'all'}>Payment: All</option>
                <option value={'paid'}>Paid</option>
                <option value={'pending'}>Unpaid</option>
              </select>

              <select
                onChange={(e) => {
                  setDate(e.target.value);
                  setCurrentPage(1);
                }}
                value={date}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              >
                <option value={'latest'}>Date: Latest</option>
                <option value={'oldest'}>Oldest First</option>
                <option value={'last-7-days'}>Last 7 Days</option>
                <option value={'this-month'}>This Month</option>
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
                <th className="pb-2 font-semibold">Quantity</th>
                <th className="pb-2 font-semibold">Amount</th>
                <th className="pb-2 font-semibold">Payment</th>
                <th className="pb-2 font-semibold">Status</th>
                <th className="pb-2 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {ordersList?.map((order) => (
                <tr key={order._id} className="bg-slate-50/80">
                  <td className="rounded-l-2xl px-4 py-4">
                    <div>
                      <p className="font-semibold text-slate-800">{order._id.slice(0, 8)}</p>
                      <p className="mt-1 text-xs text-slate-400">Giftly order</p>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-500">{formattedDate(order.createdAt)}</td>

                  <td className="px-4 py-4 text-sm text-slate-600">{order.items.length}</td>

                  <td className="px-4 py-4 text-sm font-medium text-slate-800">{order.total}</td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
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
                            ? 'bg-sky-50 text-sky-600'
                            : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      {order.orderStatus}
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
        {ordersList.map((order) => (
          <div
            key={order._id}
            className="rounded-3xl border border-white/70 bg-white/85 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-800">{order._id.slice(0, 8)}</p>
                <p className="mt-1 text-sm text-slate-500">{formattedDate(order.createdAt)}</p>
              </div>

              <button className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-500 transition hover:bg-rose-100">
                <Eye className="h-3.5 w-3.5" />
                View
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50/80 p-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Quantity</p>
                <p className="mt-1 text-sm text-slate-600">{order.items.length}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Amount</p>
                <p className="mt-1 text-sm font-medium text-slate-800">{order.total}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Payment</p>
                <div className="mt-1">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
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
                          ? 'bg-sky-50 text-sky-600'
                          : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default UserOrders;
