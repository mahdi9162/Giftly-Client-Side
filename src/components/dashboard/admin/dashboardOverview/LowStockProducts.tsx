import Link from 'next/link';
import React from 'react';
import { AlertTriangle, PackageX } from 'lucide-react';

type LowStockProductsType = {
  _id: string;
  name: string;
  category: string;
  stock: number;
};

const LowStockProducts = ({ lowStockProducts }: { lowStockProducts: LowStockProductsType[] }) => {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Low Stock Products</h2>
          <p className="mt-1 text-sm text-slate-500">Products that need restocking soon</p>
        </div>

        <Link
          href="/dashboard/admin/products"
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
        >
          Manage
        </Link>
      </div>

      <div className="max-h-90 space-y-3 overflow-y-auto pr-1">
        {lowStockProducts.map((product) => (
          <div
            key={product._id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <div
                className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ${
                  product.stock === 0
                    ? 'border border-rose-200 bg-rose-50/80 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                    : 'border border-amber-200 bg-amber-50/80 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                }`}
              >
                {product.stock === 0 ? (
                  <PackageX className="h-5 w-5 stroke-[2.5]" />
                ) : (
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 h-5 w-5 animate-pulse rounded-full bg-amber-400/20 blur-md" />
                    <AlertTriangle className="h-5 w-5 animate-[bounce_3s_infinite] stroke-[2.5] drop-shadow-md" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-semibold leading-snug text-slate-800">{product.name}</h3>
                <p className="mt-1 text-xs capitalize text-slate-400">{product.category || 'Product'}</p>
              </div>
            </div>

            <div className="flex justify-end sm:block sm:text-right">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  product.stock === 0 ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-600'
                }`}
              >
                {product.stock === 0 ? 'Out of Stock' : `${product.stock} left`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockProducts;
