import { useEffect, useState } from "react";
import { CartProduct } from "../models/components-props";

export function useCartItems(): CartProduct[] {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  useEffect(() => {
    function getAllCartItems(): CartProduct[] {
      const items: CartProduct[] = [];
      const keys = Object.keys(localStorage);

      // Iterate through keys and retrieve items
      keys.forEach((key) => {
        const value = localStorage.getItem(key);
        if (value) {
          // Parse the JSON string into an object
          const item: CartProduct = JSON.parse(value);
          // Check if the object structure matches that of a CartItem
          if (item && typeof item === "object" && "id" in item) {
            items.push(item);
          }
        }
      });
      return items;
    }

    const items = getAllCartItems();
    setCartItems(items);
  }, []);

  return cartItems;
}
