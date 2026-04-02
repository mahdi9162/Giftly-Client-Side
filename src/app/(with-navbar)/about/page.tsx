import Image from 'next/image';
import Link from 'next/link';
import { Gift, Sparkles, WandSparkles } from 'lucide-react';
import Container from '@/components/shared/Container';

const highlights = [
  {
    title: 'Curated gifting',
    description: 'Thoughtful products selected for real moments and real people.',
    icon: Gift,
  },
  {
    title: 'Clean experience',
    description: 'A modern shopping flow designed to feel smooth, simple, and premium.',
    icon: Sparkles,
  },
  {
    title: 'AI guidance',
    description: 'Smart recommendations that help users choose gifts with more confidence.',
    icon: WandSparkles,
  },
];

const AboutPage = () => {
  return (
    <section className="relative overflow-hidden">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <Container>
        <div className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
          {/* Hero */}
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
                <Sparkles className="size-4" />
                About Giftly
              </div>

              <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
                Smarter gifting, with a more thoughtful experience.
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 md:text-base">
                Giftly helps people discover meaningful gifts faster through curated products and AI-powered guidance.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/shop" className="btn btn-primary rounded-full px-6 shadow-md shadow-primary/20">
                  Explore Gifts
                </Link>
                <Link
                  href="/ai-gift-finder"
                  className="btn rounded-full border border-slate-300 bg-white px-6 text-slate-800 hover:bg-slate-50"
                >
                  Try AI Finder
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[36px] bg-linear-to-br from-primary/15 via-secondary/10 to-accent/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-4xl border border-white/60 bg-white/70 shadow-xl backdrop-blur">
                <Image
                  src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1200&q=80"
                  alt="Giftly about visual"
                  width={1200}
                  height={900}
                  className="h-80 w-full object-cover md:h-105"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Story strip */}
          <section className="mt-12 rounded-4xl border border-white/60 bg-white/75 p-6 shadow-sm backdrop-blur md:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Our idea</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Less guesswork. Better gifting.</h2>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
                We built Giftly to make gift shopping feel easier, more personal, and less overwhelming. Instead of endless browsing, users
                get a cleaner path to finding something that actually fits the moment.
              </p>
            </div>
          </section>

          {/* Highlights */}
          <section className="mt-12 grid gap-5 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </section>

          {/* CTA */}
          <section className="mt-12 overflow-hidden rounded-4xl border border-orange-200/60 bg-linear-to-br from-orange-100 via-rose-50 to-violet-100 p-6 shadow-sm md:p-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Start exploring</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Find gifts with more confidence.</h2>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/shop" className="btn btn-secondary rounded-full px-6 shadow-md shadow-secondary/20">
                  Shop Now
                </Link>
                <Link href="/contact" className="btn rounded-full border border-slate-300 bg-white px-6 text-slate-800 hover:bg-slate-50">
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </section>
  );
};

export default AboutPage;
