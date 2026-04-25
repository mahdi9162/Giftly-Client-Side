import { CheckoutFormData } from '@/schemas/checkout.schema';
import { CreditCard } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const PaymentMethodSection = () => {
  const { register, watch } = useFormContext<CheckoutFormData>();

  const selectedPaymentMethod = watch('paymentMethod');

  return (
    <section className="min-w-0 rounded-3xl border border-violet-100 bg-violet-50/30 p-5 shadow-sm md:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-accent">
            <CreditCard className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-base-content sm:text-xl">Payment Method</h2>
            <p className="text-xs md:text-sm text-slate-500">Securely pay for your order.</p>
          </div>
        </div>

        <span className="badge w-fit self-start border-violet-100 bg-violet-50 text-accent">Step 4</span>
      </div>

      <div className="space-y-4">
        <label
          className={`flex cursor-pointer flex-col gap-4 rounded-3xl border px-4 py-4 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5 ${
            selectedPaymentMethod === 'cod' ? 'border-primary bg-rose-50/60 shadow-sm' : 'border-base-300 bg-white hover:border-primary'
          }`}
        >
          <div className="flex min-w-0 items-start gap-4">
            <input type="radio" {...register('paymentMethod')} value="cod" className="radio radio-primary mt-1 shrink-0" />
            <div className="min-w-0">
              <p className="font-semibold text-base-content">Cash on Delivery</p>
              <p className="text-xs md:text-sm text-slate-500">Pay after receiving your order.</p>
            </div>
          </div>
        </label>

        <label
          className={`flex cursor-pointer flex-col gap-4 rounded-3xl border px-4 py-4 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5 ${
            selectedPaymentMethod === 'card' ? 'border-accent bg-violet-50/60 shadow-sm' : 'border-base-300 bg-white hover:border-accent'
          }`}
        >
          <div className="flex min-w-0 items-start gap-4">
            <input type="radio" {...register('paymentMethod')} value="card" className="radio radio-secondary mt-1 shrink-0" />

            <div className="min-w-0">
              <p className="font-semibold text-base-content">Card Payment (Stripe)</p>
              <p className="text-xs md:text-sm text-slate-500">Visa, Mastercard, Amex supported.</p>
            </div>
          </div>

          <span className="w-fit self-start rounded-full bg-white px-3 py-1 text-xs font-semibold text-accent shadow-sm sm:self-auto">
            Recommended
          </span>
        </label>
      </div>
    </section>
  );
};

export default PaymentMethodSection;
