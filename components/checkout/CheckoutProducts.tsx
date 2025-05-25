"use client";
import { BasketItem, useBasketStore } from "@/store/basket-store";
import React from "react";
import { useShallow } from "zustand/shallow";
import BasketProduct from "../basket/BasketProduct";
import { getBasketProductFromBasketItem } from "@/lib/utils/basket-utils";
import { formatCurrency } from "@/lib/utils/price-utils";
import useMediaQuery from "@/lib/use-media-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const CheckoutProducts = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { items, totalQuantity, addItem, removeItem, totalPrice } =
    useBasketStore(
      useShallow((state) => ({
        items: state.items,
        addItem: state.addItem,
        removeItem: state.removeItem,
        totalQuantity: state.totalQuantity,
        totalPrice: state.totalPrice,
      }))
    );
  const addItemHandler = (product: BasketItem) => {
    const basketItem = getBasketProductFromBasketItem(product);
    addItem(basketItem);
  };
  const removeItemHandler = (
    product: BasketItem,
    removeCompletely?: boolean
  ) => {
    console.log(removeCompletely);
    removeItem(
      product.product.product_id,
      product.product.color_id,
      product.product.size_id,
      removeCompletely
    );
  };

  if (!items) return;
  if (isMobile)
    return (
      <div className="w-full order-1 mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold text-sm md:text-base hover:no-underline cursor-pointer px-4 py-6 bg-[#262626] rounded-none">
              <div className="flex items-center justify-between w-full ">
                <h1>Order Summary ({totalQuantity})</h1>
                <h1>{formatCurrency(totalPrice)}</h1>
              </div>
            </AccordionTrigger>

            <AccordionContent className="transition-all duration-500 ease-in-out font-semibold">
              <div className="overflow-y-auto flex-1 w-full scrollbar-hidden bg-[#454545] px-4">
                {items.map((product, i) => (
                  <div key={i} className="flex-col  w-full gap-2 mt-5 mx-auto">
                    <BasketProduct
                      product={product}
                      onAddItem={(product) => addItemHandler(product)}
                      onRemoveItem={(product, removeCompletely?) =>
                        removeItemHandler(product, removeCompletely)
                      }
                    />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  return (
    //h-[calc(100vh-84px)] 84px => 50 logo + py-4, will be used only on this page
    <div className="order-1 md:order-2 w-full flex-1 bg-[#454545] px-4">
      <div className="flex flex-col w-full sticky top-0 bg-[#454545] rounded-lg">
        <div className="flex items-center justify-center w-full size-20">
          <h1 className="font-bold text-xl md:text-2xl">Order Summary</h1>
        </div>
        <div className="overflow-y-auto max-h-[75vh] w-full scrollbar-hidden bg-[#454545] border-b border-t ">
          {items.map((product, i) => (
            <div key={i} className="flex-col  w-full gap-2 mt-5 mx-auto">
              <BasketProduct
                product={product}
                onAddItem={(product) => addItemHandler(product)}
                onRemoveItem={(product, removeCompletely?) =>
                  removeItemHandler(product, removeCompletely)
                }
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-5">
          <h1 className="text-l md:text-xl font-bold">
            Total ({totalQuantity})
          </h1>
          <h1 className="text-l md:text-xl font-bold">
            {formatCurrency(totalPrice)}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProducts;
