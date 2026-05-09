import { Camera, ShieldCheck, UploadCloud } from 'lucide-react';
import React from 'react';

const ProfileImageCard = () => {
  return (
    <>
      {/* profile image */}
      <div className="relative">
        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-primary via-secondary to-accent text-3xl font-bold text-white shadow-lg shadow-rose-200/50 md:h-32 md:w-32">
          M
        </div>

        <button className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white text-primary shadow-md transition hover:bg-rose-50">
          <Camera className="h-4 w-4" />
        </button>
      </div>

      {/* user info */}
      <h2 className="mt-4 text-xl font-semibold text-slate-900">Mahdi Hasan</h2>
      <p className="mt-1 text-sm text-slate-500">Giftly Account</p>

      {/* image update */}
      <button
        type="button"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-primary to-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.01]"
      >
        <UploadCloud className="h-4 w-4" />
        Update Profile Image
      </button>

      {/* account status */}
      <div className="mt-6 w-full rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Account Status</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">Active</span>

          <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified
          </span>
        </div>
      </div>

      {/* stats */}
      <div className="mt-4 grid w-full grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Orders</p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">12</h3>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Member Since</p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">2026</h3>
        </div>
      </div>
    </>
  );
};

export default ProfileImageCard;
