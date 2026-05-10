'use client';

import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { PackagePlus } from 'lucide-react';
import { ProductPreview } from '@/components/dashboard/admin/ProductPreview';
import { uploadImageToImgbb } from '@/lib/imgbb';
import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';

type ProductFormData = {
  name: string;
  category: string;
  description: string;
  price: number;
  image: FileList;
  alt: string;
  stock: number;
  status: string;
  featured: boolean;
  featuredOrder?: number;
  badge?: 'Best Seller' | 'New';
  rating: number;
  reviews: number;
};

type status = 'Active' | 'Draft' | 'Out of Stock';
type Category = 'birthday' | 'anniversary' | 'for-him' | 'for-her' | 'family' | 'personalized';

const categoryOptions: { value: Category; label: string }[] = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'for-him', label: 'For Him' },
  { value: 'for-her', label: 'For Her' },
  { value: 'family', label: 'Family' },
  { value: 'personalized', label: 'Personalized' },
];

const statusOptions: status[] = ['Active', 'Draft', 'Out of Stock'];

export default function CreateProductPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      category: undefined,
      description: '',
      price: 0,
      alt: '',
      stock: 0,
      status: '',
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
  const charCount = previewDescription.length;

  const previewUrl = useMemo(() => {
    if (imageFile && imageFile.length > 0) {
      return URL.createObjectURL(imageFile[0]);
    }
    return '';
  }, [imageFile]);

  const handleProductForm = async (data: ProductFormData) => {
    try {
      // image file chk
      const imageFile = data.image?.[0];

      if (!imageFile) {
        toast.error('Please select an image');
        return;
      }

      const loadingToast = toast.loading('Creating product...');

      //   image upload to imagebb
      const imageUrl = await uploadImageToImgbb(imageFile);

      // final product payload
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

      //  backend call
      await axiosInstance.post('/products', productPayload);
      toast.success('Product created successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Create product error:', error);
      toast.error(error instanceof Error ? error.message : 'Something went wrong', { id: loadingToast });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="overflow-hidden rounded-4xl border border-white/60 bg-linear-to-br from-rose-100 via-white to-violet-100 p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">Admin Panel</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Add Product</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              Create a new product for your Giftly store. Fill in the required details below.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-primary to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20">
            <PackagePlus className="size-4" />
            New Product Form
          </div>
        </div>
      </section>

      {/* Form + Preview */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        {/* Form */}
        <div className="rounded-4xl border border-white/60 bg-white/90 p-5 shadow-sm md:p-8">
          <form onSubmit={handleSubmit(handleProductForm)} className="space-y-6">
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
                    className="select select-bordered w-full rounded-2xl border-slate-200 bg-white cursor-pointer"
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
                      message: 'Description must be at least 120 characters',
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
                    {...register('status', { required: 'Status is required' })}
                    className="select select-bordered w-full rounded-2xl border-slate-200 bg-white cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Select Product Status
                    </option>
                    {statusOptions.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Rating & Reviews */}
            <div>
              <h2 className="text-lg font-black text-slate-900">Rating & Reviews</h2>
              <p className="mt-1 text-sm text-slate-500">Set product rating and review count for preview/display.</p>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Rating */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Enter rating"
                    {...register('rating', {
                      required: 'Rating is required',
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: 'Rating must be at least 1',
                      },
                      max: {
                        value: 5,
                        message: 'Rating cannot be more than 5',
                      },
                    })}
                    className="input input-bordered w-full rounded-2xl border-slate-200 bg-white"
                  />
                  {errors.rating && <p className="mt-2 text-sm font-medium text-rose-500">{errors.rating.message}</p>}
                </div>

                {/* Reviews */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Reviews</label>
                  <input
                    type="number"
                    placeholder="Enter review count"
                    {...register('reviews', {
                      required: 'Reviews count is required',
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: 'Reviews cannot be negative',
                      },
                    })}
                    className="input input-bordered w-full rounded-2xl border-slate-200 bg-white"
                  />
                  {errors.reviews && <p className="mt-2 text-sm font-medium text-rose-500">{errors.reviews.message}</p>}
                </div>
              </div>
            </div>

            {/* Product Media */}
            <div>
              <h2 className="text-lg font-black text-slate-900">Product Media</h2>
              <p className="mt-1 text-sm text-slate-500">Upload product image and add alt text for accessibility.</p>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Product Image */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register('image', {
                      required: 'Product image is required',
                      validate: {
                        fileSize: (value) => {
                          const file = (value as FileList)?.[0];
                          if (!file) return true;
                          return file.size <= 2 * 1024 * 1024 || 'Max file size is 2MB';
                        },
                      },
                    })}
                    className="file-input file-input-bordered w-full rounded-2xl border-slate-200 bg-white"
                  />

                  <p className="mt-2 text-xs text-slate-400">Recommended size: 500KB – 1MB (Max: 2MB)</p>

                  {errors.image && <p className="mt-2 text-sm font-medium text-rose-500">{errors.image.message as string}</p>}
                </div>

                {/* Image Alt Text */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">Image Alt Text</label>
                  <input
                    type="text"
                    placeholder="Write image alt text"
                    {...register('alt', {
                      required: 'Alt text is required',
                    })}
                    className="input input-bordered w-full rounded-2xl border-slate-200 bg-white"
                  />
                  {errors.alt && <p className="mt-2 text-sm font-medium text-rose-500">{errors.alt.message}</p>}
                </div>
              </div>
            </div>

            {/* Display Settings */}
            <div>
              <h2 className="text-lg font-black text-slate-900">Display Settings</h2>
              <p className="mt-1 text-sm text-slate-500">Decide badge and featured product settings.</p>

              <div className="mt-5 space-y-5 rounded-[28px] border border-rose-100 bg-rose-50/40 p-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Product Badge */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">Badge</label>
                    <select
                      {...register('badge')}
                      defaultValue=""
                      className="select select-bordered w-full rounded-2xl border-slate-200 bg-white cursor-pointer"
                    >
                      <option value="">No badge</option>
                      <option value="Best Seller">Best Seller</option>
                      <option value="New">New</option>
                    </select>
                  </div>
                </div>

                {/* Featured Product */}
                <label className="flex items-center gap-3">
                  <input type="checkbox" {...register('featured')} className="checkbox checkbox-primary" />
                  <span className="text-sm font-bold text-slate-700">Mark as featured product</span>
                </label>

                {featured && (
                  <div className="max-w-sm">
                    {/* Featured Order */}
                    <label className="mb-2 block text-sm font-bold text-slate-700">Featured Order</label>
                    <input
                      type="number"
                      placeholder="Enter featured position"
                      {...register('featuredOrder', {
                        valueAsNumber: true,
                        required: featured ? 'Featured order is required when featured is checked' : false,
                        min: {
                          value: 1,
                          message: 'Featured order must be at least 1',
                        },
                        max: {
                          value: 4,
                          message: 'Featured order must be within 4',
                        },
                      })}
                      className="input input-bordered w-full rounded-2xl border-slate-200 bg-white"
                    />
                    {errors.featuredOrder && <p className="mt-2 text-sm font-medium text-rose-500">{errors.featuredOrder.message}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-primary to-fuchsia-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 cursor-pointer"
              >
                <PackagePlus className="size-4" />
                Create Product
              </button>

              <button
                type="button"
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* ------------------------- Preview -------------------------*/}
        <div className="self-start xl:sticky xl:top-24">
          <ProductPreview
            previewUrl={previewUrl}
            categoryLabel={previewCategoryLabel}
            name={previewName || ''}
            description={previewDescription || ''}
            rating={previewRating || 0}
            reviews={previewReviews || 0}
            price={previewPrice || 0}
            stock={previewStock || 0}
            badge={previewBadge}
          />
        </div>
      </section>
    </div>
  );
}
