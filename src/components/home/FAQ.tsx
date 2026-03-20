'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Container from '../shared/Container';

const faqs = [
  {
    id: 1,
    question: 'How long does delivery take?',
    answer: 'Most orders are delivered within 3–5 business days, depending on your location.',
  },
  {
    id: 2,
    question: 'Can I request a refund?',
    answer: 'Yes, we offer a simple refund process for eligible orders. Please review our refund policy for details.',
  },
  {
    id: 3,
    question: 'How does the AI Gift Finder work?',
    answer: 'Our AI considers the person, occasion, and budget you choose to suggest thoughtful gift options.',
  },
  {
    id: 4,
    question: 'Are the recommendations personalized?',
    answer: 'Yes, the suggestions are tailored based on the details you provide.',
  },
];

const FAQ = () => {
  // only one item open at a time; null means all closed
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Container>
      <section className="py-16 md:py-20 px-3 md:px-0">

        {/* Framed wrapper — same pattern as Testimonials / AIHowItWorks */}
        <div className="relative overflow-hidden rounded-4xl border border-slate-200/70 bg-linear-to-br from-white via-slate-50/60 to-violet-50/20 shadow-[0_24px_80px_rgba(15,23,42,0.06)] p-4 sm:p-6 lg:p-10">

          {/* Corner glow blobs */}
          <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-violet-200/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-10 h-40 w-40 rounded-full bg-orange-200/15 blur-3xl" />

          {/* Centered heading — same as other sections */}
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="mb-3 inline-flex rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
              FAQ
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Questions, Answered
            </h2>

            <p className="mx-auto mt-4 text-sm leading-relaxed text-slate-500 md:text-base md:leading-7">
              Everything you need to know before finding the perfect gift.
            </p>
          </div>

          {/* Accordion list */}
          <div className="relative mx-auto mt-10 max-w-3xl space-y-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? 'border-primary/30 bg-primary/5 shadow-[0_8px_24px_-6px_rgba(15,23,42,0.10)]'
                      : 'border-slate-200/60 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)] hover:shadow-[0_6px_20px_-4px_rgba(15,23,42,0.09)] hover:-translate-y-0.5'
                  }`}
                >
                  {/* Left accent bar — visible only when open */}
                  <div
                    className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-primary transition-opacity duration-300 ${
                      isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Question row — clickable */}
                  <button
                    onClick={() => toggle(faq.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className={`text-sm font-semibold md:text-base transition-colors duration-200 ${isOpen ? 'text-primary' : 'text-slate-900'}`}>
                      {faq.question}
                    </span>

                    {/* Chevron — rotates and tints when open */}
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                        isOpen ? 'rotate-180 text-primary' : 'text-slate-400'
                      }`}
                      strokeWidth={2}
                    />
                  </button>

                  {/* Answer — expands smoothly */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-40' : 'max-h-0'
                    }`}
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-slate-500 md:text-base md:leading-7">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Bottom helper text */}
            <p className="pt-2 text-center text-sm text-slate-400">
              Still have questions?{' '}
              <a href="/contact" className="font-medium text-primary transition hover:underline">
                Contact us
              </a>
            </p>
          </div>

        </div>
      </section>
    </Container>
  );
};

export default FAQ;
