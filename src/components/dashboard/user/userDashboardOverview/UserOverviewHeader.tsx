import { User } from '@/hooks/useAuth';
import { ArrowRight, Gift, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  user: User | null;
};

const UserOverviewHeader = ({ user }: Props) => {
  const router = useRouter();
  return (
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
  );
};

export default UserOverviewHeader;
