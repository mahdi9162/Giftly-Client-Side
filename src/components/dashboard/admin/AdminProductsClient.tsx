'use client';

import { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Package2, Plus, Search, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ProductList from '@/components/dashboard/admin/ProductList';
import PaginationAdmin from '@/components/dashboard/admin/PaginationAdmin';
import { axiosInstance } from '@/lib/axios';

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Active' | 'Draft' | 'Out of Stock';
  image: string;
};

const fetchAdminProducts = async (currentPage: number, statusFilter: string) => {
  const query = new URLSearchParams();

  query.set('page', String(currentPage));
  query.set('limit', '9');

  if (statusFilter !== 'All') {
    query.set('status', statusFilter);
  }

  const res = await axiosInstance.get(`/admin/products?${query.toString()}`);

  return res.data;
};

const AdminProductsClient = () => {
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const currentPage = Number(searchParams.get('page')) || 1;
  const statusFilter = searchParams.get('status') || 'All';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-products', currentPage, statusFilter],
    queryFn: () => fetchAdminProducts(currentPage, statusFilter),
  });

  const products: Product[] = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  const meta = useMemo(() => {
    return (
      data?.meta || {
        totalProducts: 0,
        totalPages: 0,
        currentPage: 1,
        perPage: 9,
        activeProducts: 0,
        draftProducts: 0,
        outOfStockProducts: 0,
      }
    );
  }, [data]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const keyword = search.toLowerCase();

      return (
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword) ||
        product._id.toLowerCase().includes(keyword)
      );
    });
  }, [search, products]);

  const getPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    return `?${params.toString()}`;
  };

  const getStatusHref = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', '1');

    if (status === 'All') {
      params.delete('status');
    } else {
      params.set('status', status);
    }

    return `?${params.toString()}`;
  };

  const handleProductDeleted = () => {
    queryClient.invalidateQueries({
      queryKey: ['admin-products'],
    });
  };

  if (isLoading) {
    return <p className="p-6 font-semibold">Loading products...</p>;
  }

  if (isError) {
    return <p className="p-6 font-semibold text-red-500">Failed to load products.</p>;
  }

  return (
    <section className="space-y-6">
      <section className="overflow-hidden rounded-4xl border border-white/60 bg-linear-to-br from-rose-100 via-white to-violet-100 p-5 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">Admin Panel</p>
            <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl">Manage Products</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              Add, edit, organize, and monitor all store products from one polished admin workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-50">
              <SlidersHorizontal className="size-4" />
              Bulk Actions
            </button>

            <Link
              href="/dashboard/admin/products/create"
              className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-linear-to-r from-primary to-fuchsia-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5"
            >
              <Plus className="size-4" />
              Add Product
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Total Products', meta.totalProducts, 'from-rose-100'],
          ['Active Products', meta.activeProducts, 'from-orange-100'],
          ['Draft Items', meta.draftProducts, 'from-violet-100'],
          ['Out of Stock', meta.outOfStockProducts, 'from-slate-100'],
        ].map(([label, value, color]) => (
          <div key={label} className={`rounded-[28px] border border-slate-200/70 bg-linear-to-br ${color} to-white p-5 shadow-sm`}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <Package2 className="size-5 text-slate-400" />
            </div>
            <p className="mt-4 text-3xl font-black tracking-tight text-slate-900">{value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[28px] border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur md:p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50/60 px-4 py-3">
            <Search className="size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by product name, category, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {['All', 'Active', 'Draft', 'Out of Stock'].map((status) => (
              <Link
                key={status}
                href={getStatusHref(status)}
                className={`rounded-2xl px-4 py-2.5 text-sm font-bold transition ${
                  statusFilter === status
                    ? 'bg-linear-to-r from-primary to-fuchsia-500 text-white shadow-md shadow-primary/20'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {status}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProductList
        filteredProducts={filteredProducts}
        totalProducts={meta.totalProducts}
        meta={meta}
        onProductDeleted={handleProductDeleted}
      />

      <PaginationAdmin currentPage={meta.currentPage} totalPages={meta.totalPages} getPageHref={getPageHref} />
    </section>
  );
};

export default AdminProductsClient;
