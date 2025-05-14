import { encryptedStorage } from "@/lib/secure-local-storage";
import { BasketProduct } from "@/types/basketProduct";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BasketItem = {
  product: BasketProduct;
  quantity: number;
};

type OnResult = (success: boolean, msg: string) => void;

type Options = {
  silent?: boolean;
};

export type BasketStore = {
  items: BasketItem[];
  totalQuantity: number;
  totalPrice: number;
  addItem: (
    product: BasketProduct,
    onResult?: OnResult,
    options?: Options
  ) => void;
  removeItem: (
    product_id: string,
    color_id: string,
    size_id: string,
    removeCompletely?: boolean
  ) => void;
  clearBasket: () => void;
};

export const useBasketStore = create<BasketStore>()(
  persist(
    (set) => ({
      items: [],
      totalPrice: 0,
      totalQuantity: 0,
      addItem: (product, onResult, options) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.product_id === product.product_id &&
              item.product.size_id === product.size_id &&
              item.product.color_id === product.color_id
          );

          let updatedItems;
          if (existingItem) {
            if (existingItem.quantity + 1 > existingItem.product.stock) {
              if (!options?.silent) onResult?.(false, "Stock limit reached.");
              return state;
            }

            updatedItems = state.items.map((item) => {
              return item.product.product_id === product.product_id &&
                item.product.size_id === product.size_id &&
                item.product.color_id === product.color_id
                ? { ...item, quantity: item.quantity + 1 }
                : item;
            });
          } else {
            if (product.stock < 1) {
              if (!options?.silent) onResult?.(false, "Out of Stock");
              return state;
            }
            updatedItems = [...state.items, { product, quantity: 1 }];
          }

          if (!options?.silent) onResult?.(true, "Product added to basket.");

          return {
            items: updatedItems,
            totalQuantity: updatedItems.reduce(
              (total, item) => total + item.quantity,
              0
            ),
            totalPrice: updatedItems.reduce(
              (total, item) => total + item.product.final_price * item.quantity,
              0
            ),
          };
        });
      },
      removeItem: (product_id, color_id, size_id, removeCompletely = false) => {
        set((state) => {
          const updatedItems = state.items.reduce((acc, item) => {
            if (
              item.product.product_id === product_id &&
              item.product.color_id === color_id &&
              item.product.size_id === size_id
            ) {
              if (!removeCompletely && item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]);

          return {
            items: updatedItems,
            totalQuantity: updatedItems.reduce(
              (total, item) => total + item.quantity,
              0
            ),
            totalPrice: updatedItems.reduce(
              (total, item) => total + item.product.final_price * item.quantity,
              0
            ),
          };
        });
      },
      clearBasket: () => set({ items: [], totalPrice: 0, totalQuantity: 0 }),
    }),
    {
      name: "basket-store",
      storage: encryptedStorage,
    }
  )
);
