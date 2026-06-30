"use client";

import useCartStore from "@/store/cartStore";
import { toast } from "sonner";

export default function AddToCartButton({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  function handleAddCart() {
    if (product.stock <= 0) {
      toast.error("Product is out of stock");

      return;
    }

    addItem(product);

    toast.success("Added to cart");
  }

  return (
    <button
      onClick={handleAddCart}
      className="
w-full
h-12
rounded-xl
border
bg-black
text-white
font-semibold
text-sm
hover:bg-gray-800
transition
"
    >
      🛒 Add To Cart
    </button>
  );
}
