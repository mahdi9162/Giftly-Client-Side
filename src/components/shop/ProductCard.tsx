import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

type Category = 'birthday' | 'anniversary' | 'for-him' | 'for-her' | 'family' | 'personalized';

type Product = {
  _id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  badge?: 'Best Seller' | 'New';
  image: string;
  alt: string;
  stock: number;
};

type ProductCardProps = {
  product: Product;
  categoryLabel?: string;
};

export default function ProductCard({ product, categoryLabel }: ProductCardProps) {
  const stockText = product.stock === 0 ? 'Out of stock' : product.stock <= 5 ? `Only ${product.stock} left` : 'In stock';

  const stockTextColor = product.stock === 0 ? 'text-red-500' : product.stock <= 5 ? 'text-orange-500' : 'text-emerald-600';

  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-black/5 to-transparent" />

        {product.badge && (
          <span
            className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[11px] font-semibold shadow-sm backdrop-blur-sm ${
              product.badge === 'Best Seller' ? 'bg-orange-100/95 text-orange-700' : 'bg-rose-100/95 text-rose-600'
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-4">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-500">{categoryLabel}</span>

        <h3 className="mt-3 text-base md:text-xl font-semibold tracking-tight text-slate-900 line-clamp-1">{product.name}</h3>

        <p className="mt-2 text-xs md:text-sm leading-6 text-slate-500 line-clamp-3">{product.description}</p>

        <div className="mt-4 flex items-center gap-1 text-sm text-slate-500">
          <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
          <span className="font-medium text-slate-700">{product.rating}</span>
          <span className="text-xs md:text-sm">({product.reviews} reviews)</span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="text-2xl font-bold tracking-tight text-slate-900">${product.price.toFixed(2)}</div>

          <p className={`text-sm font-medium ${stockTextColor}`}>{stockText}</p>
        </div>

        <div className="mt-5 space-y-3">
          <button
            type="button"
            disabled={product.stock === 0}
            className={`h-11 w-full rounded-2xl text-sm font-semibold text-white transition-all ${
              product.stock === 0
                ? 'cursor-not-allowed bg-slate-300'
                : 'bg-linear-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 cursor-pointer'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>

          <Link
            href={`/shop/${product._id}`}
            className="block text-center text-sm font-medium text-slate-500 transition-colors hover:text-rose-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
