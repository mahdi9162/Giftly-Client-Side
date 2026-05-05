import { LucideIcon } from 'lucide-react';
import React from 'react';

type RecentActivityProps = {
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  bg: string;
};

const RecentActivity = ({ activity }: { activity: RecentActivityProps[] }) => {
  return (
    <>
      <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
          <p className="mt-1 text-sm text-slate-500">Latest actions and alerts from your store</p>
        </div>

        <div className="space-y-4">
          {activity.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.bg}`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-800">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RecentActivity;
