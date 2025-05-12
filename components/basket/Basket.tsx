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
import { useBasketStore } from "@/store/basket-store";
import { useShallow } from "zustand/shallow";

const Basket = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { items, addItem, totalQuantity, totalPrice } = useBasketStore(
    useShallow((state) => ({
      items: state.items,
      addItem: state.addItem,
      totalQuantity: state.totalQuantity,
      totalPrice: state.totalPrice,
    }))
  );
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
      <SheetContent className="bg-[#131313] rounded-2xl">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Basket;
