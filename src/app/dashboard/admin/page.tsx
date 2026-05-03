'use client';

import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  ArrowUpRight,
  Clock3,
  BadgeCheck,
  AlertCircle,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const stats = [
  {
    title: 'Total Revenue',
    value: '$12,480',
    change: '+12.5%',
    icon: DollarSign,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Total Orders',
    value: '1,284',
    change: '+8.2%',
    icon: ShoppingBag,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    title: 'Products',
    value: '326',
    change: '+5.1%',
    icon: Package,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    title: 'Customers',
    value: '892',
    change: '+10.3%',
    icon: Users,
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
];

const weeklyData = [
  { name: 'Mon', revenue: 1400 },
  { name: 'Tue', revenue: 1900 },
  { name: 'Wed', revenue: 1750 },
  { name: 'Thu', revenue: 2400 },
  { name: 'Fri', revenue: 2850 },
  { name: 'Sat', revenue: 2300 },
  { name: 'Sun', revenue: 2650 },
];

const monthlyData = [
  { name: 'Week 1', revenue: 8200 },
  { name: 'Week 2', revenue: 9400 },
  { name: 'Week 3', revenue: 8800 },
  { name: 'Week 4', revenue: 10200 },
];

const recentOrders = [
  {
    id: '#GF-1024',
    customer: 'Ava Johnson',
    amount: '$84.00',
    status: 'Delivered',
  },
  {
    id: '#GF-1025',
    customer: 'Liam Smith',
    amount: '$42.00',
    status: 'Processing',
  },
  {
    id: '#GF-1026',
    customer: 'Sophia Lee',
    amount: '$129.00',
    status: 'Pending',
  },
  {
    id: '#GF-1027',
    customer: 'Noah Brown',
    amount: '$58.00',
    status: 'Delivered',
  },
];

const topProducts = [
  { name: 'Personalized Gift Box', sold: 124, revenue: '$2,480' },
  { name: 'Romantic Flower Bundle', sold: 98, revenue: '$1,860' },
  { name: 'Birthday Surprise Pack', sold: 86, revenue: '$1,640' },
];

const activity = [
  {
    title: 'New order placed',
    desc: 'A new order has been placed by Ava Johnson.',
    icon: ShoppingBag,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    title: 'Product stock running low',
    desc: '“Romantic Flower Bundle” stock is getting low.',
    icon: AlertCircle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    title: 'Order delivered successfully',
    desc: 'Order #GF-1021 has been delivered.',
    icon: BadgeCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

const AdminOverviewPage = () => {
  const [range, setRange] = useState<'weekly' | 'monthly'>('weekly');

  const chartData = range === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <section className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
              Admin Overview
            </p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Welcome back, Kawser 👋
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 md:text-base">
              Here’s a quick look at your store performance, recent activity,
              and order updates.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-linear-to-r from-rose-50 to-fuchsia-50 px-4 py-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Clock3 className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Today
              </p>
              <p className="text-sm font-semibold text-slate-800">
                4 Apr, 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>

                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  {item.change}
                </div>
              </div>

              <p className="text-sm font-medium text-slate-500">{item.title}</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {item.value}
              </h3>
            </div>
          );
        })}
      </section>

      {/* Chart Section */}
      <section className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Sales Overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {range === 'weekly'
                ? 'Weekly revenue trend from your gift store'
                : 'Monthly revenue trend from your gift store'}
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setRange('weekly')}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                range === 'weekly'
                  ? 'bg-linear-to-r from-rose-500 to-fuchsia-500 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Weekly
            </button>

            <button
              onClick={() => setRange('monthly')}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                range === 'monthly'
                  ? 'bg-linear-to-r from-rose-500 to-fuchsia-500 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_260px]">
          <div className="h-70 rounded-3xl border border-slate-100 bg-linear-to-b from-white to-rose-50/30 p-3 sm:p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.03} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 12px 30px rgba(15,23,42,0.08)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f43f5e"
                  strokeWidth={3}
                  fill="url(#salesGradient)"
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-rose-100 bg-linear-to-r from-rose-50 to-fuchsia-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-400">
                {range === 'weekly' ? 'This Week' : 'This Month'}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {range === 'weekly' ? '$15,250' : '$38,600'}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {range === 'weekly'
                  ? 'Total weekly revenue'
                  : 'Total monthly revenue'}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-slate-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Orders Trend
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {range === 'weekly' ? '1,390' : '5,420'}
              </h3>
              <p className="mt-1 text-sm text-emerald-600">
                {range === 'weekly'
                  ? '+8.6% compared to last week'
                  : '+12.4% compared to last month'}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-slate-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Best {range === 'weekly' ? 'Day' : 'Week'}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {range === 'weekly' ? 'Friday' : 'Week 4'}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {range === 'weekly'
                  ? 'Highest sales recorded this week'
                  : 'Highest sales recorded this month'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Middle grid */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        {/* Recent orders */}
        <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Orders
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Latest order updates from your store
              </p>
            </div>

            <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500">
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-155 border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.18em] text-slate-400">
                  <th className="pb-2 font-semibold">Order ID</th>
                  <th className="pb-2 font-semibold">Customer</th>
                  <th className="pb-2 font-semibold">Amount</th>
                  <th className="pb-2 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="rounded-2xl bg-slate-50/80">
                    <td className="rounded-l-2xl px-4 py-4 text-sm font-semibold text-slate-800">
                      {order.id}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {order.customer}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-slate-700">
                      {order.amount}
                    </td>
                    <td className="rounded-r-2xl px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-600'
                            : order.status === 'Processing'
                            ? 'bg-violet-50 text-violet-600'
                            : 'bg-amber-50 text-amber-600'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top products */}
        <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Top Products
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Best-performing gift products this week
            </p>
          </div>

          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Product #{index + 1}
                    </p>
                  </div>

                  <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-500">
                    Top Seller
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Sold: {product.sold}</span>
                  <span className="font-semibold text-slate-800">
                    {product.revenue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom grid */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.3fr]">
        {/* Quick actions */}
        <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Quick Actions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Shortcuts for common admin tasks
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <button className="rounded-2xl border border-rose-100 bg-linear-to-r from-rose-500 to-fuchsia-500 px-4 py-4 text-left text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.01]">
              <p className="text-sm font-semibold">Add New Product</p>
              <p className="mt-1 text-xs text-white/80">
                Create and publish a new gift item
              </p>
            </button>

            <button className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-violet-200 hover:bg-violet-50/40">
              <p className="text-sm font-semibold text-slate-800">
                Manage Orders
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Review pending and recent orders
              </p>
            </button>

            <button className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-sky-200 hover:bg-sky-50/40">
              <p className="text-sm font-semibold text-slate-800">
                View Customers
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Explore customer details and activity
              </p>
            </button>
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Activity
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest actions and alerts from your store
            </p>
          </div>

          <div className="space-y-4">
            {activity.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${item.color}`} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminOverviewPage;