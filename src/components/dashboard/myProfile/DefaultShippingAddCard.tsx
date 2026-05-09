import { BadgeCheck, Building2, Globe2, Home, MapPinned } from 'lucide-react';
import React from 'react';

const DefaultShippingAddCard = () => {
  return (
    <>
      <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Default Shipping Address</h2>
            <p className="mt-1 text-sm text-slate-500">Used to auto-fill checkout. You can still change it per order.</p>
          </div>

          <span className="w-fit rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-primary">Default</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Home className="h-4 w-4 text-primary" />
              Street Address
            </label>
            <input
              type="text"
              defaultValue="1209 Mountain Road PL NE"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Building2 className="h-4 w-4 text-primary" />
              City
            </label>
            <input
              type="text"
              defaultValue="Albuquerque"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MapPinned className="h-4 w-4 text-primary" />
              Postal Code
            </label>
            <input
              type="text"
              defaultValue="87110"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Globe2 className="h-4 w-4 text-primary" />
              Country
            </label>
            <input
              type="text"
              defaultValue="United States"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50">
              <BadgeCheck className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">Checkout Auto-fill</h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                This address will be used as your default checkout address, but changing address during checkout will only affect that
                order.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-primary"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-2xl bg-linear-to-r from-primary to-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.01]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default DefaultShippingAddCard;
