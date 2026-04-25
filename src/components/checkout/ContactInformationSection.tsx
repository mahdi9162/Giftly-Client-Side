import { CheckoutFormData } from '@/schemas/checkout.schema';
import { User } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const ContactInformationSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormData>();

  return (
    <section className="min-w-0 rounded-2xl md:rounded-3xl border border-rose-100 bg-rose-50/30 p-3 shadow-sm md:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-primary">
            <User className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-base-content sm:text-xl">Contact Information</h2>
            <p className="text-xs text-slate-500 sm:text-sm">We’ll send order updates here.</p>
          </div>
        </div>

        <span className="badge w-fit self-start border-rose-100 bg-rose-50 text-primary">Step 1</span>
      </div>

      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        <input
          type="text"
          {...register('fullName')}
          placeholder="First Name"
          className="input input-bordered h-12 w-full min-w-0 rounded-2xl border-base-300 bg-white focus:border-primary focus:outline-none md:col-span-2 placeholder:text-xs placeholder:md:text-sm"
        />
        {errors.fullName && <p className="mt-2 text-xs text-red-500">{errors.fullName.message}</p>}

        <input
          type="email"
          {...register('email')}
          placeholder="Email Address"
          className="input input-bordered h-12 w-full min-w-0 rounded-2xl border-base-300 bg-white focus:border-primary focus:outline-none md:col-span-2 placeholder:text-xs placeholder:md:text-sm"
        />
        {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>}

        <input
          type="tel"
          {...register('phone')}
          placeholder="Phone Number"
          className="input input-bordered h-12 w-full min-w-0 rounded-2xl border-base-300 bg-white focus:border-primary focus:outline-none md:col-span-2 placeholder:text-xs placeholder:md:text-sm"
        />
        {errors.phone && <p className="mt-2 text-xs text-red-500">{errors.phone.message}</p>}
      </div>
    </section>
  );
};

export default ContactInformationSection;
