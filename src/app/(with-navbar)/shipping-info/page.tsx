import React from 'react';
import { Truck, PackageCheck, Clock3, MapPinned, ShieldCheck, CircleHelp } from 'lucide-react';
import Container from '@/components/shared/Container';
import Link from 'next/link';

const shippingSections = [
  {
    icon: Clock3,
    title: 'Processing Time',
    content:
      'Orders are usually processed within 1–2 business days before shipment. During busy seasons, order preparation may take a little longer depending on demand.',
  },
  {
    icon: Truck,
    title: 'Estimated Delivery Time',
    content:
      'Standard delivery typically takes 3–7 business days after dispatch. Delivery times may vary depending on your location, courier service, and public holidays.',
  },
  {
    icon: PackageCheck,
    title: 'Order Tracking',
    content:
      'Once your order has been shipped, you will receive a tracking update so you can monitor your package and stay informed about its delivery progress.',
  },
  {
    icon: MapPinned,
    title: 'Shipping Coverage',
    content:
      'We currently deliver to selected local and international regions. Shipping availability may depend on your address, courier network, and product type.',
  },
  {
    icon: ShieldCheck,
    title: 'Packaging & Delivery Care',
    content:
      'Every order is packed carefully to help protect your gift during transit. We work to ensure your items arrive in good condition and with a premium unboxing feel.',
  },
  {
    icon: CircleHelp,
    title: 'Delays & Support',
    content:
      'Occasional delays may happen because of weather, logistics issues, or high seasonal demand. If your shipment takes longer than expected, our support team is here to help.',
  },
];

const ShippingInfoPage = () => {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="space-y-8">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-4xl border border-slate-200/70 bg-linear-to-br from-white via-orange-50/40 to-rose-50/30 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] md:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-200/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-rose-200/20 blur-3xl" />

            <div className="relative max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
                <Truck className="h-3.5 w-3.5" />
                Shipping
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Shipping Info</h1>

              <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                We want every Giftly order to arrive smoothly and safely. This page explains how shipping works, how long delivery may take,
                and what to expect after placing your order.
              </p>

              <p className="mt-3 text-sm font-medium text-slate-500">Last updated: April 2026</p>
            </div>
          </div>

          {/* Intro note */}
          <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <p className="text-sm leading-7 text-slate-600 md:text-[15px]">
              Our goal is to make shipping simple, transparent, and reliable. From order processing to delivery updates, we aim to keep you
              informed at every step of the journey.
            </p>
          </div>

          {/* Shipping sections */}
          <div className="grid gap-4">
            {shippingSections.map((section, index) => {
              const Icon = section.icon;

              return (
                <div
                  key={index}
                  className="rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:border-orange-100 hover:shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-6"
                >
                  <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50">
                      <Icon className="h-5 w-5 text-orange-500" />
                    </div>

                    <div>
                      <h2 className="text-center text-lg font-semibold text-slate-900 md:text-start">{section.title}</h2>
                      <p className="mt-3 text-justify text-sm leading-5 text-slate-600 md:text-start md:text-[15px]">{section.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="rounded-[30px] bg-linear-to-r from-rose-500 via-pink-500 to-fuchsia-500 p-6 text-white shadow-[0_24px_60px_rgba(249,115,22,0.22)] md:p-8">
            <h2 className="text-2xl font-semibold">Need help with your delivery?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/85 md:text-base">
              If you have questions about shipping timelines, tracking, or delivery issues, our support team is ready to help you.
            </p>

            <Link
              href="/contact"
              className="btn mt-5 rounded-2xl border-0 bg-white px-5 py-3 text-sm font-semibold text-orange-500 shadow-md transition hover:scale-[1.03] hover:bg-white cursor-pointer"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ShippingInfoPage;
