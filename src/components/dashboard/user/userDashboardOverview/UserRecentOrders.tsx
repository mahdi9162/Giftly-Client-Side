import { formattedDate } from '@/lib/utils';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type UserOrdersTypes = {
  _id: string;
  total: number;
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  items: unknown[];
  createdAt: string;
};

type Props = {
  userOrders: UserOrdersTypes[];
};

const UserRecentOrders = ({ userOrders }: Props) => {
  const recentOrders = userOrders?.slice(0, 3);

  const getBadgeClass = (status: UserOrdersTypes['orderStatus']) => {
    if (status === 'delivered') return 'bg-emerald-50 text-emerald-600';
    if (status === 'processing' || status === 'shipped') return 'bg-sky-50 text-sky-600';
    if (status === 'cancelled') return 'bg-rose-50 text-rose-600';
    return 'bg-amber-50 text-amber-600';
  };

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
        {recentOrders?.length === 0 && <p className="text-sm text-slate-500">No recent orders yet.</p>}
        {recentOrders?.map((order) => (
          <div
            key={order._id}
            className="group flex items-center justify-between rounded-[22px] border border-slate-100 bg-slate-50/70 p-4 transition duration-300 hover:border-rose-100 hover:bg-white hover:shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <ShoppingBag className="h-5 w-5 text-rose-500 transition duration-300 group-hover:scale-110" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Order <span className="bg-yellow-200">{order._id.slice(-6).toUpperCase()}</span>
                </p>
                <p className="mt-1 text-xs text-slate-500">{formattedDate(order.createdAt)}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-base font-bold text-slate-900">{order.total}</p>
              <span className={`${getBadgeClass(order.orderStatus)} text-sm`}>{order.orderStatus}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRecentOrders;
