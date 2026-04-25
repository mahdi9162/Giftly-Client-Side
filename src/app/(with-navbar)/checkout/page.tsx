'use client';

import React from 'react';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import ContactInformationSection from '@/components/checkout/ContactInformationSection';
import ShippingAddressSection from '@/components/checkout/ShippingAddressSection';
import DeliveryMethodSection from '@/components/checkout/DeliveryMethodSection';
import PaymentMethodSection from '@/components/checkout/PaymentMethodSection';
import OrderSummaryCard from '@/components/checkout/OrderSummaryCard';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { CheckoutFormData, checkoutSchema } from '@/schemas/checkout.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCartStore } from '@/store/useCartStore';
import { axiosInstance } from '@/lib/axios';

const Checkout = () => {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      streetAddress: '',
      city: '',
      postalCode: '',
      country: 'Bangladesh',
      deliveryMethod: 'standard',
      paymentMethod: 'cod',
    },
  });

  const deliveryMethod = useWatch({
    control: form.control,
    name: 'deliveryMethod',
  });

  const paymentMethod = useWatch({
    control: form.control,
    name: 'paymentMethod',
  });

  const shippingCost = deliveryMethod === 'express' ? 8 : 0;
  const total = subtotal + shippingCost;

  const checkoutFormSubmit = async (data: CheckoutFormData) => {
    try {
      if (items.length === 0) {
        alert('Cart is empty');
        return;
      }

      const payload = {
        customerInfo: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
        },
        shippingAddress: {
          streetAddress: data.streetAddress,
          city: data.city,
          postalCode: data.postalCode,
          country: data.country,
        },
        deliveryMethod: data.deliveryMethod,
        paymentMethod: data.paymentMethod,
        items: items.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
      };

      if (data.paymentMethod === 'cod') {
        await axiosInstance.post('/orders', payload);

        alert('Order placed successfully');
        return;
      }

      const res = await axiosInstance.post('/payments/create-checkout-session', payload);

      window.location.assign(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-b from-white via-rose-50/20 to-orange-50/20">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        {/* Header */}
        <CheckoutHeader />

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(checkoutFormSubmit)}>
            <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] relative">
              <div className="min-w-0 space-y-6 ">
                {/* Contact Information */}
                <ContactInformationSection />
                {/* Shipping Address */}
                <ShippingAddressSection />
                {/* Delivery Method */}
                <DeliveryMethodSection />
                {/* Payment Method */}
                <PaymentMethodSection />
              </div>

              <aside className="min-w-0 space-y-6">
                <OrderSummaryCard
                  items={items}
                  subtotal={subtotal}
                  shippingCost={shippingCost}
                  total={total}
                  paymentMethod={paymentMethod}
                />
              </aside>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default Checkout;
