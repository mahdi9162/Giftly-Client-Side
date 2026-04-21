'use client';

import Link from 'next/link';
import Image from 'next/image';
import Container from '../shared/Container';
import { IProduct } from '@/types/product';
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';

type ProductDetailsViewProps = {
  product: IProduct;
};

const categoryLabels: Record<IProduct['category'], string> = {
  birthday: 'Birthday',
  anniversary: 'Anniversary',
  'for-him': 'For Him',
  'for-her': 'For Her',
  family: 'Family',
  personalized: 'Personalized',
};

const ProductDetailsView = ({ product }: ProductDetailsViewProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  const isActive = product.status === 'Active';
  const isOutOfStock = product.status === 'Out of Stock';
  const inStock = product.stock > 0 && isActive && !isOutOfStock;

  const handleAddToBag = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <section className="min-h-screen bg-[#fcfcfd] py-8 md:py-16">
      <Container>
        <div className="px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-slate-400">
            <Link href="/" className="transition hover:text-primary">
              Home
            </Link>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <Link href="/shop" className="transition hover:text-primary">
              Shop
            </Link>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="text-slate-600">{product.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 xl:gap-16">
            {/* Image Side */}
            <div className="space-y-6">
              <div className="group relative overflow-hidden rounded-4xl bg-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08)]">
                <div className="absolute left-6 top-6 z-10">
                  <span className="rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-800 backdrop-blur-md shadow-sm">
                    {categoryLabels[product.category]}
                  </span>
                </div>

                <Image
                  width={800}
                  height={800}
                  src={product.image}
                  alt=""
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Micro Stats Card */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-3xl bg-white p-5 text-center shadow-sm border border-slate-50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rating</p>
                  <p className="mt-1 text-xl font-black text-slate-800">{product.rating.toFixed(1)}</p>
                </div>
                <div className="rounded-3xl bg-white p-5 text-center shadow-sm border border-slate-50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Stock</p>
                  <p className="mt-1 text-xl font-black text-slate-800">{product.stock}</p>
                </div>
                <div className="rounded-3xl bg-white p-5 text-center shadow-sm border border-slate-50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Reviews</p>
                  <p className="mt-1 text-xl font-black text-slate-800">{product.reviews}</p>
                </div>
              </div>
            </div>

            {/* Details Side */}
            <div className="flex flex-col mt-4 md:mt-10">
              <div className="space-y-5 md:space-y-8">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    {product.badge && (
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                        {product.badge}
                      </span>
                    )}
                    <span className={`h-2 w-2 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                      {inStock ? 'Available Now' : 'Currently Unavailable'}
                    </span>
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-5xl">{product.name}</h1>
                </div>

                {/* Pricing Section */}
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">${product.price}</span>
                  <span className="text-md md:text-lg font-medium text-slate-400 uppercase tracking-widest">USD</span>
                </div>

                <div className="space-y-2 md:space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">The Details</h3>
                  <p className="text-xs md:text-lg leading-relaxed text-slate-600/90 max-w-xl">{product.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                  <button
                    onClick={handleAddToBag}
                    disabled={!inStock}
                    className={`group relative flex-1 overflow-hidden rounded-2xl px-8 py-3 md:py-5 text-xs md:text-sm font-bold uppercase tracking-widest text-white cursor-pointer transition-all duration-500 ease-out ${
                      !inStock
                        ? 'bg-base-300 text-slate-400 cursor-not-allowed shadow-none'
                        : added
                          ? 'bg-linear-to-r from-fuchsia-600 to-violet-600 scale-[1.01] shadow-[0_20px_40px_-10px_rgba(139,92,246,0.35)]'
                          : 'bg-primary hover:shadow-[0_20px_40px_-10px_rgba(236,72,153,0.4)]'
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {!inStock ? 'Out of Stock' : added ? 'Added' : 'Add to Shopping Bag'}
                    </span>
                    {inStock && !added && (
                      <div className="absolute inset-0 z-0 bg-linear-to-r from-primary to-[#ff6eb4] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    )}

                    {/* subtle glow for added state */}
                    {added && <div className="absolute inset-0 z-0 animate-pulse bg-white/10" />}
                  </button>

                  <button
                    disabled={!inStock}
                    className="flex-1 rounded-2xl border-2 border-slate-900 bg-transparent px-8 py-3 md:py-5 text-xs md:text-sm font-bold uppercase tracking-widest text-slate-900 transition-all duration-700 hover:bg-slate-900 hover:text-white disabled:border-slate-200 disabled:text-slate-300 cursor-pointer"
                  >
                    Quick Buy
                  </button>
                </div>

                {/* Trust Badges or Shipping Info */}
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-100">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Fast Shipping</h4>
                    <p className="mt-1 text-xs text-slate-500">Delivered within 3-5 business days</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Secure Wrap</h4>
                    <p className="mt-1 text-xs text-slate-500">Premium gift packaging included</p>
                  </div>
                </div>

                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-secondary"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductDetailsView;
