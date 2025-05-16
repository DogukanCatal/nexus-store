import { BasketItem } from "@/store/basket-store";
import React from "react";
import BasketProduct from "./BasketProduct";

type BasketProductsProps = {
  products: BasketItem[];
  onAddItem: (product: BasketItem) => void;
  onRemoveItem: (product: BasketItem, removeCompletely?: boolean) => void;
};

const BasketProducts = ({
  products,
  onAddItem,
  onRemoveItem,
}: BasketProductsProps) => {
  if (!products) return;
  return (
    <>
      {products.map((product, i) => (
        <div key={i} className="flex-col  w-full gap-2 mt-5 mx-auto">
          <BasketProduct
            product={product}
            onAddItem={(product) => onAddItem(product)}
            onRemoveItem={(product, removeCompletely?) =>
              onRemoveItem(product, removeCompletely)
            }
          />
        </div>
      ))}
    </>
  );
};

export default BasketProducts;
