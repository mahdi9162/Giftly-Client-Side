import React from 'react';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import ContactInformationSection from '@/components/checkout/ContactInformationSection';
import ShippingAddressSection from '@/components/checkout/ShippingAddressSection';
import DeliveryMethodSection from '@/components/checkout/DeliveryMethodSection';
import PaymentMethodSection from '@/components/checkout/PaymentMethodSection';
import OrderSummaryCard from '@/components/checkout/OrderSummaryCard';

const Checkout = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-rose-50/20 to-orange-50/20">
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        {/* Header */}
        <CheckoutHeader />

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
            <OrderSummaryCard />
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Checkout;
