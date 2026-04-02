import React from 'react';
import { ShoppingBag, X } from 'lucide-react';

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] transition-opacity duration-300" onClick={onClose} />

      <div className="fixed right-0 top-0 h-screen w-full max-w-md border-l border-rose-100/70 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.16)] transition-transform duration-300">
        <div className="flex h-full flex-col overflow-hidden">
          {/* Header */}
          <div className="relative border-b border-rose-100/80 bg-linear-to-r from-white via-rose-50/70 to-violet-50/60 px-4 py-4 sm:px-5">
            <div className="pointer-events-none absolute -left-10 top-0 h-24 w-24 rounded-full bg-rose-200/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-24 w-24 rounded-full bg-fuchsia-200/20 blur-3xl" />

            <div className="relative flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-100 bg-white shadow-sm">
                  <ShoppingBag className="h-5 w-5 text-rose-500" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Shopping Cart</h2>
                  <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Review your items before checkout</p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close cart drawer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-100 bg-white text-slate-500 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-white">
            <div className="border-b border-dashed border-rose-100/80 px-4 py-3 sm:px-5">
              <div className="flex items-center justify-between rounded-2xl border border-rose-100/80 bg-rose-50/60 px-3 py-2.5">
                <span className="text-xs font-medium text-slate-600 sm:text-sm">Your cart is ready</span>
                <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-rose-500 shadow-sm sm:text-xs">
                  Giftly
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5">Cart content here</div>
          </div>

          {/* Footer placeholder look */}
          <div className="border-t border-rose-100/80 bg-white px-4 py-4 sm:px-5">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-600">Subtotal</span>
                <span className="font-semibold text-slate-900">$0.00</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">Shipping and taxes calculated at checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
