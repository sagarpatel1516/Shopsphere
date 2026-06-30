import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const exists = get().items.some((item) => item.id === product.id);

        if (exists) return;

        set({
          items: [...get().items, product],
        });
      },

      removeItem: (id) =>
        set({
          items: get().items.filter((item) => item.id !== id),
        }),

      clearWishlist: () =>
        set({
          items: [],
        }),
    }),

    {
      name: "wishlist-storage",
    },
  ),
);

export default useWishlistStore;
