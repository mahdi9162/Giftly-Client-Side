import React from 'react';
import { ShieldCheck, Lock, Database, Mail, Cookie, RefreshCcw } from 'lucide-react';
import Container from '@/components/shared/Container';
import Link from 'next/link';

const sections = [
  {
    icon: ShieldCheck,
    title: 'Information We Collect',
    content:
      'We may collect personal information such as your name, email address, phone number, shipping address, and order details when you use Giftly or make a purchase.',
  },
  {
    icon: Database,
    title: 'How We Use Your Information',
    content:
      'We use your information to process orders, improve our services, provide customer support, personalize recommendations, and communicate important updates related to your account or purchases.',
  },
  {
    icon: Lock,
    title: 'How We Protect Your Data',
    content:
      'We take reasonable security measures to protect your personal information. Payment processing is handled through secure third-party providers, and we do not store sensitive payment details directly.',
  },
  {
    icon: Cookie,
    title: 'Cookies and Tracking',
    content:
      'Giftly may use cookies and similar technologies to improve browsing experience, remember preferences, analyze usage patterns, and enhance overall site performance.',
  },
  {
    icon: RefreshCcw,
    title: 'Sharing and Third-Party Services',
    content:
      'We may share limited information with trusted third-party services such as payment processors, shipping partners, and analytics tools only when necessary to operate and improve our service.',
  },
  {
    icon: Mail,
    title: 'Contact and Policy Updates',
    content:
      'We may update this Privacy Policy from time to time. If you have any questions about how your data is handled, you can contact us through our support or contact page.',
  },
];

const PrivacyPolicyPage = () => {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="space-y-8">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-4xl border border-slate-200/70 bg-linear-to-br from-white via-rose-50/40 to-fuchsia-50/30 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] md:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-fuchsia-200/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-rose-200/20 blur-3xl" />

            <div className="relative max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-500">
                <ShieldCheck className="h-3.5 w-3.5" />
                Legal
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Privacy Policy</h1>

              <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                Your privacy matters to us. This page explains what information we collect, how we use it, and the steps we take to keep
                your data secure while you use Giftly.
              </p>

              <p className="mt-3 text-sm font-medium text-slate-500">Last updated: April 2026</p>
            </div>
          </div>

          {/* Intro note */}
          <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <p className="text-sm leading-7 text-slate-600 md:text-[15px]">
              By using Giftly, you agree to the collection and use of information in accordance with this Privacy Policy. We are committed
              to keeping your information safe and using it only in ways that support your experience with our platform.
            </p>
          </div>

          {/* Policy sections */}
          <div className="grid gap-4">
            {sections.map((section, index) => {
              const Icon = section.icon;

              return (
                <div
                  key={index}
                  className="rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:border-rose-100 hover:shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-6"
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50">
                      <Icon className="h-5 w-5 text-rose-500" />
                    </div>

                    <div>
                      <h2 className="text-lg text-center md:text-start font-semibold text-slate-900">{section.title}</h2>
                      <p className="mt-3 text-sm text-justify md:text-start leading-5 text-slate-600 md:text-[15px]">{section.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="rounded-[30px] bg-linear-to-r from-rose-500 via-pink-500 to-fuchsia-500 p-6 text-white shadow-[0_24px_60px_rgba(244,63,94,0.25)] md:p-8">
            <h2 className="text-2xl font-semibold">Questions about your privacy?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/85 md:text-base">
              If you need clarification about how your data is handled, reach out to our support team. We’ll be happy to help.
            </p>

            <Link
              href={'/contact'}
              className="btn mt-5 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-rose-500 shadow-md transition hover:scale-[1.03] cursor-pointer"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PrivacyPolicyPage;
