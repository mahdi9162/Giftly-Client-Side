import React, { Dispatch, SetStateAction } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type ChartSectionProps = {
  range: 'weekly' | 'monthly';
  setRange: Dispatch<SetStateAction<'weekly' | 'monthly'>>;
  chartData: { name: string; revenue: number }[];
  salesOverview?: {
    range: 'weekly' | 'monthly';
    totalRevenue: number;
    totalOrders: number;
    bestLabel: string;
    orderTrend: number;
  };
};

const ChartSection = ({ range, setRange, chartData, salesOverview }: ChartSectionProps) => {
  return (
    <>
      <section className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Sales Overview</h2>
            <p className="mt-1 text-sm text-slate-500">
              {range === 'weekly' ? 'Weekly revenue trend from your gift store' : 'Monthly revenue trend from your gift store'}
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setRange('weekly')}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                range === 'weekly' ? 'bg-linear-to-r from-rose-500 to-fuchsia-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Weekly
            </button>

            <button
              onClick={() => setRange('monthly')}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                range === 'monthly'
                  ? 'bg-linear-to-r from-rose-500 to-fuchsia-500 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_260px]">
          <div className="h-70 rounded-3xl border border-slate-100 bg-linear-to-b from-white to-rose-50/30 p-3 sm:p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.03} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 12px 30px rgba(15,23,42,0.08)',
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#f43f5e" strokeWidth={3} fill="url(#salesGradient)" activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-rose-100 bg-linear-to-r from-rose-50 to-fuchsia-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-400">
                {range === 'weekly' ? 'THIS WEEK' : 'THIS MONTH'}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">${salesOverview?.totalRevenue || 0}</h3>
              <p className="mt-1 text-sm text-slate-500">{range === 'weekly' ? 'Total weekly revenue' : 'Total monthly revenue'}</p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-slate-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Orders Trend</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">{salesOverview?.totalOrders}</h3>
              <p className="mt-1 text-sm text-emerald-600">
                {salesOverview?.orderTrend || 0}% compared to last {range === 'weekly' ? 'week' : 'month'}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-slate-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Best {range === 'weekly' ? 'Day' : 'Week'}</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">{salesOverview?.bestLabel || 'N/A '}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {range === 'weekly' ? 'Highest sales recorded this week' : 'Highest sales recorded this month'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChartSection;
