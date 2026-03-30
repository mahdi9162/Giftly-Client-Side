import React from 'react';
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react';

type Category = 'all' | 'birthday' | 'anniversary' | 'for-him' | 'for-her' | 'family' | 'personalized';

type ProductFiltersProps = {
  categories: { label: string; value: Category }[];

  selectedCategory: Category;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>;

  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;

  priceSort: 'featured' | 'low-to-high' | 'high-to-low';
  setPriceSort: React.Dispatch<React.SetStateAction<'featured' | 'low-to-high' | 'high-to-low'>>;

  ratingFilter: 'all' | '4-up' | '4.5-up';
  setRatingFilter: React.Dispatch<React.SetStateAction<'all' | '4-up' | '4.5-up'>>;
};

export default function ProductFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  priceSort,
  setPriceSort,
  ratingFilter,
  setRatingFilter,
}: ProductFiltersProps) {
  return (
    <>
      {/* Right Content Filters */}
      <div>
        {/* Mobile category */}
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

        {/* Search + sort + rating */}
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
      </div>
    </>
  );
}
