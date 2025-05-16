"use client";
import { ShoppingBasketIcon } from "lucide-react";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BasketItem, useBasketStore } from "@/store/basket-store";
import { useShallow } from "zustand/shallow";
import BasketProducts from "./BasketProducts";
import { getBasketProductFromBasketItem } from "@/lib/utils/basket-utils";
import { Button } from "../ui/button";
import { formatCurrency } from "@/lib/utils/price-utils";
import Link from "next/link";

const Basket = () => {
  const [open, setOpen] = useState<boolean>(false);
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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className="relative cursor-pointer">
          <ShoppingBasketIcon />
          {totalQuantity > 0 && (
            <span className="absolute size-5 text-black -top-2 -right-2 bg-white rounded-full flex items-center justify-center text-xs font-bold">
              {totalQuantity}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="bg-[#131313]  w-full md:rounded-2xl">
        <SheetHeader className="hidden">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-full w-full mx-auto p-4">
          <div className="p-4 border-b">
            <div className="flex items-center justify-center">
              <h1 className="text-white font-bold text-lg">
                Cart {totalQuantity > 0 && `(${totalQuantity})`}
              </h1>
            </div>
          </div>
          {!items || items.length <= 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-bold">Your Basket Is Empty!</span>
            </div>
          ) : (
            <div className="overflow-y-auto flex-1 w-full scrollbar-hidden ">
              <BasketProducts
                products={items}
                onAddItem={(product) => addItemHandler(product)}
                onRemoveItem={(product, removeCompletely?) =>
                  removeItemHandler(product, removeCompletely)
                }
              />
            </div>
          )}
          <div className="py-4 border-t flex flex-col gap-4">
            <div className="flex justify-between items-start ">
              <h1 className="text-l md:text-xl font-bold">Total</h1>
              <h1 className="text-l md:text-xl font-bold">
                {formatCurrency(totalPrice)}
              </h1>
            </div>
            <Link className="w-full cursor-pointer" href="\checkout">
              <Button
                className="w-full font-bold text-sm md:text-base py-6 md:py-8 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Basket;
