export async function getProducts(searchParams: { category?: string; search?: string; sort?: string; rating?: string; page?: string }) {
  const params = new URLSearchParams();

  if (searchParams.category) params.set('category', searchParams.category);
  if (searchParams.search) params.set('search', searchParams.search);
  if (searchParams.sort) params.set('sort', searchParams.sort);
  if (searchParams.rating) params.set('rating', searchParams.rating);
  if (searchParams.page) params.set('page', searchParams.page);

  params.set('limit', '9');

  const res = await fetch(`${process.env.API_BASE_URL}/products?${params.toString()}`, { next: { revalidate: 300 } });

  if (!res.ok) throw new Error('Failed');

  return res.json();
}
