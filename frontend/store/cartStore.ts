import { create } from 'zustand';
import { Cart, CartItem } from '@/types';

interface CartStore {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  setCart: (cart: Cart) => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const useCartStore = create<CartStore>((set) => ({
  cart: null,
  isLoading: false,
  error: null,

  setCart: (cart) => set({ cart }),
  addItem: (item) =>
    set((state) => {
      if (!state.cart) return { cart: null };
      const existingItem = state.cart.items.find(
        (i) => i.product._id === item.product._id
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cart.items.push(item);
      }
      return {
        cart: {
          ...state.cart,
          totalPrice: state.cart.items.reduce(
            (total, i) => total + i.product.price * i.quantity,
            0
          ),
        },
      };
    }),
  removeItem: (productId) =>
    set((state) => {
      if (!state.cart) return { cart: null };
      const newItems = state.cart.items.filter((i) => i.product._id !== productId);
      return {
        cart: {
          ...state.cart,
          items: newItems,
          totalPrice: newItems.reduce(
            (total, i) => total + i.product.price * i.quantity,
            0
          ),
        },
      };
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (!state.cart) return { cart: null };
      const item = state.cart.items.find((i) => i.product._id === productId);
      if (item) {
        item.quantity = quantity;
      }
      return {
        cart: {
          ...state.cart,
          totalPrice: state.cart.items.reduce(
            (total, i) => total + i.product.price * i.quantity,
            0
          ),
        },
      };
    }),
  clearCart: () =>
    set({
      cart: {
        _id: '',
        user: '',
        items: [],
        totalPrice: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));

export default useCartStore;
