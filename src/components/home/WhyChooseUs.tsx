import { Truck, Sparkles, BadgeCheck, ShoppingCart } from 'lucide-react';
import Container from '../shared/Container';

const features = [
  {
    id: 1,
    icon: Truck,
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    title: 'Fast Delivery',
    description: 'Get your gifts delivered quickly and reliably.',
  },
  {
    id: 2,
    icon: Sparkles,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    title: 'Smart AI Suggestions',
    description: 'Our AI understands preferences and recommends the perfect match.',
  },
  {
    id: 3,
    icon: BadgeCheck,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: 'Quality Products',
    description: 'Handpicked items that ensure quality and satisfaction.',
  },
  {
    id: 4,
    icon: ShoppingCart,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    title: 'Easy Checkout',
    description: 'A smooth and secure checkout experience every time.',
  },
];

const WhyChooseUs = () => {
  return (
<Container>
  <section className="px-3 py-16 md:px-0 md:py-20">
    <div className="relative overflow-hidden rounded-4xl border border-violet-100/70 
    bg-gradient-to-br from-white via-primary/5 to-secondary/5 
    p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8 lg:p-12">

      {/* Soft Brand Glow (NO animation) */}
      <div className="pointer-events-none absolute -left-20 top-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-40 w-40 rounded-full bg-secondary/15 blur-3xl" />

      {/* Header */}
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
          Why Choose Us
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Designed to Make Gifting{" "}
          <span className="text-primary">Effortless</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base md:leading-7">
          We combine smart AI recommendations with curated products to deliver a seamless gifting experience.
        </p>
      </div>

      {/* Cards */}
      <div className="relative mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.id}
              className="group flex flex-col rounded-2xl border border-slate-200/60 
              bg-white p-6 
              shadow-[0_6px_20px_-6px_rgba(15,23,42,0.08)] 
              transition-all duration-300 
              hover:-translate-y-1 
              hover:shadow-[0_14px_30px_-12px_rgba(15,23,42,0.12)]"
            >
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg} ring-1 ring-black/5`}>
                <Icon className={`h-5 w-5 ${feature.iconColor}`} strokeWidth={2.1} />
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
</Container>
  );
};

export default WhyChooseUs;
