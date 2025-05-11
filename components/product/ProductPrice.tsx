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
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center gap-2">
        <span className={`font-semibold ${sizeClasses[priceSize]}`}>
          {finalPrice.toFixed(2)} TL
        </span>
        <span
          className={`font-semibold ${sizeClasses[discountSize]} line-through text-gray-500`}
        >
          {price.toFixed(2)} TL
        </span>
      </div>

      {discountPercent && discountPercent > 0 && (
        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
          %{Math.round(discountPercent)}
        </span>
      )}
    </div>
  ) : (
    <span
      className={`font-semibold ${sizeClasses[priceSize]} flex items-center justify-start`}
    >
      {finalPrice.toFixed(2)} TL
    </span>
  );
};

export default ProductPrice;
