import { Clock3 } from 'lucide-react';
import React from 'react';
import LiveClock from './LiveClock';

const OverviewHeader = () => {
  return (
    <>
      <section className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
              Admin Overview
            </p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Welcome back, Kawser 👋</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 md:text-base">
              Here’s a quick look at your store performance, recent activity, and order updates.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-linear-to-r from-rose-50 to-fuchsia-50 px-4 py-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Clock3 className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <LiveClock />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OverviewHeader;
