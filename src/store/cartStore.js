import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;

        const existing = items.find((item) => item.product_id === product.id);

        if (existing) {
          set({
            items: items.map((item) =>
              item.product_id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item,
            ),
          });
        } else {
          set({
            items: [
              ...items,

              {
                id: product.id,

                product_id: product.id,

                name: product.name,

                price: Number(product.price),

                image_url: product.image_url,

                quantity: 1,
              },
            ],
          });
        }
      },

      removeItem: (id) =>
        set({
          items: get().items.filter((item) => item.product_id !== id),
        }),

      increaseQty: (id) =>
        set({
          items: get().items.map((item) =>
            item.product_id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        }),

      decreaseQty: (id) =>
        set({
          items: get().items.map((item) =>
            item.product_id === id && item.quantity > 1
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          ),
        }),

      clearCart: () =>
        set({
          items: [],
        }),
    }),

    {
      name: "cart-storage",
    },
  ),
);

export default useCartStore;
