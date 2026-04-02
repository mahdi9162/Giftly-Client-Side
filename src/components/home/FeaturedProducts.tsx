'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import Container from '../shared/Container';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { Product } from '@/types/product';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/products');

        setProducts(res.data.data as Product[]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const allFeaturedProducts = products.filter((product) => product.featured === true);

  return (
    <Container>
      <section className="py-16 md:py-20 px-3 lg:px-0">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div className="max-w-xl">
            {/* Badge  */}
            <p className="mb-3 inline-flex rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
              Featured Gifts
            </p>

            {/* Heading */}
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Handpicked Gifts for Every <span className="font-script font-normal text-primary">Special</span> Moment
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-500 md:text-base md:leading-7">
              Thoughtfully curated picks for the people and occasions that matter most.
            </p>
          </div>

          {/* View All */}
          <Link
            href="/shop"
            className="mt-6 hidden shrink-0 rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 md:mt-0 md:block"
          >
            View All
          </Link>
        </div>

        {/* Product Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {allFeaturedProducts.map((product) => {
            const stockText = product.stock === 0 ? 'Out of stock' : product.stock <= 5 ? `Only ${product.stock} left` : 'In stock';

            const stockTextColor = product.stock === 0 ? 'text-red-500' : product.stock <= 5 ? 'text-orange-500' : 'text-emerald-600';
            return (
              <div
                key={product._id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-[0_15px_40px_-12px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_-10px_rgba(15,23,42,0.12)]"
              >
                {/* Corner Tag */}
                <span
                  className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                    product.badge === 'Best Seller' ? 'bg-orange-100 text-orange-600' : 'bg-violet-100 text-violet-600'
                  }`}
                >
                  {product.badge}
                </span>

                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="208"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Top content grows to fill space */}
                  <div className="flex-1">
                    {/* Category badge — neutral slate, no pink */}
                    <span className="mb-2 inline-flex w-fit rounded-full bg-slate-100 px-3 py-0.5 text-xs font-medium text-slate-600">
                      {product.category}
                    </span>

                    <h3 className="text-base font-bold text-slate-900">{product.name}</h3>

                    {/* description */}
                    <p className="mt-1.5 min-h-10 text-sm leading-relaxed text-slate-500 line-clamp-2">{product.description}</p>

                    {/* Rating */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-slate-700">{product.rating}</span>
                      <span>({product.reviews} reviews)</span>
                    </div>
                  </div>

                  {/* Bottom section — price + actions */}
                  <div className="mt-4">
                    <div className="flex items-end justify-between gap-3">
                      <p className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</p>
                      <p className={`text-sm font-medium ${stockTextColor}`}>{stockText}</p>
                    </div>

                    <div className="mt-3 flex flex-col gap-2">
                      {/* Primary action */}
                      <button className="btn btn-primary w-full rounded-xl text-white shadow-sm">Add to Cart</button>
                      <Link
                        href={`/shop/${product._id}`}
                        className="text-center text-xs font-medium text-slate-400 transition hover:text-slate-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/shop"
            className="rounded-xl border border-slate-300 bg-white px-8 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Explore More Gifts
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default FeaturedProducts;
