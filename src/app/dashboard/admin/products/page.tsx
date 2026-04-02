import { Suspense } from 'react';
import AdminProductsClient from '@/components/dashboard/admin/AdminProductsClient';

export default function AdminProductsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading products...</div>}>
      <AdminProductsClient />
    </Suspense>
  );
}
