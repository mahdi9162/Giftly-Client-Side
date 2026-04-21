'use client';

import React from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import CartItems from './CartItems';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const router = useRouter();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-999">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[3px] transition-opacity duration-300" onClick={onClose} />

      <div className="fixed right-0 top-0 h-screen w-full max-w-md border-l border-base-300 bg-base-100 shadow-[0_20px_60px_rgba(15,23,42,0.16)] transition-transform duration-300">
        <div className="flex h-full flex-col overflow-hidden">
          {/* Header */}
          <div className="relative border-b border-base-300 bg-linear-to-r from-orange-50 via-amber-100 to-rose-50 px-4 py-4 sm:px-5">
            <div className="pointer-events-none absolute -left-10 top-0 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-24 w-24 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-base-300 bg-secondary/80 shadow-sm">
                  <ShoppingBag className="h-5 w-5 text-white" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-base-content sm:text-lg">Shopping Cart</h2>
                  <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                    {items.length} item{items.length !== 1 ? 's' : ''} in your cart
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close cart drawer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-base-300 bg-primary/70 text-white shadow-sm transition hover:border-primary/30 hover:bg-rose-50 hover:text-primary cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-base-100">
            <div className="border-b border-dashed border-base-300 px-4 py-3 sm:px-5">
              <div className="flex items-center justify-between rounded-2xl border border-base-300 bg-rose-50/50 px-3 py-2.5">
                <span className="text-xs font-medium text-slate-600 sm:text-sm">Ready for checkout</span>
                <span className=" px-2.5 py-1 text-[11px] font-semibold">
                  <Image src={'/favicon.ico'} className="w-8 h-8" alt="Logo" height={32} width={12} />
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-base-content">Cart Items</h3>
                <span className="badge badge-outline border-base-300 text-slate-600">
                  {items.length} item{items.length !== 1 ? 's' : ''}
                </span>
              </div>

              <CartItems items={items} />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-base-300 bg-white px-4 py-4 sm:px-5">
            <div className="rounded-2xl border border-base-300 bg-base-200/60 px-4 py-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-600">Subtotal</span>
                <span className="text-base font-bold text-base-content">${subtotal.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">Shipping and taxes calculated at checkout</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button onClick={onClose} className="btn border-base-300 bg-white text-base-content hover:bg-base-200">
                Continue Shopping
              </button>

              <button onClick={handleCheckout} className="btn btn-primary text-white">
                Checkout
              </button>
            </div>

            <p className="mt-3 text-center text-[11px] text-slate-400">Secure checkout powered by Giftly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
