import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const UserRecentOrders = () => {
  const router = useRouter();
  return (
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
              <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${order.badgeClass}`}>{order.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRecentOrders;
