'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { CartItem } from '@/types/cartItem';

type CartItemProps = {
  items: CartItem[];
};

const CartItems = ({ items }: CartItemProps) => {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-base-200">
          <span className="text-2xl">🛍️</span>
        </div>
        <h3 className="text-base font-semibold text-base-content">Your cart is empty</h3>
        <p className="mt-1 text-sm text-slate-500">Add some beautiful gifts to see them here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item._id} className="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm transition hover:shadow-md">
          <div className="flex gap-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-base-200">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="line-clamp-1 text-sm font-semibold text-base-content sm:text-base">{item.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">${item.price.toFixed(2)}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="btn btn-ghost btn-sm text-slate-400 hover:bg-red-50 hover:text-red-500"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex items-center rounded-full border border-base-300 bg-base-200 p-1">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="btn btn-circle btn-xs border-0 bg-white text-base-content shadow-none hover:bg-secondary hover:text-white"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>

                  <span className="min-w-8 px-3 text-center text-sm font-semibold text-base-content">{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="btn btn-circle btn-xs border-0 bg-white text-base-content shadow-none hover:bg-primary hover:text-white"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-500">Total</p>
                  <p className="text-sm font-bold text-accent">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
