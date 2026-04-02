import { notFound } from 'next/navigation';
import ProductDetailsView from '@/components/shop/ProductDetailsView';
import type { Product } from '@/types/product';

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      console.error('API_BASE_URL is missing');
      return null;
    }

    const url = `${baseUrl}/products/${id}`;
    console.log('Fetching product from:', url);

    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Fetch failed with status:', res.status);
      return null;
    }

    const data = await res.json();

    return data?.data ?? data;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
};

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) return notFound();

  return <ProductDetailsView product={product} />;
};

export default ProductDetailsPage;
