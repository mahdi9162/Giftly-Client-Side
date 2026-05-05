import React from 'react';

const QuickActions = () => {
  return (
    <>
      <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
          <p className="mt-1 text-sm text-slate-500">Shortcuts for common admin tasks</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <button className="rounded-2xl border border-rose-100 bg-linear-to-r from-rose-500 to-fuchsia-500 px-4 py-4 text-left text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.01] cursor-pointer">
            <p className="text-sm font-semibold">Add New Product</p>
            <p className="mt-1 text-xs text-white/80">Create and publish a new gift item</p>
          </button>

          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-violet-200 hover:bg-violet-50/40 cursor-pointer">
            <p className="text-sm font-semibold text-slate-800">Manage Orders</p>
            <p className="mt-1 text-xs text-slate-500">Review pending and recent orders</p>
          </button>

          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-sky-200 hover:bg-sky-50/40 cursor-pointer">
            <p className="text-sm font-semibold text-slate-800">View Customers</p>
            <p className="mt-1 text-xs text-slate-500">Explore customer details and activity</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default QuickActions;
