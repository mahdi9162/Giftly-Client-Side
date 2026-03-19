import React from 'react';
import Container from '../shared/Container';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="py-10 md:py-14 lg:py-16 px-3 lg:px-0">
      <Container>
        <div className="grid min-h-[65vh] items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* left */}
          <div className="max-w-2xl text-center lg:text-left mx-auto">
            <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
              Smart AI Gift Finder
            </div>

            <h1 className="max-w-2xl text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 ">
              <span className="block">Let AI find the </span>
              <span className="font-script font-normal text-primary "> perfect </span>
              gift for you.
            </h1>

            <p className="mt-5 max-w-xl text-sm md:leading-7 text-slate-600 md:text-lg">
              Discover curated gift ideas or get instant AI recommendations tailored to any occasion, person, and budget.
            </p>

            <div className="mt-8 flex flex-col justify-center lg:justify-start gap-3 sm:flex-row">
              <button className="btn btn-primary rounded-xl px-6 text-white shadow-md">Browse Gifts</button>
              <button className="btn rounded-xl border border-slate-300 bg-white px-6 text-slate-700 shadow-sm hover:bg-slate-50">
                Get AI Suggestions
              </button>
            </div>

            <div className="mt-8 space-y-3 text-sm text-slate-600 md:text-base">
              <p>✓ AI-powered suggestions</p>
              <p>✓ Curated gift collections</p>
              <p>✓ Fast & easy experience</p>
            </div>
          </div>

          {/* right */}
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-4xl bg-linear-to-tr from-pink-100 via-orange-50 to-purple-100 blur-2xl opacity-70" />

            <figure className="overflow-hidden rounded-4xl border border-white/60 bg-white shadow-2xl">
              <Image
                src="/assets/images/hero-gift.webp"
                alt="Elegant gift box with flowers"
                width={600}
                height={600}
                priority
                className="h-full w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
