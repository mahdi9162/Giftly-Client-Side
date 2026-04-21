import React from 'react';

const CheckoutHeader = () => {
  return (
    <div className="mb-8 rounded-2xl md:rounded-3xl border border-base-300 bg-linear-to-r from-rose-50 via-orange-50 to-violet-50/60 p-5 shadow-sm md:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-primary">Secure Checkout</p>

          <h1 className="mt-2 text-xl font-bold text-base-content md:text-4xl">Complete Your Order</h1>

          <p className="mt-2 max-w-2xl text-xs text-slate-600/80 md:text-base">
            Fast, secure and elegant checkout experience for your gift purchase.
          </p>
        </div>

        <div className="rounded-2xl border border-white/60 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Estimated Delivery</p>
          <p className="mt-1 font-semibold text-sm md:text-base text-base-content">3–5 Business Days</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;
