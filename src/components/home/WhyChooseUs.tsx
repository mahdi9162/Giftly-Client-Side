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
  <section className="px-3 py-16 md:px-0 md:py-24">
    {/* Main Framed Wrapper */}
    <div className="relative overflow-hidden rounded-[45px] border border-slate-200/50 bg-white p-6 shadow-[0_35px_100px_-20px_rgba(15,23,42,0.08)] sm:p-10 lg:p-16">
      
      {/*  Brand Glow Blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-secondary/15 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />

      {/* Header Block */}
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-5 inline-flex rounded-full border border-primary/20 bg-primary/5 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary shadow-sm">
          Why Choose Us
        </p>

        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
          Designed to Make Gifting{' '}
          <span className="font-script font-normal text-primary">Effortless</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-lg">
          We combine smart AI recommendations with curated products to deliver a seamless gifting experience.
        </p>
      </div>

      {/* Feature Cards Grid */}
  <div className="relative mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
  {features.map((feature) => {
    const Icon = feature.icon;
    return (
      <div
        key={feature.id}
        /* Card */
        className="group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-slate-200/50 bg-linear-to-br from-white via-slate-50/30 to-primary/5 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_30px_70px_-20px_rgba(236,72,153,0.15)]"
      >
        {/* Inner Glow */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Icon Container */}
        <div className={`relative mb-8 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.iconBg} ring-1 ring-black/5 shadow-md transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
          <Icon className={`h-6 w-6 ${feature.iconColor}`} strokeWidth={2.2} />
        </div>

        {/* Text Content */}
        <div className="relative mt-auto">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-primary">
            {feature.title}
          </h3>
          <p className="mt-3 text-xs md:text-sm leading-relaxed text-slate-500">
            {feature.description}
          </p>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary to-secondary transition-all duration-500 group-hover:w-full" />
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
