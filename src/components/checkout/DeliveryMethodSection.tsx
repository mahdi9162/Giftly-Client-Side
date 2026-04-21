import { Truck } from 'lucide-react';
import React from 'react';

const DeliveryMethodSection = () => {
  return (
    <section className="min-w-0 rounded-3xl border border-orange-100 bg-orange-50/30 p-5 shadow-sm md:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-secondary">
            <Truck className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-base-content sm:text-xl">Delivery Method</h2>
            <p className="text-xs md:text-sm text-slate-500">Choose what suits you best.</p>
          </div>
        </div>

        <span className="badge w-fit self-start border-orange-100 bg-orange-50 text-secondary">Step 3</span>
      </div>

      <div className="space-y-4">
        <label className="flex cursor-pointer flex-col gap-4 rounded-3xl border border-primary bg-rose-50/60 px-4 py-4 transition-all sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5">
          <div className="flex min-w-0 items-start gap-4">
            <input type="radio" name="delivery" defaultChecked className="radio radio-primary mt-1 shrink-0" />

            <div className="min-w-0">
              <p className="font-semibold text-base-content">Standard Delivery</p>
              <p className="text-xs md:text-sm text-slate-500">Delivered within 3–5 business days.</p>
            </div>
          </div>

          <span className="self-start font-bold text-primary sm:self-auto">Free</span>
        </label>

        <label className="flex cursor-pointer flex-col gap-4 rounded-3xl border border-base-300 bg-white px-4 py-4 transition-all hover:border-secondary sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5">
          <div className="flex min-w-0 items-start gap-4">
            <input type="radio" name="delivery" className="radio radio-warning mt-1 shrink-0" />

            <div className="min-w-0">
              <p className="font-semibold text-base-content">Express Delivery</p>
              <p className="text-xs md:text-sm text-slate-500">Delivered within 1–2 business days.</p>
            </div>
          </div>

          <span className="self-start font-bold text-secondary sm:self-auto">$8.00</span>
        </label>
      </div>
    </section>
  );
};

export default DeliveryMethodSection;
