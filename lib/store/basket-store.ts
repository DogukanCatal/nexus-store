import { BasketProduct } from "@/types/basketProduct";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type BasketItem = {
  product: BasketProduct;
  quantity: number;
};

type BasketStore = {
  items: BasketItem[];
  totalQuantity: number;
  totalPrice: number;
  addItem: (product: BasketProduct) => void;
  removeItem: (product_id: string, color_id: string, size_id: string) => void;
  clearBasket: () => void;
};

export const useBasketStore = create<BasketStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,
      totalQuantity: 0,
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.product_id === product.product_id &&
              item.product.size_id === product.size_id &&
              item.product.color_id === product.color_id
          );

          let updatedItems;
          if (existingItem) {
            updatedItems = state.items.map((item) => {
              return item.product.product_id === product.product_id &&
                item.product.size_id === product.size_id &&
                item.product.color_id === product.color_id
                ? { ...item, quantity: item.quantity + 1 }
                : item;
            });
          } else {
            updatedItems = [...state.items, { product, quantity: 1 }];
          }

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
      removeItem: (product_id, color_id, size_id) => {
        set((state) => {
          const updatedItems = state.items.reduce((acc, item) => {
            if (
              item.product.product_id === product_id &&
              item.product.color_id === color_id &&
              item.product.size_id === size_id
            ) {
              if (item.quantity > 1) {
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
      skipHydration: true,
    }
  )
);
