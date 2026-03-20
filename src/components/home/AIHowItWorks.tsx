import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, User, Calendar, DollarSign, ChevronDown } from 'lucide-react';
import Container from '../shared/Container';

const steps = [
  {
    id: 1,
    icon: User,
    title: 'Choose Person',
    description: "Tell us who you're shopping for — friend, family, or colleague.",
  },
  {
    id: 2,
    icon: Calendar,
    title: 'Select Occasion',
    description: 'Pick the event—birthday, anniversary, or just because.',
  },
  {
    id: 3,
    icon: DollarSign,
    title: 'Set Budget',
    description: 'Choose your price range to match your comfort zone.',
  },
  {
    id: 4,
    icon: Sparkles,
    title: 'Get AI Suggestions',
    description: 'Receive personalized gift ideas in seconds, powered by AI.',
  },
];

const mockProducts = [
  {
    id: 1,
    name: 'Birthday Bliss Box',
    price: '$25.00',
    image: '/assets/images/BirthdayGift.webp',
  },
  {
    id: 2,
    name: 'Elegant Surprise Box',
    price: '$15.00',
    image: '/assets/images/Gift.webp',
  },
];

const AIHowItWorks = () => {
  return (
    <Container>
      <section className="py-16 md:py-20 px-3 lg:px-0">
        {/* Soft framed wrapper — same pattern as CategorySection, violet/slate tint for AI theme */}
        <div className="relative overflow-hidden rounded-4xl border border-violet-100/70 bg-linear-to-br from-white via-violet-50/30 to-slate-50/60 shadow-[0_24px_80px_rgba(15,23,42,0.06)] p-4 md:p-10 lg:p-14">

          {/* Corner glow blobs */}
          <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-violet-200/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-10 h-40 w-40 rounded-full bg-orange-200/15 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          
          {/* LEFT SIDE - Steps Explanation */}
          <div className="max-w-xl">
            {/* Badge */}
            <p className="mb-3 inline-flex rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
              AI Gift Finder
            </p>

            {/* Heading */}
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Find the <span className="font-script font-normal text-primary">Perfect</span> Gift in Seconds
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-500 md:text-base md:leading-7">
              Our AI-powered gift finder takes the guesswork out of gifting. Answer a few simple questions and get personalized recommendations instantly.
            </p>

            {/* Steps */}
            <div className="mt-8 space-y-5">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isFirstStep = index === 0;
                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-4 rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md ${
                      isFirstStep
                        ? 'border-violet-200/80 shadow-[0_8px_20px_-6px_rgba(139,92,246,0.08)]'
                        : 'border-slate-200/60'
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                        isFirstStep ? 'bg-violet-100 text-violet-600' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="mt-12">
              <Link
                href="/ai-gift-finder"
                className="btn btn-primary inline-flex items-center gap-2 rounded-xl px-6 text-white shadow-md"
              >
                <Sparkles className="h-4 w-4" />
                Try AI Gift Finder
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE - Mock AI UI Preview */}
          <div className="relative">

            {/* Mock UI Card */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-6 shadow-[0_24px_60px_-12px_rgba(15,23,42,0.12)] md:p-8">

              {/* Demo badge + helper text */}
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">AI Gift Finder</p>
                <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-0.5 text-xs font-medium text-violet-500">
                  Demo Preview
                </span>
              </div>
              <p className="mb-5 text-xs text-slate-400">Example recommendation flow — try the real thing on the AI page.</p>

              {/* Mock Form */}
              <div className="space-y-4">
                {/* Who dropdown */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Who is this gift for?</label>
                  <div className="flex items-center justify-between rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <span>Friend</span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Occasion dropdown */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">What's the occasion?</label>
                  <div className="flex items-center justify-between rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <span>Birthday</span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Budget dropdown */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">What's your budget?</label>
                  <div className="flex items-center justify-between rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <span>$10 - $30</span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Mock Find Button — soft violet tint, feels alive but clearly not the primary CTA */}
                <button className="w-full rounded-xl border border-violet-200 bg-violet-50 py-3 text-sm font-medium text-violet-600 transition hover:bg-violet-100">
                  See Sample Suggestions
                </button>
              </div>

              {/* Mock Results */}
              <div className="mt-6 border-t border-slate-200 pt-6">
                <p className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Sparkles className="h-4 w-4 text-primary" />
                  AI Suggestions
                </p>

                <div className="space-y-3">
                  {mockProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 rounded-xl border border-slate-200/60 bg-slate-50 p-3"
                    >
                      {/* Product Image */}
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="truncate text-sm font-semibold text-slate-900">{product.name}</h4>
                        <p className="text-xs text-slate-500">{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
        </div>{/* end framed wrapper */}
      </section>
    </Container>
  );
};

export default AIHowItWorks;
