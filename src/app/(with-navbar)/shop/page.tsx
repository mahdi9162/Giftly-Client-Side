'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, SlidersHorizontal, Star } from 'lucide-react';
import Container from '@/components/shared/Container';

type Category = 'all' | 'birthday' | 'anniversary' | 'for-him' | 'for-her' | 'family' | 'personalized';

type Product = {
  id: number;
  name: string;
  category: Exclude<Category, 'all'>;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  badge?: 'Best Seller' | 'New';
  imageLabel: string;
  bg: string;
};

const categories: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Birthday', value: 'birthday' },
  { label: 'Anniversary', value: 'anniversary' },
  { label: 'For Him', value: 'for-him' },
  { label: 'For Her', value: 'for-her' },
  { label: 'Family', value: 'family' },
  { label: 'Personalized', value: 'personalized' },
];

const products: Product[] = [
  {
    id: 1,
    name: 'Birthday Bliss Box',
    category: 'birthday',
    description: 'A cheerful gift box packed for birthdays big and small.',
    price: 25,
    rating: 4.8,
    reviews: 13,
    badge: 'Best Seller',
    imageLabel: 'Birthday Gift Box',
    bg: 'from-orange-100 via-amber-50 to-rose-100',
  },
  {
    id: 2,
    name: 'Elegant Surprise Box',
    category: 'birthday',
    description: 'A minimal surprise box made for thoughtful celebrations.',
    price: 15,
    rating: 4.9,
    reviews: 18,
    badge: 'New',
    imageLabel: 'Elegant Box',
    bg: 'from-stone-100 via-white to-rose-50',
  },
  {
    id: 3,
    name: 'Romantic Love Set',
    category: 'anniversary',
    description: 'A heartfelt set for anniversaries and memorable moments.',
    price: 20,
    rating: 4.7,
    reviews: 6,
    badge: 'Best Seller',
    imageLabel: 'Love Set',
    bg: 'from-rose-100 via-pink-50 to-orange-50',
  },
  {
    id: 4,
    name: 'Timeless Memory Album',
    category: 'family',
    description: 'A meaningful keepsake to hold special family memories.',
    price: 19,
    rating: 4.3,
    reviews: 13,
    badge: 'New',
    imageLabel: 'Memory Album',
    bg: 'from-rose-50 via-slate-50 to-orange-50',
  },
  {
    id: 5,
    name: 'Classic Keepsake Box',
    category: 'for-him',
    description: 'Smart and thoughtful gifts picked with timeless style.',
    price: 32,
    rating: 4.8,
    reviews: 9,
    imageLabel: 'Gift for Him',
    bg: 'from-orange-50 via-rose-50 to-stone-100',
  },
  {
    id: 6,
    name: 'Soft Bloom Set',
    category: 'for-her',
    description: 'Elegant, feel-good gifts chosen with care for her.',
    price: 29,
    rating: 4.6,
    reviews: 11,
    imageLabel: 'Gift for Her',
    bg: 'from-pink-100 via-rose-50 to-orange-50',
  },
  {
    id: 7,
    name: 'Custom Name Keepsake',
    category: 'personalized',
    description: 'A custom-made piece with a personal story inside.',
    price: 35,
    rating: 4.9,
    reviews: 22,
    badge: 'Best Seller',
    imageLabel: 'Personalized Gift',
    bg: 'from-rose-100 via-pink-50 to-fuchsia-50',
  },
  {
    id: 8,
    name: 'Family Comfort Crate',
    category: 'family',
    description: 'Warm, shareable gifts everyone at home will love.',
    price: 28,
    rating: 4.5,
    reviews: 15,
    imageLabel: 'Family Box',
    bg: 'from-orange-50 via-rose-50 to-pink-50',
  },
];

const categoryMeta: Record<Category, { title: string; subtitle: string }> = {
  all: {
    title: 'All Gifts',
    subtitle: 'Browse all available gifts across every category.',
  },
  birthday: {
    title: 'Birthday Gifts',
    subtitle: 'Surprise-worthy picks for birthdays big and small.',
  },
  anniversary: {
    title: 'Anniversary Gifts',
    subtitle: 'Romantic gifts for meaningful milestones together.',
  },
  'for-him': {
    title: 'Gifts for Him',
    subtitle: 'Thoughtful picks for husbands, dads, brothers, and more.',
  },
  'for-her': {
    title: 'Gifts for Her',
    subtitle: 'Beautiful gifts for moms, wives, sisters, and friends.',
  },
  family: {
    title: 'Family Gifts',
    subtitle: 'Warm, feel-good gifts everyone at home will love.',
  },
  personalized: {
    title: 'Personalized Gifts',
    subtitle: 'Custom keepsakes made to feel one of a kind.',
  },
};

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceSort, setPriceSort] = useState<'featured' | 'low-to-high' | 'high-to-low'>('featured');
  const [ratingFilter, setRatingFilter] = useState<'all' | '4-up' | '4.5-up'>('all');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter((product) => product.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter((product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));
    }

    if (ratingFilter === '4-up') {
      result = result.filter((product) => product.rating >= 4);
    }

    if (ratingFilter === '4.5-up') {
      result = result.filter((product) => product.rating >= 4.5);
    }

    if (priceSort === 'low-to-high') {
      result.sort((a, b) => a.price - b.price);
    }

    if (priceSort === 'high-to-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchTerm, priceSort, ratingFilter]);

  const currentMeta = categoryMeta[selectedCategory];

  return (
    <main className="px-4 py-8 md:px-6 lg:px-8">
      <Container>
        {/* Hero */}
        <div className="mb-6 rounded-4xl border border-rose-100/70 bg-linear-to-br from-white via-rose-50/40 to-orange-50/30 px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)] md:mb-8 md:px-8 md:py-10">
          <p className="mb-3 inline-flex rounded-full border border-rose-200/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-rose-500 shadow-sm">
            Shop
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">{currentMeta.title}</h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">{currentMeta.subtitle}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-[28px] border border-slate-200/70 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
              <div className="mb-5 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-rose-500" />
                <h2 className="text-base font-semibold text-slate-900">Browse Categories</h2>
              </div>

              <div className="space-y-2">
                {categories.map((category) => {
                  const active = selectedCategory === category.value;

                  return (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => setSelectedCategory(category.value)}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-700 cursor-pointer ${
                        active
                          ? 'bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-[0_10px_25px_rgba(244,114,182,0.28)]'
                          : 'bg-slate-50 text-slate-700 hover:bg-rose-50 hover:text-rose-500'
                      }`}
                    >
                      <span>{category.label}</span>
                      {active && <span className="text-xs">•</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Content */}
          <section>
            {/* Mobile Collapsible Categories */}
            <details className="mb-4 overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.05)] lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-rose-500" />
                  <span className="text-sm font-semibold text-slate-900">Browse Categories</span>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </summary>

              <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                <div className="space-y-2">
                  {categories.map((category) => {
                    const active = selectedCategory === category.value;

                    return (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => setSelectedCategory(category.value)}
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                          active
                            ? 'bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-[0_10px_25px_rgba(244,114,182,0.28)]'
                            : 'bg-slate-50 text-slate-700 hover:bg-rose-50 hover:text-rose-500'
                        }`}
                      >
                        <span>{category.label}</span>
                        {active && <span className="text-xs">•</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </details>

            {/* Filters */}
            <div className="mb-6 rounded-[28px] border border-slate-200/70 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] md:p-5">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_180px_160px]">
                {/* Search */}
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-300" />
                  <input
                    type="text"
                    placeholder="Search gifts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-rose-300 focus:bg-white"
                  />
                </div>

                {/* Price Sort */}
                <select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value as 'featured' | 'low-to-high' | 'high-to-low')}
                  className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition-all focus:border-rose-300 focus:bg-white"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                </select>

                {/* Rating Filter */}
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value as 'all' | '4-up' | '4.5-up')}
                  className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition-all focus:border-rose-300 focus:bg-white"
                >
                  <option value="all">Rating: All</option>
                  <option value="4-up">4★ & up</option>
                  <option value="4.5-up">4.5★ & up</option>
                </select>
              </div>
            </div>

            {/* Results Top */}
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">{currentMeta.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{filteredProducts.length} products found</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {selectedCategory !== 'all' && (
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-500">
                    {categoryMeta[selectedCategory].title}
                  </span>
                )}

                {ratingFilter !== 'all' && (
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-500">
                    {ratingFilter === '4-up' ? '4★ & up' : '4.5★ & up'}
                  </span>
                )}
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <article
                    key={product.id}
                    className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                  >
                    <div className={`relative h-56 bg-linear-to-br ${product.bg} p-4`}>
                      {product.badge && (
                        <span
                          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold ${
                            product.badge === 'Best Seller' ? 'bg-orange-100 text-orange-600' : 'bg-rose-100 text-rose-600'
                          }`}
                        >
                          {product.badge}
                        </span>
                      )}

                      <div className="flex h-full items-end rounded-[22px] border border-white/60 bg-white/20 p-4 backdrop-blur-[2px]">
                        <p className="text-sm font-medium text-slate-700">{product.imageLabel}</p>
                      </div>
                    </div>

                    <div className="p-4">
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-500">
                        {categories.find((cat) => cat.value === product.category)?.label}
                      </span>

                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">{product.name}</h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">{product.description}</p>

                      <div className="mt-4 flex items-center gap-1 text-sm text-slate-500">
                        <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                        <span className="font-medium text-slate-700">{product.rating}</span>
                        <span>({product.reviews} reviews)</span>
                      </div>

                      <div className="mt-4 text-2xl font-bold tracking-tight text-slate-900">${product.price.toFixed(2)}</div>

                      <div className="mt-5 space-y-3">
                        <button
                          type="button"
                          className="h-11 w-full rounded-2xl bg-linear-to-r from-rose-500 to-pink-500 text-sm font-semibold text-white transition-all hover:from-rose-600 hover:to-pink-600"
                        >
                          Add to Cart
                        </button>

                        <Link
                          href={`/shop/${product.id}`}
                          className="block text-center text-sm font-medium text-slate-500 transition-colors hover:text-rose-500"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                <h3 className="text-xl font-semibold text-slate-900">No products found</h3>
                <p className="mt-2 text-sm text-slate-500">Try changing your category, search term, or rating filter.</p>
              </div>
            )}
          </section>
        </div>
      </Container>
    </main>
  );
}
