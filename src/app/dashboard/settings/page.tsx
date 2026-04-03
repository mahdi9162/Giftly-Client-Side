'use client';

import React from 'react';
import { Bell, KeyRound, ShieldAlert, Trash2 } from 'lucide-react';

const UserSettings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-3">
          <p className="inline-flex w-fit rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
            Preferences
          </p>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Settings</h1>
          <p className="text-sm text-slate-500 md:text-base">Manage your password, notifications, and account controls.</p>
        </div>
      </section>

      {/* Change Password */}
      <section className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="flex items-center gap-3">
          <KeyRound className="h-5 w-5 text-indigo-500" />
          <h2 className="text-lg font-semibold text-slate-900">Change Password</h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">Update your account password to keep your account secure.</p>

        <div className="mt-6 max-w-xl space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <button className="mt-5 rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02]">
          Update Password
        </button>
      </section>

      {/* Notification Preferences */}
      <section className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-slate-900">Notification Preferences</h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">Control how you receive updates about your account and orders.</p>

        <div className="mt-6 space-y-4">
          <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">Email Notifications</p>
              <p className="mt-1 text-xs text-slate-500">Receive email alerts about important account updates</p>
            </div>
            <input type="checkbox" className="toggle toggle-sm" defaultChecked />
          </label>

          <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">Order Updates</p>
              <p className="mt-1 text-xs text-slate-500">Get notified when your order status changes</p>
            </div>
            <input type="checkbox" className="toggle toggle-sm" defaultChecked />
          </label>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="rounded-[28px] border border-red-100 bg-red-50/50 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-5 w-5 text-red-500" />
          <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
        </div>

        <p className="mt-2 text-sm text-red-500">Deleting your account is permanent and cannot be undone.</p>

        <button className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-600">
          <Trash2 className="h-4 w-4" />
          Delete Account
        </button>
      </section>
    </div>
  );
};

export default UserSettings;
