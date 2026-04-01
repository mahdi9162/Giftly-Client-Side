import Image from 'next/image';
import { Edit, Eye, Trash2 } from 'lucide-react';

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Active' | 'Draft' | 'Out of Stock';
  image: string;
};

type Meta = {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
  activeProducts: number;
  draftProducts: number;
  outOfStockProducts: number;
};

type ProductListProps = {
  filteredProducts: Product[];
  totalProducts: number;
  meta: Meta;
};

const ProductList = ({ filteredProducts, totalProducts, meta }: ProductListProps) => {
  return (
    <>
      {/* Desktop table */}
      <section className="hidden overflow-hidden rounded-4xl border border-white/60 bg-white/85 shadow-sm xl:block">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-xl font-black text-slate-900">Product List</h2>
          <p className="mt-1 text-sm text-slate-500">
            Showing {filteredProducts.length} of {totalProducts} products
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-xs uppercase tracking-[0.16em] text-slate-400">
                <th className="bg-transparent px-6 py-4">#</th>
                <th className="bg-transparent px-6 py-4">Product</th>
                <th className="bg-transparent px-6 py-4">Category</th>
                <th className="bg-transparent px-6 py-4">Price</th>
                <th className="bg-transparent px-6 py-4">Stock</th>
                <th className="bg-transparent px-6 py-4">Status</th>
                <th className="bg-transparent px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product._id} className="border-t border-slate-100 hover:bg-rose-50/40">
                  <td className="px-6 py-4 text-sm font-bold text-slate-500">{(meta.currentPage - 1) * meta.perPage + index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="size-14 rounded-2xl object-cover ring-1 ring-slate-100"
                      />
                      <div>
                        <p className="text-sm font-black text-slate-900">{product.name}</p>
                        <p className="mt-1 text-xs font-medium text-slate-500">{product._id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">${product.price}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{product.stock}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-2 text-xs font-black ${
                        product.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : product.status === 'Draft'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                        <Eye className="size-4" />
                        View
                      </button>

                      <button className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-bold text-violet-700 transition hover:bg-violet-100">
                        <Edit className="size-4" />
                        Edit
                      </button>

                      <button className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-100">
                        <Trash2 className="size-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile / Tablet cards */}
      <section className="grid gap-4 xl:hidden">
        {filteredProducts.map((product, index) => (
          <div
            key={product._id}
            className="overflow-hidden rounded-[24px] border border-white/70 bg-white/95 p-4 shadow-sm sm:rounded-[28px] sm:p-5"
          >
            {/* Top row */}
            <div className="flex items-start gap-3">
              <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-1 ring-slate-100 sm:h-20 sm:w-20"
              />

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="inline-flex rounded-full bg-rose-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-primary">
                    #{(meta.currentPage - 1) * meta.perPage + index + 1}
                  </span>

                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black sm:px-3 sm:py-1.5 sm:text-xs ${
                      product.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : product.status === 'Draft'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                <h3 className="line-clamp-1 text-sm font-black leading-6 text-slate-900 sm:text-lg">{product.name}</h3>

                <p className="mt-1 truncate text-xs font-medium text-slate-500">ID: {product._id}</p>
              </div>
            </div>

            {/* Info grid */}
            <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-3 sm:grid-cols-3 sm:gap-3">
              <div className="rounded-xl bg-white px-3 py-3 text-center">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Category</p>
                <p className="mt-1 truncate text-sm font-bold text-slate-700">{product.category}</p>
              </div>

              <div className="rounded-xl bg-white px-3 py-3 text-center">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Price</p>
                <p className="mt-1 text-sm font-bold text-slate-700">${product.price}</p>
              </div>

              <div className="col-span-2 rounded-xl bg-white px-3 py-3 text-center sm:col-span-1">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Stock</p>
                <p className="mt-1 text-sm font-bold text-slate-700">{product.stock}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                <Eye className="size-4" />
                View
              </button>

              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2.5 text-sm font-bold text-violet-700 transition hover:bg-violet-100">
                <Edit className="size-4" />
                Edit
              </button>

              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-bold text-rose-700 transition hover:bg-rose-100">
                <Trash2 className="size-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default ProductList;
