import { Gift, Package, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const UserQuickActions = () => {
  const router = useRouter();
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <button
        onClick={() => router.push('/shop')}
        className="group relative overflow-hidden rounded-[28px] bg-linear-to-r from-rose-500 to-fuchsia-500 p-6 text-left text-white shadow-lg shadow-rose-200/50 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(244,63,94,0.28)] cursor-pointer"
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
        className="group rounded-[28px] border border-slate-200 bg-white p-6 text-left shadow-[0_14px_40px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-rose-200 hover:bg-rose-50/40 cursor-pointer"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 transition duration-300 group-hover:scale-110">
          <Package className="h-6 w-6 text-violet-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">My Orders</h3>
        <p className="mt-1 text-sm text-slate-500">Track your purchases</p>
      </button>

      <button
        onClick={() => router.push('/dashboard/profile')}
        className="group rounded-[28px] border border-slate-200 bg-white p-6 text-left shadow-[0_14px_40px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-rose-200 hover:bg-rose-50/40 cursor-pointer"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 transition duration-300 group-hover:scale-110">
          <UserRound className="h-6 w-6 text-sky-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Profile Settings</h3>
        <p className="mt-1 text-sm text-slate-500">Update your info</p>
      </button>
    </section>
  );
};

export default UserQuickActions;
