import { CheckoutFormData } from '@/schemas/checkout.schema';
import { MapPin } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const ShippingAddressSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormData>();

  return (
    <section className="min-w-0 rounded-3xl border border-base-300 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-secondary">
            <MapPin className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-base-content sm:text-xl">Shipping Address</h2>
            <p className="text-xs md:text-sm text-slate-500">Enter where we should deliver.</p>
          </div>
        </div>

        <span className="badge w-fit self-start border-orange-100 bg-orange-50 text-secondary">Step 2</span>
      </div>

      <div className="grid min-w-0 gap-4">
        <input
          type="text"
          {...register('streetAddress')}
          placeholder="Street Address"
          className="input input-bordered h-12 w-full min-w-0 rounded-2xl border-base-300 bg-white focus:border-secondary focus:outline-none placeholder:text-xs placeholder:md:text-sm"
        />
        {errors.streetAddress && <p className="mt-2 text-xs text-red-500">{errors.streetAddress.message}</p>}

        <div className="grid min-w-0 gap-4 md:grid-cols-2">
          <input
            type="text"
            {...register('city')}
            placeholder="City"
            className="input input-bordered h-12 w-full min-w-0 rounded-2xl border-base-300 bg-white focus:border-secondary focus:outline-none placeholder:text-xs placeholder:md:text-sm"
          />
          {errors.city && <p className="mt-2 text-xs text-red-500">{errors.city.message}</p>}

          <input
            type="text"
            {...register('postalCode')}
            placeholder="Postal Code"
            className="input input-bordered h-12 w-full min-w-0 rounded-2xl border-base-300 bg-white focus:border-secondary focus:outline-none placeholder:text-xs placeholder:md:text-sm"
          />
          {errors.postalCode && <p className="mt-2 text-xs text-red-500">{errors.postalCode.message}</p>}
        </div>

        <select
          {...register('country')}
          className="select select-bordered h-12 w-full min-w-0 rounded-2xl border-base-300 bg-white focus:border-secondary focus:outline-none text-xs md:text-sm"
        >
          <option>Bangladesh</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Canada</option>
        </select>
      </div>
    </section>
  );
};

export default ShippingAddressSection;
