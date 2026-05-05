import React from 'react';

type RecentOrdersProps = {
  id: string;
  customer: string;
  amount: string;
  status: string;
};

const RecentOrders = ({ recentOrders }: { recentOrders: RecentOrdersProps[] }) => {
  return (
    <>
      <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
            <p className="mt-1 text-sm text-slate-500">Latest order updates from your store</p>
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
                  <td className="rounded-l-2xl px-4 py-4 text-sm font-semibold text-slate-800">{order.id}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{order.customer}</td>
                  <td className="px-4 py-4 text-sm font-medium text-slate-700">{order.amount}</td>
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
    </>
  );
};

export default RecentOrders;
