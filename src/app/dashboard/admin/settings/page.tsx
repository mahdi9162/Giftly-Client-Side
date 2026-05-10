'use client';

import React, { useEffect, useState } from 'react';
import { Store, Mail, Phone, MapPin, Coins, UploadCloud } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { useStoreSettings } from '@/hooks/useStoreSettings';
import Image from 'next/image';
import { uploadImageToImgbb } from '@/lib/imgbb';
import toast from 'react-hot-toast';

type StoreFormData = {
  storeName: string;
  supportEmail: string;
  phone: string;
  address: string;
  currency: string;
  logoUrl: string;
};

const PageSetting = () => {
  const queryClient = useQueryClient();
  const { store, isLoading } = useStoreSettings();
  const [selectedLogoName, setSelectedLogoName] = useState('');
  const [isLogoUploading, setIsLogoUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { dirtyFields },
  } = useForm<StoreFormData>({
    defaultValues: {
      storeName: '',
      supportEmail: '',
      phone: '',
      address: '',
      currency: 'USD',
      logoUrl: '',
    },
  });

  const logoPreview = useWatch({
    control,
    name: 'logoUrl',
  });

  const handleLogoChange = async (file: File) => {
    try {
      setSelectedLogoName(file.name);
      setIsLogoUploading(true);

      const logoUrl = await uploadImageToImgbb(file);

      setValue('logoUrl', logoUrl, {
        shouldDirty: true,
      });
    } catch (error) {
      console.error(error);
      toast.error('Logo upload failed');
    } finally {
      setIsLogoUploading(false);
    }
  };

  useEffect(() => {
    if (store) {
      reset({
        storeName: store.storeName || '',
        supportEmail: store.supportEmail || '',
        phone: store.phone || '',
        address: store.address || '',
        currency: store.currency || 'USD',
        logoUrl: store.logoUrl || '',
      });
    }
  }, [store, reset]);

  const updateStoreMutation = useMutation({
    mutationFn: (payload: Partial<StoreFormData>) => axiosInstance.patch('/store', payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store-settings'] });
      toast.success('Store settings updated successfully!');
    },

    onError: () => {
      toast.error('Failed to update store settings.');
    },
  });

  const onSubmit = (data: StoreFormData) => {
    const payload: Partial<StoreFormData> = {};

    Object.keys(dirtyFields).forEach((key) => {
      const field = key as keyof StoreFormData;
      payload[field] = data[field];
    });

    if (Object.keys(payload).length === 0) {
      toast('No changes to update.');
      return;
    }

    updateStoreMutation.mutate(payload);
  };

  if (isLoading) {
    return <p className="p-6 text-sm text-slate-500">Loading store settings...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <section className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
              Admin Settings
            </p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Store Information</h1>
            <p className="mt-2 text-sm text-slate-500 md:text-base">
              Manage your store identity, contact details, and branding preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Settings Form */}
      <section className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          {/* Left form */}
          <div className="space-y-5">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Store className="h-4 w-4 text-rose-500" />
                Store Name
              </label>
              <input
                type="text"
                {...register('storeName')}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Mail className="h-4 w-4 text-rose-500" />
                Support Email
              </label>
              <input
                type="email"
                {...register('supportEmail')}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Phone className="h-4 w-4 text-rose-500" />
                Phone Number
              </label>
              <input
                type="text"
                {...register('phone')}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin className="h-4 w-4 text-rose-500" />
                Address
              </label>
              <textarea
                rows={4}
                {...register('address')}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Coins className="h-4 w-4 text-rose-500" />
                Currency
              </label>
              <select
                {...register('currency')}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100 cursor-pointer"
              >
                <option value="BDT">BDT - Bangladeshi Taka</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
          </div>

          {/* Right side logo */}
          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
              <h2 className="text-lg font-semibold text-slate-900">Store Logo</h2>
              <p className="mt-1 text-sm text-slate-500">Upload your store logo to personalize your brand.</p>

              <div className="mt-5 rounded-3xl border-2 border-dashed border-rose-200 bg-white p-6 text-center">
                <label htmlFor="logoUpload" className="block cursor-pointer">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50">
                    <UploadCloud className="h-7 w-7 text-rose-500" />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-700">Upload Logo</p>

                  <p className="mt-1 text-xs text-slate-400">PNG, JPG or WEBP up to 2MB</p>

                  <span className="mt-4 inline-flex rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-500">
                    {isLogoUploading ? 'Uploading...' : 'Choose File'}
                  </span>

                  {selectedLogoName && <p className="mt-3 text-xs text-slate-500">Selected: {selectedLogoName}</p>}
                </label>

                <input
                  id="logoUpload"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleLogoChange(file);
                    }
                  }}
                />

                <input type="hidden" {...register('logoUrl')} />
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Preview</h3>

              <div className="mt-4 flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                {/* Logo preview */}
                {logoPreview ? (
                  <Image src={logoPreview} width={56} height={56} alt="logo" className="h-16 w-16 rounded-2xl object-contain " />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-rose-500 to-fuchsia-500 text-lg font-bold text-white">
                    {store?.storeName?.charAt(0) || 'G'}
                  </div>
                )}

                <div>
                  <p className="font-semibold text-slate-800">{store?.storeName || 'Giftly'}</p>
                  <p className="text-sm text-slate-500">Thoughtful gifting, powered by AI.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom save */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={updateStoreMutation.isPending}
            className="rounded-2xl bg-linear-to-r from-rose-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {updateStoreMutation.isPending ? 'Saving...' : 'Save Store Info'}
          </button>
        </div>
      </section>
    </form>
  );
};

export default PageSetting;
