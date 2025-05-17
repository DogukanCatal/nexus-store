import { formatCurrency } from "@/lib/utils/price-utils";
import React from "react";

type ProductPriceProps = {
  price: number;
  finalPrice: number;
  isDiscounted: boolean;
  discountPercent?: number | null;
  priceSize?: "small" | "medium" | "large";
  discountSize?: "small" | "medium" | "large";
};

const ProductPrice = ({
  price,
  finalPrice,
  isDiscounted,
  discountPercent,
  priceSize = "medium",
  discountSize = "small",
}: ProductPriceProps) => {
  const sizeClasses = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-lg",
  };

  return isDiscounted ? (
    <div className="flex items-center justify-start gap-2">
      {discountPercent && discountPercent > 0 && (
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
          %{Math.round(discountPercent)}
        </span>
      )}
      <div className="flex flex-col items-center">
        <span
          className={`font-bold ${sizeClasses[discountSize]} line-through text-gray-500`}
        >
          {formatCurrency(price)}
        </span>
        <span className={`font-bold ${sizeClasses[priceSize]}`}>
          {formatCurrency(finalPrice)}
        </span>
      </div>
    </div>
  ) : (
    <span
      className={`font-bold ${sizeClasses[priceSize]} flex items-center justify-start`}
    >
      {formatCurrency(price)}
    </span>
  );
};

export default ProductPrice;
