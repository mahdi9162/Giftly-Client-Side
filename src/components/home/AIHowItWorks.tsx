import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  User,
  Calendar,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import Container from "../shared/Container";

const steps = [
  {
    id: 1,
    icon: User,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    title: "Choose Person",
    description:
      "Tell us who you're shopping for — friend, family, or colleague.",
  },
  {
    id: 2,
    icon: Calendar,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    title: "Select Occasion",
    description: "Pick the event—birthday, anniversary, or just because.",
  },
  {
    id: 3,
    icon: DollarSign,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    title: "Set Budget",
    description: "Choose your price range to match your comfort zone.",
  },
  {
    id: 4,
    icon: Sparkles,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    title: "Get AI Suggestions",
    description: "Receive personalized gift ideas in seconds, powered by AI.",
  },
];

const mockResults = [
  {
    id: 1,
    name: "Birthday Bliss Box",
    price: "$25.00",
    image: "/assets/images/BirthdayGift.webp",
  },
  {
    id: 2,
    name: "Elegant Surprise Box",
    price: "$15.00",
    image: "/assets/images/Gift.webp",
  },
];

const AIHowItWorks = () => {
  return (
    <Container>
      <section className="px-3 py-16 md:px-0 md:py-20">
        <div className="relative overflow-hidden rounded-4xl border border-violet-100/70 bg-linear-to-br from-white via-violet-50/30 to-slate-50 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
          {/* soft glow */}
          <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-violet-200/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-10 h-40 w-40 rounded-full bg-orange-200/15 blur-3xl" />

          <div className="relative p-4 sm:p-6 lg:p-10">
            {/* TOP INTRO */}
            <div className="w-full min-w-0">
              <p className="mb-3 inline-flex rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
                AI Gift Finder
              </p>

              <h2 className="max-w-xl text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Find the{" "}
                <span className="font-script font-normal text-primary">
                  Perfect
                </span>{" "}
                Gift in Seconds
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500 md:text-base md:leading-7">
                Our AI-powered gift finder takes the guesswork out of gifting.
                Answer a few simple questions and get personalized
                recommendations instantly.
              </p>
            </div>

            {/* PARENT DIV -> LEFT + RIGHT */}
            <div className="mt-8 flex flex-col gap-8 xl:flex-row xl:items-start xl:gap-10">
              {/* LEFT SIDE */}
              <div className="w-full min-w-0 flex-1">
                <div className="space-y-4">
                  {steps.map((step) => {
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.id}
                        className="w-full max-w-full rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.07)]"
                      >
                        <div className="flex flex-col gap-3">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.iconBg}`}
                          >
                            <Icon
                              className={`h-5 w-5 ${step.iconColor}`}
                              strokeWidth={2}
                            />
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-base font-bold text-slate-900">
                              {step.title}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-slate-500">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-10">
                  <Link
                    href="/ai-gift-finder"
                    className="btn btn-primary inline-flex items-center gap-2 rounded-xl px-6 text-white shadow-md"
                  >
                    <Sparkles className="h-4 w-4" />
                    Try AI Gift Finder
                  </Link>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="w-full min-w-0 flex-1 xl:max-w-[520px]">
                <div className="mx-auto w-full max-w-full rounded-3xl border border-slate-200/70 bg-white p-4 shadow-[0_15px_40px_-12px_rgba(15,23,42,0.08)] sm:p-6">
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-700">
                      AI Gift Finder
                    </p>

                    <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-0.5 text-xs font-medium text-violet-500">
                      Demo Preview
                    </span>
                  </div>

                  <p className="mb-5 text-xs leading-relaxed text-slate-400">
                    Example recommendation flow — try the real thing on the AI
                    page.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Who is this gift for?
                      </label>
                      <div className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                        <span>Friend</span>
                        <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        What&apos;s the occasion?
                      </label>
                      <div className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                        <span>Birthday</span>
                        <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        What&apos;s your budget?
                      </label>
                      <div className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                        <span>$10 - $30</span>
                        <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full rounded-xl border border-violet-200 bg-violet-50 py-3 text-sm font-medium text-violet-600 transition-colors hover:bg-violet-100"
                    >
                      See Sample Suggestions
                    </button>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      AI Suggestions
                    </p>

                    <div className="space-y-3">
                      {mockResults.map((item) => (
                        <div
                          key={item.id}
                          className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
                        >
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END parent div */}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default AIHowItWorks;