import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type OrderTrendItem = {
  name: string;
  orders: number;
};

type Props = {
  orderTrend: OrderTrendItem[];
};

const UserChart = ({ orderTrend }: Props) => {
  return (
    <div className="rounded-[30px] border border-white/70 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Order Activity</h3>
          <p className="mt-1 text-sm text-slate-500">Your weekly order trend</p>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">Weekly</span>
      </div>

      <div className="mt-5 h-65 rounded-3xl border border-slate-100 bg-linear-to-b from-white to-rose-50/30 p-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={orderTrend}>
            <defs>
              <linearGradient id="userOrdersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.03} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                borderRadius: '16px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 12px 30px rgba(15,23,42,0.08)',
              }}
            />
            <Area type="monotone" dataKey="orders" stroke="#f43f5e" strokeWidth={3} fill="url(#userOrdersGradient)" activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserChart;
