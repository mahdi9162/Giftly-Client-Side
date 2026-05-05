import React from 'react';

type TopProductsProps = {
  name: string;
  sold: number;
  revenue: string;
};

const TopProducts = ({ topProducts }: { topProducts: TopProductsProps[] }) => {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">Top Products</h2>
        <p className="mt-1 text-sm text-slate-500">Best-performing gift products this week</p>
      </div>

      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={product.name} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-800">{product.name}</p>
                <p className="mt-1 text-xs text-slate-500">Product #{index + 1}</p>
              </div>

              <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-500">Top Seller</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Sold: {product.sold}</span>
              <span className="font-semibold text-slate-800">{product.revenue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
