"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Container from "../shared/Container";

const bullets = [
  "Curated gift picks for every occasion",
  "Seasonal ideas delivered to your inbox",
  "No spam. Unsubscribe anytime.",
];

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to newsletter service
    setEmail("");
  };

  return (
    <Container>
      <section className="px-3 py-16 md:px-0 md:py-20">
        <div className="relative overflow-hidden rounded-4xl border border-primary/10 bg-gradient-to-br from-white via-primary/5 to-secondary/5 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
          {/* glow blobs */}
          <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative grid gap-10 p-5 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">

            {/* LEFT — messaging */}
            <div className="flex flex-col justify-center">
              <p className="inline-flex w-fit rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
                Newsletter
              </p>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Get Gift Ideas <br className="hidden sm:block" />
                Every Week
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 md:text-base md:leading-7">
                Join thousands of thoughtful gifters who never run out of ideas.
              </p>

              <ul className="mt-6 space-y-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — form card */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md rounded-3xl border border-slate-200/70 bg-white p-5 shadow-[0_15px_40px_-12px_rgba(15,23,42,0.10)]">
                <p className="text-lg font-bold text-slate-900">
                  Stay in the loop
                </p>
                <p className="mt-1.5 text-sm text-slate-500">
                  Drop your email and we&apos;ll handle the rest.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/10"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary w-full rounded-xl py-3.5 text-sm font-semibold text-white shadow-md"
                  >
                    Subscribe Now
                  </button>
                </form>

                <p className="mt-4 text-center text-xs text-slate-400">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Container>
  );
};

export default NewsletterCTA;
