import { ArrowUpRight, LucideIcon } from 'lucide-react';
import React from 'react';

type StatsType = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

const Stats = ({ stats }: { stats: StatsType[] }) => {
  return (
    <>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg}`}>
                  <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>

                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  {item.change}
                </div>
              </div>

              <p className="text-sm font-medium text-slate-500">{item.title}</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">{item.value}</h3>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Stats;
