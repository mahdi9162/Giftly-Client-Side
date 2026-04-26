'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { PencilLine } from 'lucide-react';
import { axiosInstance } from '@/lib/axios';
import { uploadImageToImgbb } from '@/lib/imgbb';
import { ProductPreview } from '@/components/dashboard/admin/ProductPreview';

type ProductFormData = {
  name: string;
  category: string;
  description: string;
  price: number;
  image?: FileList;
  alt: string;
  stock: number;
  status: string;
  featured: boolean;
  featuredOrder?: number;
  badge?: 'Best Seller' | 'New';
  rating: number;
  reviews: number;
};

type ProductResponse = {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  alt: string;
  stock: number;
  status: string;
  featured: boolean;
  featuredOrder?: number;
  badge?: 'Best Seller' | 'New';
  rating: number;
  reviews: number;
};

type Status = 'Active' | 'Draft' | 'Out of Stock';
type Category = 'birthday' | 'anniversary' | 'for-him' | 'for-her' | 'family' | 'personalized';

const categoryOptions: { value: Category; label: string }[] = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'for-him', label: 'For Him' },
  { value: 'for-her', label: 'For Her' },
  { value: 'family', label: 'Family' },
  { value: 'personalized', label: 'Personalized' },
];

const statusOptions: Status[] = ['Active', 'Draft', 'Out of Stock'];

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();

  const productId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingImage, setExistingImage] = useState('');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      category: undefined,
      description: '',
      price: 0,
      alt: '',
      stock: 0,
      status: 'Draft',
      featured: false,
      featuredOrder: undefined,
      badge: undefined,
      rating: 4.8,
      reviews: 24,
    },
  });

  const featured = useWatch({ control, name: 'featured' });
  const imageFile = useWatch({ control, name: 'image' });
  const previewName = useWatch({ control, name: 'name' });
  const previewCategory = useWatch({ control, name: 'category' });
  const previewDescription = useWatch({ control, name: 'description' });
  const previewPrice = useWatch({ control, name: 'price' });
  const previewStock = useWatch({ control, name: 'stock' });
  const previewBadge = useWatch({ control, name: 'badge' });
  const previewRating = useWatch({ control, name: 'rating' });
  const previewReviews = useWatch({ control, name: 'reviews' }) || 0;

  const previewCategoryLabel = categoryOptions.find((item) => item.value === previewCategory)?.label || 'Category';

  const charCount = previewDescription?.length || 0;

  const previewUrl = useMemo(() => {
    if (imageFile && imageFile.length > 0) {
      return URL.createObjectURL(imageFile[0]);
    }
    return existingImage;
  }, [imageFile, existingImage]);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);

        const { data } = await axiosInstance.get(`/admin/products/${productId}`);
        const product: ProductResponse = data?.data || data;

        setExistingImage(product.image);

        reset({
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.price,
          alt: product.alt,
          stock: product.stock,
          status: product.status,
          featured: product.featured,
          featuredOrder: product.featuredOrder,
          badge: product.badge,
          rating: product.rating,
          reviews: product.reviews,
        });
      } catch (error) {
        console.error('Fetch product error:', error);
        alert(error instanceof Error ? error.message : 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, reset]);

  const handleEditProductForm = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);

      let imageUrl = existingImage;

      const selectedImage = data.image?.[0];

      if (selectedImage) {
        imageUrl = await uploadImageToImgbb(selectedImage);
      }

      const productPayload = {
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price,
        image: imageUrl,
        alt: data.alt,
        stock: data.stock,
        status: data.status,
        featured: data.featured,
        featuredOrder: data.featured ? data.featuredOrder : undefined,
        badge: data.badge || undefined,
        rating: data.rating,
        reviews: data.reviews,
      };

      await axiosInstance.patch(`/admin/products/${productId}`, productPayload);

      alert('Product updated successfully!');
      router.push('/dashboard/admin/products');
    } catch (error) {
      console.error('Update product error:', error);
      alert(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="rounded-4xl border border-white/60 bg-white/80 p-6 shadow-sm">
        <div className="space-y-4">
          <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
          <div className="h-12 animate-pulse rounded-2xl bg-slate-100" />
          <div className="h-12 animate-pulse rounded-2xl bg-slate-100" />
          <div className="h-28 animate-pulse rounded-2xl bg-slate-100" />
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="overflow-hidden rounded-4xl border border-white/60 bg-linear-to-br from-rose-100 via-white to-violet-100 p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">Admin Panel</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Edit Product</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              Update existing product details for your Giftly store.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-primary to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20">
            <PencilLine className="size-4" />
            Update Product Form
          </div>
        </div>
      </section>

      {/* Form + Preview */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        {/* Form */}
        <div className="rounded-4xl border border-white/60 bg-white/90 p-5 shadow-sm md:p-8">
          <form onSubmit={handleSubmit(handleEditProductForm)} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-black text-slate-900">Basic Information</h2>
              <p className="mt-1 text-sm text-slate-500">Product name, category, and description.</p>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Product Name */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Product Name</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    {...register('name', {
                      required: 'Product name is required',
                    })}
                    className="input input-bordered w-full rounded-2xl border-slate-200 bg-white"
                  />
                  {errors.name && <p className="mt-2 text-sm font-medium text-rose-500">{errors.name.message}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Category</label>
                  <select
                    {...register('category', {
                      required: 'Category is required',
                    })}
                    defaultValue=""
                    className="select select-bordered w-full cursor-pointer rounded-2xl border-slate-200 bg-white"
                  >
                    <option value="" disabled hidden>
                      Select Category
                    </option>

                    {categoryOptions.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="mt-2 text-sm font-medium text-rose-500">{errors.category.message}</p>}
                </div>
              </div>

              {/* Description */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-bold text-slate-700">Description</label>
                <textarea
                  rows={5}
                  placeholder="Write product description"
                  {...register('description', {
                    required: 'Description is required',
                    minLength: {
                      value: 150,
                      message: 'Description must be at least 150 characters',
                    },
                  })}
                  className="textarea textarea-bordered w-full rounded-2xl border-slate-200 bg-white"
                />
                <p className="mt-2 text-xs text-slate-400">{charCount}/150 characters</p>
                {errors.description && <p className="mt-2 text-sm font-medium text-rose-500">{errors.description.message}</p>}
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div>
              <h2 className="text-lg font-black text-slate-900">Pricing & Inventory</h2>
              <p className="mt-1 text-sm text-slate-500">Set the product price and stock quantity.</p>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                {/* Price */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Enter product price"
                    {...register('price', {
                      required: 'Price is required',
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: 'Price must be at least 1',
                      },
                    })}
                    className="input input-bordered w-full rounded-2xl border-slate-200 bg-white"
                  />
                  {errors.price && <p className="mt-2 text-sm font-medium text-rose-500">{errors.price.message}</p>}
                </div>

                {/* Stock */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Stock</label>
                  <input
                    type="number"
                    placeholder="Enter stock quantity"
                    {...register('stock', {
                      required: 'Stock is required',
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: 'Stock cannot be negative',
                      },
                    })}
                    className="input input-bordered w-full rounded-2xl border-slate-200 bg-white"
                  />
                  {errors.stock && <p className="mt-2 text-sm font-medium text-rose-500">{errors.stock.message}</p>}
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Status</label>
                  <select
                    {...register('status', {
                      required: 'Status is required',
                    })}
                    defaultValue=""
                    className="select select-bordered w-full cursor-pointer rounded-2xl border-slate-200 bg-white"
                  >
                    <option value="" disabled hidden>
                      Select Status
                    </option>

                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  {errors.status && <p className="mt-2 text-sm font-medium text-rose-500">{errors.status.message}</p>}
                </div>
              </div>
            </div>

            {/* Media */}
            <div>
              <h2 className="text-lg font-black text-slate-900">Media</h2>
              <p className="mt-1 text-sm text-slate-500">Update product image and alternative text.</p>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Image */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register('image')}
                    className="file-input file-input-bordered w-full rounded-2xl border-slate-200 bg-white"
                  />
                  <p className="mt-2 text-xs text-slate-400">Leave empty if you don’t want to change the image.</p>
                </div>

                {/* Alt */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Alt Text</label>
                  <input
                    type="text"
                    placeholder="Enter alt text"
                    {...register('alt', {
                      required: 'Alt text is required',
                    })}
                    className="input input-bordered w-full rounded-2xl border-slate-200 bg-white"
                  />
                  {errors.alt && <p className="mt-2 text-sm font-medium text-rose-500">{errors.alt.message}</p>}
                </div>
              </div>
            </div>

            {/* Highlight & Social Proof */}
            <div>
              <h2 className="text-lg font-black text-slate-900">Highlight & Social Proof</h2>
              <p className="mt-1 text-sm text-slate-500">Configure featured display and proof indicators.</p>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Featured */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" {...register('featured')} className="checkbox checkbox-primary" />
                    <span className="text-sm font-bold text-slate-700">Mark as featured product</span>
                  </label>

                  {featured && (
                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-bold text-slate-700">Featured Order</label>
                      <input
                        type="number"
                        placeholder="Enter featured order"
                        {...register('featuredOrder', {
                          valueAsNumber: true,
                          required: featured ? 'Featured order is required' : false,
                        })}
                        className="input input-bordered w-full rounded-2xl border-slate-200 bg-white"
                      />
                      {errors.featuredOrder && <p className="mt-2 text-sm font-medium text-rose-500">{errors.featuredOrder.message}</p>}
                    </div>
                  )}
                </div>

                {/* Badge + Rating + Reviews */}
                <div className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Badge</label>
                    <select
                      {...register('badge')}
                      defaultValue=""
                      className="select select-bordered w-full rounded-2xl border-slate-200 bg-white"
                    >
                      <option value="">No Badge</option>
                      <option value="Best Seller">Best Seller</option>
                      <option value="New">New</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Rating</label>
                      <input
                        type="number"
                        step="0.1"
                        {...register('rating', {
                          required: 'Rating is required',
                          valueAsNumber: true,
                          min: { value: 0, message: 'Minimum 0' },
                          max: { value: 5, message: 'Maximum 5' },
                        })}
                        className="input input-bordered w-full rounded-2xl border-slate-200 bg-white"
                      />
                      {errors.rating && <p className="mt-2 text-sm font-medium text-rose-500">{errors.rating.message}</p>}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">Reviews</label>
                      <input
                        type="number"
                        {...register('reviews', {
                          required: 'Reviews count is required',
                          valueAsNumber: true,
                          min: { value: 0, message: 'Cannot be negative' },
                        })}
                        className="input input-bordered w-full rounded-2xl border-slate-200 bg-white"
                      />
                      {errors.reviews && <p className="mt-2 text-sm font-medium text-rose-500">{errors.reviews.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn rounded-2xl border-0 bg-linear-to-r from-primary to-fuchsia-500 px-6 text-white shadow-lg shadow-primary/20"
              >
                {isSubmitting ? 'Updating...' : 'Update Product'}
              </button>

              <button
                type="button"
                onClick={() => router.push('/dashboard/admin/products')}
                className="btn rounded-2xl border border-slate-200 bg-white px-6 text-slate-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="self-start xl:sticky xl:top-24">
          <ProductPreview
            previewUrl={previewUrl}
            categoryLabel={previewCategoryLabel}
            name={previewName || 'Product Name'}
            description={previewDescription || 'Product description will appear here.'}
            rating={previewRating || 0}
            reviews={previewReviews}
            price={previewPrice || 0}
            stock={previewStock || 0}
            badge={previewBadge}
          />
        </div>
      </section>
    </div>
  );
};

export default EditProductPage;
