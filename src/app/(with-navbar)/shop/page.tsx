import Container from '@/components/shared/Container';
import ProductGrid from '@/components/shop/ProductGrid';
import ProductFilters from '@/components/shop/ProductFilters';
import { SlidersHorizontal } from 'lucide-react';
import { getProducts } from '@/lib/api/products';
import Link from 'next/link';

type Category = 'all' | 'birthday' | 'anniversary' | 'for-him' | 'for-her' | 'family' | 'personalized';

const categories: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Birthday', value: 'birthday' },
  { label: 'Anniversary', value: 'anniversary' },
  { label: 'For Him', value: 'for-him' },
  { label: 'For Her', value: 'for-her' },
  { label: 'Family', value: 'family' },
  { label: 'Personalized', value: 'personalized' },
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

type SearchParams = Promise<{
  category?: string;
  search?: string;
  sort?: string;
  rating?: string;
  page?: string;
}>;

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  // get paramiter from URL
  const resolvedSearchParams = await searchParams;

  const selectedCategory = (resolvedSearchParams.category as Category) || 'all';
  const searchTerm = resolvedSearchParams.search || '';
  const priceSort = (resolvedSearchParams.sort as 'featured' | 'low-to-high' | 'high-to-low') || 'featured';
  const ratingFilter = (resolvedSearchParams.rating as 'all' | '4-up' | '4.5-up') || 'all';

  //   API Call
  const productResponse = await getProducts(resolvedSearchParams);
  const products = productResponse.data;
  const meta = productResponse.meta;

  const currentMeta = categoryMeta[selectedCategory];

  const getCategoryHref = (categoryValue: Category) => {
    const params = new URLSearchParams();

    if (categoryValue !== 'all') {
      params.set('category', categoryValue);
    }

    if (searchTerm) params.set('search', searchTerm);
    if (priceSort !== 'featured') params.set('sort', priceSort);
    if (ratingFilter !== 'all') params.set('rating', ratingFilter);

    params.set('page', '1');

    const query = params.toString();
    return query ? `/shop?${query}` : '/shop';
  };

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
          {/* Sidebar */}
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
                    <Link
                      key={category.value}
                      href={getCategoryHref(category.value)}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-700 cursor-pointer ${
                        active
                          ? 'bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-[0_10px_25px_rgba(244,114,182,0.28)]'
                          : 'bg-slate-50 text-slate-700 hover:bg-rose-50 hover:text-rose-500'
                      }`}
                    >
                      <span>{category.label}</span>
                      {active && <span className="text-xs">•</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
          {/* Right Content */}
          <section>
            {/* Filters */}
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
              priceSort={priceSort}
              ratingFilter={ratingFilter}
            />

            {/* Results Top */}
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">{currentMeta.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{meta?.totalProducts ?? products.length} products found</p>
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
            <ProductGrid products={products} categories={categories} />
          </section>
        </div>
      </Container>
    </main>
  );
}
