// src/store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartState } from "../types/cart";

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
  cart: [],

  addToCart: (product) => {
    const cart = get().cart;
    const existing = cart.find((item) => item.id === product.id);
    console.log(existing, "dsfsdfsdf")
    if (existing) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        cart: [...cart, { ...product, quantity: 1 }],
      });
    }
  },

  removeFromCart: (id) => {
    set({
      cart: get().cart.filter((item) => item.id !== id),
    });
  },

  increaseQty: (id) => {
    set({
      cart: get().cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  },

  decreaseQty: (id) => {
    set({
      cart: get().cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    });
  },

  clearCart: () => set({ cart: [] }),

  totalItems: () =>
    get().cart.reduce((sum, item) => sum + item.quantity, 0),
        }) )
);