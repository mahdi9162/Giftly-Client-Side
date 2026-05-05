'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ArrowRight, Clock3, Gift, Package, Settings, ShoppingBag, Sparkles, Truck, UserRound } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const orderTrend = [
  { name: 'Mon', orders: 1 },
  { name: 'Tue', orders: 2 },
  { name: 'Wed', orders: 1 },
  { name: 'Thu', orders: 3 },
  { name: 'Fri', orders: 2 },
  { name: 'Sat', orders: 2 },
  { name: 'Sun', orders: 1 },
];

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === 'admin') {
      router.push('/dashboard/admin');
    }
  }, [user, router]);

  return (
    <div className="space-y-6">
      {/* Welcome / Hero */}
      <section className="relative overflow-hidden rounded-4xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-fuchsia-200/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-rose-200/20 blur-3xl" />

        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-500">
              <Sparkles className="h-3.5 w-3.5" />
              User Overview
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Welcome back, {user?.name || 'User'} 👋</h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
              Here’s a quick overview of your recent orders, activity, and useful shortcuts to manage your account faster.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => router.push('/shop')}
                className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-rose-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.02]"
              >
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => router.push('/dashboard/orders')}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
              >
                My Orders
              </button>
            </div>
          </div>

          {/* Mini highlight card */}
          <div className="w-full xl:max-w-sm">
            <div className="rounded-[28px] border border-rose-100/80 bg-linear-to-br from-white via-rose-50/70 to-fuchsia-50/70 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Gift className="h-6 w-6 text-rose-500" />
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm">This Week</span>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">Personalized gifting made easy</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Explore curated gift suggestions and keep track of every order from one place.
              </p>

              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 p-3">
                <div className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-600">4</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Delivered Orders</p>
                  <p className="text-xs text-slate-500">Your recent completed purchases</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: 'Total Orders',
            value: '12',
            desc: 'All purchases',
            icon: Package,
            iconClass: 'text-rose-500',
            iconBg: 'bg-rose-50',
          },
          {
            title: 'Pending',
            value: '3',
            desc: 'Awaiting update',
            icon: Clock3,
            iconClass: 'text-amber-500',
            iconBg: 'bg-amber-50',
          },
          {
            title: 'Processing',
            value: '5',
            desc: 'On the way',
            icon: Truck,
            iconClass: 'text-sky-500',
            iconBg: 'bg-sky-50',
          },
          {
            title: 'Delivered',
            value: '4',
            desc: 'Completed orders',
            icon: ShoppingBag,
            iconClass: 'text-emerald-500',
            iconBg: 'bg-emerald-50',
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-[26px] border border-white/70 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.04)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg} transition duration-300 group-hover:scale-110`}
                >
                  <Icon className={`h-5 w-5 ${item.iconClass}`} />
                </div>

                <span className="text-xs font-medium text-slate-400">{item.title}</span>
              </div>

              <h3 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">{item.value}</h3>
              <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
            </div>
          );
        })}
      </section>

      {/* Chart + Recent orders */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.35fr]">
        {/* Activity chart */}
        <div className="rounded-[30px] border border-white/70 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Order Activity</h3>
              <p className="mt-1 text-sm text-slate-500">Your weekly order trend</p>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">Weekly</span>
          </div>

          <div className="mt-5 h-65 rounded-3xl border border-slate-100 bg-linear-to-b from-white to-rose-50/30 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={orderTrend}>
                <defs>
                  <linearGradient id="userOrdersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.03} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 12px 30px rgba(15,23,42,0.08)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#f43f5e"
                  strokeWidth={3}
                  fill="url(#userOrdersGradient)"
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent orders */}
        <div className="rounded-[30px] border border-white/70 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Recent Orders</h3>

            <button
              onClick={() => router.push('/dashboard/orders')}
              className="inline-flex items-center gap-1 text-sm font-medium text-rose-500 transition hover:gap-2 hover:text-rose-600"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {[
              {
                id: '#GF-1024',
                date: 'Apr 2, 2026',
                amount: '$84.00',
                status: 'Pending',
                badgeClass: 'bg-amber-50 text-amber-600',
              },
              {
                id: '#GF-1023',
                date: 'Apr 1, 2026',
                amount: '$120.00',
                status: 'Delivered',
                badgeClass: 'bg-emerald-50 text-emerald-600',
              },
            ].map((order) => (
              <div
                key={order.id}
                className="group flex items-center justify-between rounded-[22px] border border-slate-100 bg-slate-50/70 p-4 transition duration-300 hover:border-rose-100 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <ShoppingBag className="h-5 w-5 text-rose-500 transition duration-300 group-hover:scale-110" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">Order {order.id}</p>
                    <p className="mt-1 text-xs text-slate-500">{order.date}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-base font-bold text-slate-900">{order.amount}</p>
                  <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${order.badgeClass}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <button
          onClick={() => router.push('/shop')}
          className="group relative overflow-hidden rounded-[28px] bg-linear-to-r from-rose-500 to-fuchsia-500 p-6 text-left text-white shadow-lg shadow-rose-200/50 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(244,63,94,0.28)]"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Gift className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Browse Products</h3>
            <p className="mt-1 text-sm text-white/80">Discover new gift ideas</p>
          </div>
        </button>

        <button
          onClick={() => router.push('/dashboard/orders')}
          className="group rounded-[28px] border border-slate-200 bg-white p-6 text-left shadow-[0_14px_40px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-rose-200 hover:bg-rose-50/40"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 transition duration-300 group-hover:scale-110">
            <Package className="h-6 w-6 text-violet-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">My Orders</h3>
          <p className="mt-1 text-sm text-slate-500">Track your purchases</p>
        </button>

        <button
          onClick={() => router.push('/dashboard/profile')}
          className="group rounded-[28px] border border-slate-200 bg-white p-6 text-left shadow-[0_14px_40px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-rose-200 hover:bg-rose-50/40"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 transition duration-300 group-hover:scale-110">
            <UserRound className="h-6 w-6 text-sky-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Profile Settings</h3>
          <p className="mt-1 text-sm text-slate-500">Update your info</p>
        </button>
      </section>

      {/* Extra small account card */}
      <section className="rounded-[30px] border border-white/70 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-rose-500 to-fuchsia-500 text-lg font-bold text-white shadow-lg shadow-rose-200/50">
              {(user?.name?.charAt(0) || 'U').toUpperCase()}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">{user?.name || 'User'}</h3>
              <p className="text-sm text-slate-500">Keep your profile and preferences up to date</p>
            </div>
          </div>

          <button
            onClick={() => router.push('/dashboard/settings')}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
          >
            <Settings className="h-4 w-4" />
            Open Settings
          </button>
        </div>
      </section>
    </div>
  );
};

export default Page;
