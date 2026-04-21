import { ShieldCheck, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const OrderSummaryCard = () => {
  return (
    <section className="sticky min-w-0 lg:sticky lg:top-24 rounded-3xl border border-rose-100 bg-linear-to-br from-white via-rose-50/40 to-orange-50/30 p-5 shadow-sm md:p-6">
      <div className="mb-5 flex min-w-0 items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-primary">
          <ShoppingBag className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-base-content sm:text-xl">Order Summary</h2>
          <p className="text-xs md:text-sm text-slate-500">3 items in your cart</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
          <div className="h-14 w-14 shrink-0 rounded-2xl bg-base-200" />

          <div className="min-w-0 flex-1">
            <p className=" font-medium line-clamp-1 text-sm text-base-content">Elegant Personalized Gift Box</p>
            <div className="flex justify-between mt-3">
              <p className="text-sm text-slate-500">Qty: 2</p>
              <p className="shrink-0 text-sm md:text-base font-semibold text-primary">$108</p>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
          <div className="h-14 w-14 shrink-0 rounded-2xl bg-base-200" />

          <div className="min-w-0 flex-1">
            <p className=" font-medium line-clamp-2 text-sm text-base-content">Elegant Personalized Gift Box</p>
            <div className="flex justify-between">
              <p className="text-sm text-slate-500">Qty: 2</p>
              <p className="shrink-0 text-sm md:text-base font-semibold text-primary">$108</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 border-t border-dashed border-base-300" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Subtotal</span>
          <span className="shrink-0 font-medium">$146.00</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Shipping</span>
          <span className="shrink-0 font-medium text-secondary">$8.00</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Tax</span>
          <span className="shrink-0 font-medium">$4.00</span>
        </div>
      </div>

      <div className="my-5 border-t border-base-300" />

      <div className="flex items-center justify-between gap-4">
        <span className="text-base font-semibold text-base-content">Total</span>
        <span className="shrink-0 text-xl md:text-2xl font-bold text-accent">$158.00</span>
      </div>

      <button className="btn mt-6 h-10 md:h-12 w-full rounded-2xl border-0 bg-linear-to-r from-primary to-[#ff6eb4] text-white shadow-[0_16px_30px_-12px_rgba(236,72,153,0.45)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_20px_40px_-12px_rgba(236,72,153,0.55)]">
        Place Order
      </button>

      <Link href="/shop" className="btn mt-3 h-10 md:h-12 w-full rounded-2xl border-rose-100 bg-white text-base-content hover:bg-rose-50">
        Continue Shopping
      </Link>

      <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
        <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
        SSL secured checkout
      </div>
    </section>
  );
};

export default OrderSummaryCard;
