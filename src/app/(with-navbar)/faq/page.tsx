'use client';

import React, { useState } from 'react';
import { ChevronDown, MessageCircleQuestion, Mail, ArrowRight, PackageCheck, RefreshCcw, FileText } from 'lucide-react';
import Container from '@/components/shared/Container';
import Link from 'next/link';

const faqs = [
  {
    question: 'How does the AI Gift Finder work?',
    answer:
      'Giftly’s AI Gift Finder analyzes the occasion, recipient type, and budget you provide, then recommends the most suitable gift ideas based on those preferences.',
  },
  {
    question: 'Can I track my order after placing it?',
    answer: 'Yes. Once your order is placed, you can track its progress from your dashboard under the “My Orders” section.',
  },
  {
    question: 'What payment methods do you support?',
    answer: 'We support secure online payments through Stripe, including major debit and credit cards.',
  },
  {
    question: 'Do you offer Cash on Delivery?',
    answer:
      'Yes, Cash on Delivery may be available for selected locations. If your area is eligible, you will see the option during checkout.',
  },
  {
    question: 'How long does delivery usually take?',
    answer: 'Delivery time depends on your location, but most orders are delivered within the estimated window shown at checkout.',
  },
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="bg-base-200/50 py-20 md:py-28 transition-colors duration-300">
      <Container>
        {/* Header Section with Brand Gradient Text */}
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-[12px] font-bold uppercase tracking-[0.2em] text-primary">
            <MessageCircleQuestion className="h-4 w-4" />
            Help Center
          </div>
          <h1 className="text-4xl font-black tracking-tight text-base-content md:text-5xl">
            Questions?{' '}
            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">We have answers.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-base-content/70">
            Everything you need to know about Giftly’s smart recommendations and secure shopping experience.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-[320px_1fr]">
          {/* Left Side: Brand Visual Sidebar */}
          <div className="hidden space-y-8 lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-base-content/40">Quick Access</h3>
                {[
                  {
                    icon: PackageCheck,
                    label: 'Shipping Info',
                    color: 'text-indigo-500',
                    href: '/shipping-info',
                  },
                  {
                    icon: FileText,
                    label: 'Privacy Policy',
                    color: 'text-slate-500',
                    href: '/privacy-policy',
                  },
                  {
                    icon: RefreshCcw,
                    label: 'Refund Policy',
                    color: 'text-emerald-500',
                    href: '/refund-policy',
                  },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="group flex items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-4 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                      <span className="text-sm font-bold text-base-content/80 group-hover:text-primary">{item.label}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 text-primary" />
                  </Link>
                ))}
              </div>

              {/* Support Card with Brand Gradient Background */}
              <div className="relative overflow-hidden rounded-4xl bg-slate-900 p-8 text-white shadow-2xl">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl"></div>
                <p className="relative z-10 text-xs font-bold uppercase tracking-widest text-primary">Direct Contact</p>
                <h4 className="relative z-10 mt-3 text-xl font-bold">Still confused?</h4>
                <p className="relative z-10 mt-3 text-sm leading-relaxed text-slate-400">Our support heroes are ready to guide you 24/7.</p>
                <button className="relative z-10 mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-black text-slate-900 transition hover:scale-[1.02] active:scale-95">
                  <Mail className="h-4 w-4" />
                  Email Support
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Professional Minimalist Accordion */}
          <div className="space-y-5">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={index}
                  className={`group overflow-hidden rounded-4xl border transition-all duration-500 ${
                    isOpen
                      ? 'border-primary/20 bg-base-100 shadow-2xl shadow-primary/5'
                      : 'border-base-300 bg-base-100/50 hover:bg-base-100 hover:shadow-xl'
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-8 py-7 text-left"
                  >
                    <span
                      className={`pr-4 text-lg font-bold transition-colors duration-300 md:text-xl ${isOpen ? 'text-primary' : 'text-base-content'}`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${isOpen ? 'bg-primary text-white rotate-180 shadow-lg shadow-primary/30' : 'bg-base-300 text-base-content/40 group-hover:bg-primary/10 group-hover:text-primary'}`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-base-300/50 px-8 pb-8 pt-4">
                        <p className="text-[16px] leading-8 text-base-content/60">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Brand CTA */}
        <div className="relative mt-24 overflow-hidden rounded-[3rem] bg-base-100 p-1 border border-base-300 shadow-2xl">
          <div className="flex flex-col items-center justify-between gap-8 rounded-[2.8rem] bg-base-100 px-8 py-10 md:flex-row md:px-16">
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl font-black text-base-content">Didn&apos;t find what you need?</h2>
              <p className="mt-2 text-base-content/60 font-medium">
                Send us a message and we&apos;ll get back to you faster than you can wrap a gift!
              </p>
            </div>
            <Link
              href={'/contact'}
              className="relative z-10 group flex items-center gap-3 overflow-hidden rounded-2xl bg-primary px-10 py-4 text-base font-black text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/40 active:scale-95"
            >
              <span>Contact Support</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            {/* Background Decorative Blur */}
            <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-accent/10 blur-3xl"></div>
            <div className="absolute -left-10 -top-10 h-40 w-40 bg-secondary/10 blur-3xl"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FaqPage;
