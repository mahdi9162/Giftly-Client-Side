import ProductCard from '@/components/shop/ProductCard';

type Category = 'all' | 'birthday' | 'anniversary' | 'for-him' | 'for-her' | 'family' | 'personalized';

type Product = {
  _id: string;
  name: string;
  category: Exclude<Category, 'all'>;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  badge?: 'Best Seller' | 'New';
  image: string;
  alt: string;
  stock: number;
};

type ProductGridProps = {
  products: Product[];
  categories: { label: string; value: Category }[];
};

export default function ProductGrid({ products, categories }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
        <h3 className="text-xl font-semibold text-slate-900">No products found</h3>
        <p className="mt-2 text-sm text-slate-500">Try changing your category, search term, or rating filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => {
        const categoryLabel = categories.find((cat) => cat.value === product.category)?.label;

        return <ProductCard key={product._id} product={product} categoryLabel={categoryLabel} />;
      })}
    </div>
  );
}
