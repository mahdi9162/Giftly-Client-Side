'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Quote } from 'lucide-react';
import Container from '../shared/Container';

import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: 'Sarah K.',
    label: 'Verified Buyer',
    context: 'USA · Birthday Gift',
    text: 'The AI suggestions were spot on! Found the perfect birthday gift in seconds.',
  },
  {
    id: 2,
    name: 'James R.',
    label: 'Verified Buyer',
    context: 'UK · Anniversary Gift',
    text: 'Super easy to use and the delivery was faster than expected. Will definitely order again.',
  },
  {
    id: 3,
    name: 'Emily T.',
    label: 'Verified Buyer',
    context: 'Canada · Romantic Gift',
    text: 'Loved the experience. The recommendations actually felt personalized and thoughtful.',
  },
  {
    id: 4,
    name: 'Mark L.',
    label: 'Verified Buyer',
    context: 'Australia · Family Gift',
    text: 'Bought a gift for my mom and she absolutely loved it. The whole process was seamless.',
  },
];

const Testimonials = () => {
  return (
<Container>
  <section className="px-3 py-16 md:px-0 md:py-20">
    {/* Framed wrapper */}
    <div className="relative overflow-hidden rounded-4xl border border-violet-100/70 bg-gradient-to-br from-white via-violet-50/40 to-rose-50/35 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-6 lg:p-10">
      {/* Corner glow blobs */}
      <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-violet-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-40 w-40 rounded-full bg-rose-200/20 blur-3xl" />

      {/* Centered heading */}
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="mb-3 inline-flex rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
          Testimonials
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
          What Our{" "}
          <span className="font-script font-normal text-primary">Customers</span>{" "}
          Say
        </h2>

        <p className="mx-auto mt-4 text-sm leading-relaxed text-slate-500 md:text-base md:leading-7">
          Real experiences from people who found the perfect gift using our platform.
        </p>
      </div>

      {/* Swiper */}
      <div className="relative mt-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 20, centeredSlides: false },
            1024: { slidesPerView: 3, spaceBetween: 24, centeredSlides: false },
          }}
          className="testimonials-swiper !pb-10"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <div className="group flex h-full flex-col rounded-2xl border border-slate-200/60 bg-white/90 p-6 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.11)]">
                {/* Quote icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/8 text-primary/70">
                  <Quote className="h-6 w-6" strokeWidth={2} />
                </div>

                {/* Review text */}
                <p className="flex-1 text-sm leading-relaxed text-slate-600 md:text-base md:leading-7">
                  &ldquo;{item.text}&rdquo;
                </p>

                {/* Divider + user info */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>

                  <div className="mt-1 flex flex-col gap-2 md:flex-row md:items-center">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-400">{item.context}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </section>

  {/* Swiper pagination dot styles + active slide emphasis */}
  <style jsx global>{`
    .testimonials-swiper .swiper-pagination-bullet {
      background: #cbd5e1;
      opacity: 1;
      transition: all 0.3s ease;
    }

    .testimonials-swiper .swiper-pagination-bullet-active {
      background: #ec4899;
      width: 20px;
      border-radius: 999px;
    }

    .testimonials-swiper .swiper-slide {
      opacity: 0.5;
      transform: scale(0.97);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .testimonials-swiper .swiper-slide-active {
      opacity: 1;
      transform: scale(1);
    }

    @media (min-width: 768px) {
      .testimonials-swiper .swiper-slide {
        opacity: 1;
        transform: scale(1);
      }
    }
  `}</style>
</Container>
  );
};

export default Testimonials;
