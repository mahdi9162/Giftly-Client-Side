'use client';

import Link from 'next/link';
import Lottie from 'lottie-react';
import { ArrowRight, CheckCircle2, Home } from 'lucide-react';
import paymentSuccessAnimation from '../../../../../public/assets/animations/Payment Successful Animation.json';

const CheckoutSuccessPage = () => {
  return (
    <section className="min-h-screen overflow-x-hidden bg-linear-to-br from-[#fff8f3] via-[#fff1f2] to-[#fff7ed] px-4 py-8 md:px-6 md:py-14">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-[0_24px_70px_-45px_rgba(236,72,153,0.65)]">
          <div className="grid w-full md:grid-cols-2">
            {/* Animation */}
            <div className="flex items-center justify-center bg-linear-to-br from-rose-50 via-orange-50 to-white px-4 py-8 sm:px-6 md:px-8 md:py-12">
              <div className="w-full max-w-65 rounded-3xl border border-white bg-white/80 p-3 shadow-[0_18px_50px_-32px_rgba(236,72,153,0.9)] sm:max-w-[320px] sm:p-4 md:max-w-90">
                <Lottie animationData={paymentSuccessAnimation} loop className="h-auto w-full" />
              </div>
            </div>

            {/* Content */}
            <div className="flex items-center px-5 py-8 sm:px-8 md:px-10 md:py-12">
              <div className="w-full min-w-0 text-center md:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-600 sm:text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  Payment confirmed
                </div>

                <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                  Thank you for your order!
                </h1>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500 sm:text-base md:mx-0">
                  Your payment was successful and your Giftly order has been placed successfully. We&apos;ll begin processing it shortly.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2 md:max-w-md">
                  <Link
                    href="/shop"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-primary to-[#ff6eb4] px-5 text-sm font-semibold text-white shadow-[0_16px_35px_-18px_rgba(236,72,153,0.9)] transition hover:scale-[1.01]"
                  >
                    Continue Shopping
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-orange-100 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-orange-50"
                  >
                    <Home className="h-4 w-4" />
                    Go Home
                  </Link>
                </div>

                <div className="mt-6 rounded-2xl bg-rose-50/70 px-4 py-4 text-sm leading-6 text-slate-500 md:max-w-md">
                  Order updates will be available once processing begins.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSuccessPage;
