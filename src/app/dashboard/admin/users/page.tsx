'use client';

import React from 'react';
import { Search, Eye, Trash2, UserX, UserCheck } from 'lucide-react';

const users = [
  {
    id: '#U-1021',
    name: 'Ava Johnson',
    email: 'ava@gmail.com',
    joined: 'Apr 2, 2026',
    orders: 12,
    status: 'Active',
  },
  {
    id: '#U-1022',
    name: 'Liam Smith',
    email: 'liam@gmail.com',
    joined: 'Apr 1, 2026',
    orders: 5,
    status: 'Inactive',
  },
  {
    id: '#U-1023',
    name: 'Sophia Lee',
    email: 'sophia@gmail.com',
    joined: 'Mar 30, 2026',
    orders: 18,
    status: 'Active',
  },
  {
    id: '#U-1024',
    name: 'Noah Brown',
    email: 'noah@gmail.com',
    joined: 'Mar 28, 2026',
    orders: 2,
    status: 'Blocked',
  },
];

const page = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
              User Management
            </p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Customers</h1>
            <p className="mt-2 text-sm text-slate-500 md:text-base">Manage your users, monitor account status, and control access.</p>
          </div>

          <button className="rounded-2xl bg-linear-to-r from-rose-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.01]">
            Export Users
          </button>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 focus:border-rose-300 focus:ring-4 focus:ring-rose-100">
              <option>Status: All</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Blocked</option>
            </select>

            <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 focus:border-rose-300 focus:ring-4 focus:ring-rose-100">
              <option>Orders: Any</option>
              <option>0-5 Orders</option>
              <option>5-10 Orders</option>
              <option>10+ Orders</option>
            </select>

            <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 focus:border-rose-300 focus:ring-4 focus:ring-rose-100">
              <option>Joined: Latest</option>
              <option>Oldest First</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
          </div>
        </div>
      </section>

      {/* Desktop Table */}
      <section className="hidden lg:block rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-245 border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-slate-400">
                <th className="pb-2">User</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Joined</th>
                <th className="pb-2">Orders</th>
                <th className="pb-2">Status</th>
                <th className="pb-2 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-slate-50/80">
                  <td className="rounded-l-2xl px-4 py-4">
                    <div>
                      <p className="font-semibold text-slate-800">{user.name}</p>
                      <p className="mt-1 text-xs text-slate-400">{user.id}</p>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-slate-500">{user.email}</td>

                  <td className="px-4 py-4 text-slate-600">{user.joined}</td>

                  <td className="px-4 py-4 text-slate-700">{user.orders}</td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        user.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-600'
                          : user.status === 'Inactive'
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-rose-50 text-rose-500'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="rounded-r-2xl px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500">
                        <Eye className="h-4 w-4" />
                        View
                      </button>

                      {user.status === 'Active' ? (
                        <button className="inline-flex items-center gap-1 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-600 transition hover:bg-amber-100">
                          <UserX className="h-4 w-4" />
                          Deactivate
                        </button>
                      ) : (
                        <button className="inline-flex items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600 transition hover:bg-emerald-100">
                          <UserCheck className="h-4 w-4" />
                          Activate
                        </button>
                      )}

                      <button className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-500 transition hover:bg-rose-100">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile / Tablet Cards */}
      <section className="grid gap-4 lg:hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-3xl border border-white/70 bg-white/85 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-800">{user.name}</p>
                <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                <p className="mt-1 text-xs text-slate-400">{user.id}</p>
              </div>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  user.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-600'
                    : user.status === 'Inactive'
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-rose-50 text-rose-500'
                }`}
              >
                {user.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50/80 p-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Joined</p>
                <p className="mt-1 text-sm text-slate-600">{user.joined}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Orders</p>
                <p className="mt-1 text-sm font-medium text-slate-700">{user.orders}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500">
                <Eye className="h-4 w-4" />
                View
              </button>

              {user.status === 'Active' ? (
                <button className="inline-flex items-center gap-1 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-600 transition hover:bg-amber-100">
                  <UserX className="h-4 w-4" />
                  Deactivate
                </button>
              ) : (
                <button className="inline-flex items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600 transition hover:bg-emerald-100">
                  <UserCheck className="h-4 w-4" />
                  Activate
                </button>
              )}

              <button className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-500 transition hover:bg-rose-100">
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default page;
