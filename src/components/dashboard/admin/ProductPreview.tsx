/* eslint-disable @next/next/no-img-element */

type ProductPreviewProps = {
  previewUrl: string;
  categoryLabel: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  stock: number;
  badge?: 'Best Seller' | 'New';
};

export function ProductPreview({
  previewUrl,
  categoryLabel,
  name,
  description,
  rating,
  reviews,
  price,
  stock,
  badge,
}: ProductPreviewProps) {
  const stockText = stock === 0 ? 'Out of stock' : stock <= 5 ? `Only ${stock} left` : 'In stock';

  const stockTextColor = stock === 0 ? 'text-red-500' : stock <= 5 ? 'text-orange-500' : 'text-emerald-600';

  return (
    <div className="rounded-4xl border border-white/60 bg-white/90 p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">Live Preview</p>
        <h2 className="mt-2 text-xl font-black text-slate-900">Product Card Preview</h2>
        <p className="mt-1 text-sm text-slate-500">This preview reflects how the product image and basic card content may appear.</p>
      </div>

      <article className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          {previewUrl ? (
            <>
              <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-black/5 to-transparent" />
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-linear-to-br from-slate-100 to-slate-50">
              <p className="text-sm font-bold text-slate-600">No image selected</p>
            </div>
          )}

          {badge && (
            <span
              className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[11px] font-semibold shadow-sm backdrop-blur-sm ${
                badge === 'Best Seller' ? 'bg-orange-100/95 text-orange-700' : 'bg-rose-100/95 text-rose-600'
              }`}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-500">{categoryLabel}</span>

          <h3 className="mt-3 line-clamp-1 text-base font-semibold tracking-tight text-slate-900 md:text-xl">{name || 'Product Name'}</h3>

          <p className="mt-2 line-clamp-3 break-all text-xs leading-6 text-slate-500 md:text-sm">
            {description || 'Your product description will appear here so you can understand how the card content feels.'}
          </p>

          <div className="mt-4 flex items-center gap-1 text-sm text-slate-500">
            <span>⭐</span>
            <span className="font-medium text-slate-700">{rating}</span>
            <span className="text-xs md:text-sm">({reviews} reviews)</span>
          </div>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div className="text-2xl font-bold tracking-tight text-slate-900">${price > 0 ? price.toFixed(2) : '0.00'}</div>

            <p className={`text-sm font-medium ${stockTextColor}`}>{stockText}</p>
          </div>

          <div className="mt-5 space-y-3">
            <button
              type="button"
              disabled={stock === 0}
              className={`h-11 w-full rounded-2xl text-sm font-semibold text-white transition-all ${
                stock === 0
                  ? 'cursor-not-allowed bg-slate-300'
                  : 'bg-linear-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600'
              }`}
            >
              {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            <button
              type="button"
              className="block w-full text-center text-sm font-medium text-slate-500 transition-colors hover:text-rose-500"
            >
              View Details
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
