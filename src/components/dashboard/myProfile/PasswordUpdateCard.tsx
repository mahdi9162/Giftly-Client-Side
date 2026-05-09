import { LockKeyhole } from 'lucide-react';
import React from 'react';

const PasswordUpdateCard = () => {
  return (
    <div className="mt-4 w-full rounded-2xl border border-rose-100 bg-rose-50/60 p-4 text-left">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
          <LockKeyhole className="h-4 w-4" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Password & Security</p>

          <p className="mt-0.5 text-xs text-slate-500">Update your password to keep your account secure.</p>
        </div>
      </div>

      {/* password form */}
      <div className="mt-4 space-y-3">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Current Password</label>

          <input
            type="password"
            placeholder="Enter current password"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-rose-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">New Password</label>

          <input
            type="password"
            placeholder="Enter new password"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-rose-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-rose-100"
          />
        </div>

        <button
          type="button"
          className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-linear-to-r from-primary to-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.01]"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default PasswordUpdateCard;
