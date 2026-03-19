import Link from 'next/link';
import { ArrowUpRight, Cake, Gift, Heart, Pencil, User, Users } from 'lucide-react';
import Container from '../shared/Container';

const categories = [
  {
    id: 1,
    title: 'Birthday',
    description: 'Description: Surprise-worthy picks for birthdays big and small.',
    href: '/shop?category=birthday',
    icon: Cake,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
  },
  {
    id: 2,
    title: 'Anniversary',
    description: 'Romantic gifts for meaningful milestones together.',
    href: '/shop?category=anniversary',
    icon: Heart,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-500',
  },
  {
    id: 3,
    title: 'For Him',
    description: 'Thoughtful picks for husbands, dads, brothers, and more.',
    href: '/shop?category=for-him',
    icon: User,
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-500',
  },
  {
    id: 4,
    title: 'For Her',
    description: 'Beautiful gifts for moms, wives, sisters, and friends.',
    href: '/shop?category=for-her',
    icon: Gift,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-500',
  },
  {
    id: 5,
    title: 'Family',
    description: 'Warm, feel-good gifts everyone at home will love.',
    href: '/shop?category=family',
    icon: Users,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-500',
  },
  {
    id: 6,
    title: 'Personalized',
    description: 'Custom keepsakes made to feel one of a kind.',
    href: '/shop?category=personalized',
    icon: Pencil,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-500',
  },
];

const CategorySection = () => {
  return (
    <Container>
      <section className="py-16 md:py-20">
        <div className="relative overflow-hidden rounded-4xl border border-rose-100/70 bg-linear-to-br from-white via-rose-50/50 to-violet-50/40 shadow-[0_24px_80px_rgba(15,23,42,0.06)] p-3 md:p-10 lg:p-14">
          {/* soft background glow */}
          <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-rose-200/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-10 h-40 w-40 rounded-full bg-violet-200/20 blur-3xl" />

          {/* heading */}
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="mb-3 inline-flex rounded-full border border-rose-200/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-sm backdrop-blur-sm">
              Gift Categories
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              <span className="block md:inline">Find the Right</span> <span className="text-primary font-script"> Gift </span> Faster
            </h2>

            <p className="max-w-[250] md:max-w-none mx-auto mt-4 text-sm md:leading-7 text-slate-500 md:text-lg">
              Browse curated picks by occasion, recipient, and gifting style.
            </p>
          </div>

          {/* cards */}
          <div className="relative mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className="group relative flex flex-col overflow-hidden rounded-[35px] border border-slate-200/60 bg-white p-8 shadow-[0_15px_40px_-12px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-3 hover:border-primary/30 hover:shadow-[0_30px_60px_-15px_rgba(236,72,153,0.15)]"
                >
                  {/* Top Glow */}
                  <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Decorative Circle  */}
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-700 group-hover:scale-[3]" />

                  {/* Icon Row */}
                  <div className="relative z-10 mb-5 md:mb-10 flex items-start justify-between">
                    <div
                      className={`flex h-10 md:h-20 w-10 md:w-20 items-center justify-center rounded-3xl ${category.iconBg} ring-4 ring-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-primary/20`}
                    >
                      <Icon className={`h-5 md:h-9 w-5 md:w-9 ${category.iconColor}`} strokeWidth={1.8} />
                    </div>

                    {/* Arrow Button  */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:rotate-45">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 md:text-[26px] transition-colors duration-300 group-hover:text-primary">
                      {category.title}
                    </h3>

                    <p className="mt-4 text-xs md:text-sm leading-relaxed text-slate-500 line-clamp-2">{category.description}</p>
                  </div>

                  {/* Bottom Border Glow */}
                  <div className="absolute inset-x-12 bottom-0 h-0.5 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default CategorySection;
