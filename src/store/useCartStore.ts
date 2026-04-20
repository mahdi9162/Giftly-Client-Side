import { CartItem } from '@/types/cartItem';
import { create } from 'zustand';

type CartStore = {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (_id: string) => void;
  decreaseQuantity: (_id: string) => void;
  increaseQuantity: (_id: string) => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addToCart(product) {
    set((state) => {
      const existingProduct = state.items.find((item) => item._id === product._id);

      if (existingProduct) {
        return {
          items: state.items.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)),
        };
      }
      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    });
  },

  removeFromCart(_id) {
    set((state) => ({
      items: state.items.filter((item) => item._id !== _id),
    }));
  },

  decreaseQuantity(_id) {
    set((state) => ({
      items: state.items
        .map((item) => (item._id === _id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    }));
  },

  increaseQuantity(_id) {
    set((state) => ({
      items: state.items.map((item) => (item._id === _id ? { ...item, quantity: item.quantity + 1 } : item)),
    }));
  },

  getSubtotal(): number {
    return useCartStore.getState().items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
  },

  getTotalItems(): number {
    return useCartStore.getState().items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
  },
}));
