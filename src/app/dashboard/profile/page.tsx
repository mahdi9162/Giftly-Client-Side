'use client';

import React from 'react';
import { User, Mail, Phone, MapPin, ShieldCheck, Camera, KeyRound, UploadCloud } from 'lucide-react';

const page = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
              Account Settings
            </p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">My Profile</h1>
            <p className="mt-2 text-sm text-slate-500 md:text-base">
              Manage your personal information, contact details, and account preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Profile Layout */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.3fr]">
        {/* Left Profile Card */}
        <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-r from-rose-500 to-fuchsia-500 text-3xl font-bold text-white shadow-lg shadow-rose-200/50">
                K
              </div>

              <button className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white text-rose-500 shadow-md transition hover:bg-rose-50">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <h2 className="mt-4 text-xl font-semibold text-slate-900">Kawser Miah</h2>
            <p className="mt-1 text-sm text-slate-500">Admin & Store Manager</p>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-rose-500 to-fuchsia-500 px-4 py-2 mt-2 text-sm font-semibold text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.01]"
            >
              <UploadCloud className="h-4 w-4" />
              Upload Image
            </button>

            <div className="mt-5 w-full rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Account Status</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">Active</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
              </div>
            </div>

            <div className="mt-5 grid w-full grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Orders</p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">124</h3>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Role</p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">Admin</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="space-y-6">
          {/* Personal Info */}
          <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
            <h2 className="text-lg font-semibold text-slate-900">Personal Information</h2>
            <p className="mt-1 text-sm text-slate-500">Update your basic profile details here.</p>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <User className="h-4 w-4 text-rose-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Kawser Miah"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Mail className="h-4 w-4 text-rose-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="kawser@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Phone className="h-4 w-4 text-rose-500" />
                  Phone Number
                </label>
                <input
                  type="text"
                  defaultValue="+1 234 567 890"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <MapPin className="h-4 w-4 text-rose-500" />
                  Address
                </label>
                <input
                  type="text"
                  defaultValue="New York, USA"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-end">
              <button className="rounded-2xl bg-linear-to-r from-rose-500 to-fuchsia-500 mt-5 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.01]">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
            <h2 className="text-lg font-semibold text-slate-900">Security Settings</h2>
            <p className="mt-1 text-sm text-slate-500">Manage password and account protection.</p>

            <div className="mt-6 grid grid-cols-1 gap-5">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <KeyRound className="h-4 w-4 text-rose-500" />
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <KeyRound className="h-4 w-4 text-rose-500" />
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col md:flexro md:justify-end">
              <button className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-500 transition hover:bg-rose-100">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
