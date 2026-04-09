import React from 'react';
import { BadgeDollarSign, CircleAlert, ClipboardCheck, PackageOpen, RefreshCcw, ShieldCheck } from 'lucide-react';
import Container from '@/components/shared/Container';
import Link from 'next/link';

const refundSections = [
  {
    icon: BadgeDollarSign,
    title: 'Eligibility for Refunds',
    content:
      'Refund requests are accepted for eligible orders that arrive damaged, incorrect, or fail to match the confirmed order details. To qualify, requests should be submitted within the allowed refund request period after delivery.',
  },
  {
    icon: CircleAlert,
    title: 'Non-Refundable Situations',
    content:
      'We may not be able to offer refunds for items damaged after delivery, incorrect orders caused by customer input errors, or requests made long after the stated refund window has passed.',
  },
  {
    icon: ClipboardCheck,
    title: 'How to Request a Refund',
    content:
      'To request a refund, contact our support team with your order number, a short explanation of the issue, and any helpful photo evidence if the product arrived damaged or incorrect.',
  },
  {
    icon: PackageOpen,
    title: 'Review & Verification Process',
    content:
      'Once we receive your refund request, our team will review the case and verify the issue. Additional information may be requested to help us resolve the matter fairly and accurately.',
  },
  {
    icon: RefreshCcw,
    title: 'Refund Processing Time',
    content:
      'Approved refunds are usually processed within a few business days. Depending on your payment provider, the refunded amount may take additional time to appear in your original payment method.',
  },
  {
    icon: ShieldCheck,
    title: 'Fair Resolution Policy',
    content:
      'Our goal is to provide a transparent and customer-friendly resolution process. When a full refund is not applicable, we may offer an alternative solution such as replacement, exchange, or store support where appropriate.',
  },
];

const RefundPolicyPage = () => {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="space-y-8">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-4xl border border-slate-200/70 bg-linear-to-br from-white via-fuchsia-50/40 to-orange-50/30 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] md:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-fuchsia-200/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-orange-200/20 blur-3xl" />

            <div className="relative max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-100 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-500">
                <RefreshCcw className="h-3.5 w-3.5" />
                Refund Policy
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Refund Policy</h1>

              <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                We want every Giftly purchase to feel safe and trustworthy. This page explains when refunds may apply, how to request them,
                and how our review process works.
              </p>

              <p className="mt-3 text-sm font-medium text-slate-500">Last updated: April 2026</p>
            </div>
          </div>

          {/* Intro */}
          <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <p className="text-sm leading-7 text-slate-600 md:text-[15px]">
              Our refund policy is designed to be clear, fair, and easy to understand. If something goes wrong with your order, we encourage
              you to reach out quickly so we can review the situation and help you with the best possible resolution.
            </p>
          </div>

          {/* Mapped sections */}
          <div className="grid gap-4">
            {refundSections.map((section, index) => {
              const Icon = section.icon;

              return (
                <div
                  key={index}
                  className="rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:border-fuchsia-100 hover:shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-6"
                >
                  <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-fuchsia-50">
                      <Icon className="h-5 w-5 text-fuchsia-500" />
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

          {/* CTA */}
          <div className="rounded-[30px] bg-linear-to-r from-rose-500 via-pink-500 to-fuchsia-500 p-6 text-white shadow-[0_24px_60px_rgba(217,70,239,0.22)] md:p-8">
            <h2 className="text-2xl font-semibold">Need help with a refund request?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/85 md:text-base">
              If your order has an issue or you believe you qualify for a refund, please contact our support team with your order details so
              we can review it quickly.
            </p>

            <Link
              href="/contact"
              className="btn mt-5 rounded-2xl border-0 bg-white px-5 py-3 text-sm font-semibold text-fuchsia-500 shadow-md transition hover:scale-[1.03] hover:bg-white cursor-pointer"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RefundPolicyPage;
