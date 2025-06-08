import type { ProductColor } from "@/types/product-color";
import type { ProductStock } from "@/types/product-stock";
import React from "react";

type ProductColorSelectorProps = {
  colors: ProductColor[];
  selectedColorId: string;
  stock: ProductStock[];
  onChange: (id: string) => void;
};

const ProductColorSelector = ({
  colors,
  stock,
  selectedColorId,
  onChange,
}: ProductColorSelectorProps) => {
  return (
    <div className="flex">
      {colors.map((color) => {
        const isWhite = color.color.hex === "#FFFFFF";
        const isSelected = color.id === selectedColorId;
        const hasStock = stock.some(
          (s) => s.color_id === color.id && s.stock > 0
        );

        return (
          <div key={color.id} className="mr-2">
            <button
              onClick={() => onChange(color.id)}
              disabled={!hasStock}
              style={{ backgroundColor: color.color.hex }}
              className={`rounded-lg border-1 w-12 h-12 md:w-20 md:h-14  ${
                isSelected
                  ? isWhite
                    ? "border-black"
                    : "border-white"
                  : "border-white/50"
              } ${
                // todo stockda yoksa rengi ayarla
                !hasStock ? " cursor-not-allowed" : "cursor-pointer"
              } relative`}
            >
              {!hasStock && (
                <div
                  className={`absolute top-1/2 left-0 h-0.5 w-full rotate-45 ${isWhite ? "bg-black" : "bg-white"}`}
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductColorSelector;
