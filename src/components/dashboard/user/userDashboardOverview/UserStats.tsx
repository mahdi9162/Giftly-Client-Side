import { Clock3, Package, ShoppingBag, Truck } from 'lucide-react';
import React from 'react';

const UserStats = () => {
  return (
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
  );
};

export default UserStats;
