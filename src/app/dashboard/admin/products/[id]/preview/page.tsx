'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Edit, Eye, Lock, Package, ShoppingBag, Zap } from 'lucide-react';
import { axiosInstance } from '@/lib/axios';
import { IProduct } from '@/types/product';

const AdminProductPreviewPage = () => {
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`/admin/products/${productId}`);
        setProduct(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  if (loading) {
    return <main className="p-6">Loading preview...</main>;
  }

  if (!product) {
    return <main className="p-6">Product not found.</main>;
  }

  return (
    <section className="min-h-screen bg-white p-6">
      {/* Admin Banner */}
      <div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <Eye className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">Admin Preview Mode</h1>
              <p className="mt-1 text-sm text-slate-600">This shows how customers will see this product. Purchase actions are disabled.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/dashboard/admin/products" className="btn rounded-2xl border-base-300 bg-white">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>

            <Link href={`/dashboard/admin/products/${product._id}/edit`} className="btn btn-primary rounded-2xl text-white">
              <Edit className="h-4 w-4" />
              Edit Product
            </Link>
          </div>
        </div>
      </div>

      {/* Customer-like Preview */}
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.95fr]">
          {/* Left Image + Stats */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-4xl bg-base-200 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08)]">
              <div className="absolute left-6 top-6 z-10">
                <span className="rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm backdrop-blur-md">
                  {product.category}
                </span>
              </div>

              <Image
                src={product.image}
                alt={product.alt || product.name}
                width={900}
                height={900}
                className="aspect-square w-full object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-3xl border border-slate-100 bg-white p-5 text-center shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rating</p>
                <p className="mt-1 text-xl font-black text-slate-800">{product.rating?.toFixed(1) ?? '0.0'}</p>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-5 text-center shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Stock</p>
                <p className="mt-1 text-xl font-black text-slate-800">{product.stock}</p>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-5 text-center shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Reviews</p>
                <p className="mt-1 text-xl font-black text-slate-800">{product.reviews ?? 0}</p>
              </div>
            </div>
          </div>

          {/* Right Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">Preview</span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  product.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-600'
                    : product.status === 'Draft'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-red-50 text-red-600'
                }`}
              >
                {product.status}
              </span>

              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                <Package className="h-4 w-4" />
                Stock: {product.stock}
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-tight text-base-content md:text-5xl">{product.name}</h2>

            <div className="mt-7 flex items-end gap-3">
              <p className="text-5xl font-black text-base-content">${product.price}</p>
              <span className="pb-2 text-sm font-bold uppercase tracking-widest text-slate-400">USD</span>
            </div>

            <div className="mt-9">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">The Details</p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">{product.description}</p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <button disabled className="btn h-14 rounded-2xl border-0 bg-slate-200 text-slate-400">
                <ShoppingBag className="h-4 w-4" />
                Add to Shopping Bag
              </button>

              <button disabled className="btn h-14 rounded-2xl border border-slate-300 bg-white text-slate-400">
                <Zap className="h-4 w-4" />
                Quick Buy
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-violet-100 bg-violet-50/60 p-4 text-sm text-slate-600">
              <Lock className="h-4 w-4 text-accent" />
              Preview only — customer actions are disabled in admin mode.
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-slate-200 pt-8 text-sm">
              <div>
                <p className="font-bold uppercase text-slate-900">Fast Shipping</p>
                <p className="mt-1 text-slate-500">Delivered within 3-5 business days</p>
              </div>

              <div>
                <p className="font-bold uppercase text-slate-900">Secure Wrap</p>
                <p className="mt-1 text-slate-500">Premium gift packaging included</p>
              </div>
            </div>

            <Link
              href="/dashboard/admin/products"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Managing Products
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AdminProductPreviewPage;
