import { formatCurrency } from "@/lib/utils/price-utils";
import { BasketItem } from "@/store/basket-store";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

type BasketProductProps = {
  product: BasketItem;
  onAddItem: (product: BasketItem) => void;
  onRemoveItem: (product: BasketItem, removeCompletely?: boolean) => void;
};

const BasketProduct = ({
  product,
  onAddItem,
  onRemoveItem,
}: BasketProductProps) => {
  return (
    <>
      <div className="relative flex items-center justify-start gap-2">
        <div className="relative aspect-square rounded-lg overflow-hidden block shrink-0 w-20">
          <Image
            src={product.product.image}
            alt={`basket ${product.product.name}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className=" flex flex-col items-start justify-center w-full min-w-0 flex-1 space-y-2">
          <h1 className="truncate whitespace-nowrap overflow-hidden font-bold text-sm md:text-base w-full pr-10 hover:">
            {product.product.name}
          </h1>
          <span className="font-bold text-xs md:text-sm text-white">
            ₺ {product.product.final_price.toFixed(2)}
          </span>
          <div className="flex gap-2">
            <div
              style={{ background: product.product.color_hex }}
              className="size-5 border rounded overflow-hidden"
            ></div>
            <span className="font-bold text-xs md:text-sm text-white">
              {product.product.size_name}
            </span>
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="grid grid-cols-3 w-24 py-2 border-2 rounded-lg overflow-hidden ">
              <button
                className="font-bold text-sm text-white cursor-pointer text-center"
                onClick={() => onRemoveItem(product)}
              >
                -
              </button>
              <div className=" flex items-center justify-center">
                <span className="font-bold text-xs md:text-sm text-white block">
                  {product.quantity}
                </span>
              </div>
              <button
                className="font-bold text-sm text-white cursor-pointer text-center"
                onClick={() => onAddItem(product)}
              >
                +
              </button>
            </div>
            <div className=" flex flex-col items-center justify-center">
              {product.product.discount_price && (
                <span className="font-bold text-xs md:text-sm text-gray-500 line-through">
                  {formatCurrency(product.product.price)}
                </span>
              )}

              <span className="font-bold text-xs md:text-sm text-white">
                {formatCurrency(product.product.final_price)}
              </span>
            </div>
          </div>
        </div>

        <button
          className="absolute right-0 top-0 cursor-pointer "
          onClick={() => onRemoveItem(product, true)}
        >
          <TrashIcon className="size-5 text-red-400" />
        </button>
      </div>
      <div className="border-b rounded mt-2" />
    </>
  );
};

export default BasketProduct;
