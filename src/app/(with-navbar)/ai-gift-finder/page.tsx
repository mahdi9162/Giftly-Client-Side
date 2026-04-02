'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Sparkles, Wand2, ArrowRight, Brain, Gift, UserRound, PartyPopper, BadgeDollarSign } from 'lucide-react';
import Container from '@/components/shared/Container';

type FormData = {
  person: string;
  occasion: string;
  budget: string;
  interests: string[];
};

type Recommendation = {
  id: number;
  title: string;
  category: string;
  price: string;
  reason: string;
};

const interestOptions = ['Tech', 'Gaming', 'Coffee', 'Books', 'Fashion', 'Fitness', 'Travel', 'Music', 'Skincare', 'Home Decor'];

const AIGiftFinderPage = () => {
  const [showResults, setShowResults] = useState(false);
  const [summary, setSummary] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      person: '',
      occasion: '',
      budget: '',
      interests: [],
    },
  });

  const selectedInterests =
    useWatch({
      control,
      name: 'interests',
    }) ?? [];

  const toggleInterest = (interest: string) => {
    const current = selectedInterests || [];

    if (current.includes(interest)) {
      setValue(
        'interests',
        current.filter((item) => item !== interest),
        { shouldValidate: true },
      );
    } else {
      setValue('interests', [...current, interest], {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const interestsText = data.interests.length > 0 ? ` focused on ${data.interests.join(', ')}` : '';

    setSummary(
      `These suggestions are based on a ${data.occasion.toLowerCase()} gift for ${
        data.person
      } within a ${data.budget} budget${interestsText}.`,
    );

    setRecommendations([
      {
        id: 1,
        title: 'Personalized Memory Box',
        category: 'Thoughtful Pick',
        price: '$34',
        reason: 'A personal and emotional gift direction that fits many special occasions.',
      },
      {
        id: 2,
        title: 'Curated Premium Gift Set',
        category: 'Balanced Choice',
        price: '$42',
        reason: 'Looks premium, feels practical, and works well within a flexible budget range.',
      },
      {
        id: 3,
        title: 'Custom Keepsake Frame',
        category: 'Sentimental Gift',
        price: '$28',
        reason: 'Good option for a meaningful gift without making the budget feel heavy.',
      },
    ]);

    setShowResults(true);
  };

  return (
    <section className="bg-linear-to-br from-rose-50 via-orange-50/30 to-violet-50/40">
      <Container>
        <div className="px-4 py-10 md:px-6 md:py-14">
          {/* Top intro */}
          <div className="mb-8 rounded-4xl border border-white/60 bg-white/75 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.05)] backdrop-blur md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-primary">
                  <Sparkles className="size-4" />
                  AI Gift Finder
                </div>

                <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900 md:text-4xl lg:text-5xl">
                  Get smarter gift ideas, faster.
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                  Select who the gift is for, the occasion, budget, and a few interests. Then Giftly shows AI-style gift directions that
                  feel more relevant and thoughtful.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:w-105">
                <div className="rounded-2xl border border-rose-100 bg-linear-to-br from-rose-50 to-white p-4 shadow-sm">
                  <UserRound className="size-5 text-primary" />
                  <p className="mt-3 text-sm font-bold text-slate-900">Person-based</p>
                </div>

                <div className="rounded-2xl border border-orange-100 bg-linear-to-br from-orange-50 to-white p-4 shadow-sm">
                  <PartyPopper className="size-5 text-secondary" />
                  <p className="mt-3 text-sm font-bold text-slate-900">Occasion-aware</p>
                </div>

                <div className="rounded-2xl border border-violet-100 bg-linear-to-br from-violet-50 to-white p-4 shadow-sm">
                  <Brain className="size-5 text-accent" />
                  <p className="mt-3 text-sm font-bold text-slate-900">AI-style logic</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tool area */}
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            {/* Form side */}
            <div className="rounded-4xl border border-white/70 bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)] md:p-8">
              <div className="mb-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">Gift Input</p>
                <h2 className="mt-3 text-2xl font-black text-slate-900 md:text-3xl">Describe your gift need</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Clean inputs make the recommendation feel smarter and more targeted.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Person */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-800">Who is this for?</label>
                  <select
                    {...register('person', {
                      required: 'Please select a person',
                    })}
                    defaultValue=""
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                  >
                    <option value="" disabled>
                      Select a person
                    </option>
                    <option value="friend">Friend</option>
                    <option value="girlfriend">Girlfriend</option>
                    <option value="boyfriend">Boyfriend</option>
                    <option value="mom">Mom</option>
                    <option value="dad">Dad</option>
                    <option value="sibling">Sibling</option>
                    <option value="colleague">Colleague</option>
                  </select>
                  {errors.person && <p className="mt-2 text-sm font-medium text-rose-500">{errors.person.message}</p>}
                </div>

                {/* Occasion */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-800">Occasion</label>
                  <select
                    {...register('occasion', {
                      required: 'Please select an occasion',
                    })}
                    defaultValue=""
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10"
                  >
                    <option value="" disabled>
                      Select an occasion
                    </option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="wedding">Wedding</option>
                    <option value="graduation">Graduation</option>
                    <option value="valentine">Valentine</option>
                    <option value="surprise">Just Because</option>
                  </select>
                  {errors.occasion && <p className="mt-2 text-sm font-medium text-rose-500">{errors.occasion.message}</p>}
                </div>

                {/* Budget */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-800">Budget</label>
                  <select
                    {...register('budget', {
                      required: 'Please select a budget range',
                    })}
                    defaultValue=""
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                  >
                    <option value="" disabled>
                      Select a budget
                    </option>
                    <option value="under $25">Under $25</option>
                    <option value="$25 - $50">$25 - $50</option>
                    <option value="$50 - $100">$50 - $100</option>
                    <option value="$100+">$100+</option>
                  </select>
                  {errors.budget && <p className="mt-2 text-sm font-medium text-rose-500">{errors.budget.message}</p>}
                </div>

                {/* Interests */}
                <div>
                  <label className="mb-3 block text-sm font-bold text-slate-800">
                    Interests <span className="text-slate-400">(optional)</span>
                  </label>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {interestOptions.map((interest) => {
                      const isSelected = selectedInterests.includes(interest);

                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${
                            isSelected
                              ? 'border-primary bg-linear-to-r from-primary to-fuchsia-500 text-white shadow-md shadow-primary/20'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-primary/20 hover:bg-white'
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn h-14 w-full rounded-2xl border-0 bg-linear-to-r from-primary via-rose-500 to-fuchsia-600 text-sm font-bold text-white shadow-[0_18px_40px_rgba(236,72,153,0.28)] transition hover:scale-[1.01] hover:shadow-[0_20px_45px_rgba(236,72,153,0.32)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Generating...' : 'Find Smart Gift Ideas'}
                </button>
              </form>
            </div>

            {/* Result side */}
            <div className="rounded-4xl border border-white/70 bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)] md:p-8">
              {!showResults ? (
                <div className="flex min-h-130 flex-col justify-between rounded-[28px] border border-slate-200 bg-linear-to-br from-slate-50 via-white to-rose-50/30 p-6 md:p-8">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary">
                      <Wand2 className="size-4" />
                      AI Suggestion Panel
                    </div>

                    <h3 className="mt-5 text-3xl font-black leading-tight text-slate-900">
                      Your smarter gift suggestions will appear here
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                      Complete the input form to unlock AI-style recommendations based on relationship, occasion, budget, and selected
                      interests.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <Gift className="size-5 text-primary" />
                      <p className="mt-3 text-sm font-bold text-slate-900">Better Matches</p>
                      <p className="mt-1 text-xs leading-6 text-slate-500">More relevant than a normal generic product list.</p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <BadgeDollarSign className="size-5 text-secondary" />
                      <p className="mt-3 text-sm font-bold text-slate-900">Budget Fit</p>
                      <p className="mt-1 text-xs leading-6 text-slate-500">Recommendations shaped around spending range.</p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <Brain className="size-5 text-accent" />
                      <p className="mt-3 text-sm font-bold text-slate-900">AI Feel</p>
                      <p className="mt-1 text-xs leading-6 text-slate-500">Suggestions with explanation, not random results.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="rounded-[28px] border border-primary/10 bg-linear-to-br from-primary/8 via-white to-accent/8 p-5">
                    <div className="flex items-start gap-3">
                      <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/12 text-primary">
                        <Brain className="size-5" />
                      </div>

                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">AI-style Explanation</p>
                        <p className="mt-2 text-sm leading-7 text-slate-700">{summary}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {recommendations.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-[28px] border border-slate-100 bg-linear-to-br from-white to-rose-50/40 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                              {item.category}
                            </div>

                            <h3 className="mt-3 text-xl font-black text-slate-900">{item.title}</h3>

                            <p className="mt-2 text-sm leading-7 text-slate-600">{item.reason}</p>
                          </div>

                          <div className="flex shrink-0 items-center justify-between gap-4 md:flex-col md:items-end">
                            <span className="text-lg font-black text-primary">{item.price}</span>

                            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-primary/20 hover:text-primary">
                              View Suggestion
                              <ArrowRight className="size-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[28px] border border-orange-100 bg-linear-to-r from-orange-50 to-rose-50 p-5">
                    <div className="flex items-start gap-3">
                      <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-secondary shadow-sm">
                        <Gift className="size-5" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-slate-900">Why these suggestions?</p>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          These results use relationship, occasion, budget, and your selected interests to create a more focused gift
                          direction.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AIGiftFinderPage;
