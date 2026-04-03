'use client';

import React from 'react';
import { Store, Mail, Phone, MapPin, Coins, UploadCloud } from 'lucide-react';

const page = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
              Admin Settings
            </p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Store Information</h1>
            <p className="mt-2 text-sm text-slate-500 md:text-base">
              Manage your store identity, contact details, and branding preferences.
            </p>
          </div>

          <button className="rounded-2xl bg-linear-to-r from-rose-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.01]">
            Save Changes
          </button>
        </div>
      </section>

      {/* Settings Form */}
      <section className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          {/* Left form */}
          <div className="space-y-5">
            {/* Store name */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Store className="h-4 w-4 text-rose-500" />
                Store Name
              </label>
              <input
                type="text"
                placeholder="Giftly"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              />
            </div>

            {/* Support email */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Mail className="h-4 w-4 text-rose-500" />
                Support Email
              </label>
              <input
                type="email"
                placeholder="support@giftly.com"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Phone className="h-4 w-4 text-rose-500" />
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+1 234 567 890"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              />
            </div>

            {/* Address */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin className="h-4 w-4 text-rose-500" />
                Address
              </label>
              <textarea
                rows={4}
                placeholder="123 Gift Street, New York, USA"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              />
            </div>

            {/* Currency */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Coins className="h-4 w-4 text-rose-500" />
                Currency
              </label>
              <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100">
                <option>USD - US Dollar</option>
                <option>EUR - Euro</option>
                <option>GBP - British Pound</option>
                <option>BDT - Bangladeshi Taka</option>
              </select>
            </div>
          </div>

          {/* Right side logo upload */}
          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
              <h2 className="text-lg font-semibold text-slate-900">Store Logo</h2>
              <p className="mt-1 text-sm text-slate-500">Upload your store logo to personalize your admin and storefront.</p>

              <div className="mt-5 rounded-3xl border-2 border-dashed border-rose-200 bg-white p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50">
                  <UploadCloud className="h-7 w-7 text-rose-500" />
                </div>

                <p className="mt-4 text-sm font-semibold text-slate-700">Upload Logo</p>
                <p className="mt-1 text-xs text-slate-500">PNG, JPG or SVG up to 2MB</p>

                <button className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-500 transition hover:bg-rose-100">
                  Choose File
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Preview</h3>

              <div className="mt-4 flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-rose-500 to-fuchsia-500 text-lg font-bold text-white">
                  G
                </div>

                <div>
                  <p className="font-semibold text-slate-800">Giftly</p>
                  <p className="text-sm text-slate-500">Thoughtful gifting, powered by AI.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom save */}
        <div className="mt-6 flex justify-end">
          <button className="rounded-2xl bg-linear-to-r from-rose-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.01]">
            Save Store Info
          </button>
        </div>
      </section>
    </div>
  );
};

export default page;
