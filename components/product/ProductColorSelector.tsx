import { ProductColor } from "@/types/productColor";
import { ProductStock } from "@/types/productStock";
import React from "react";

type ProductColorSelectorProps = {
  colors: ProductColor[];
  selectedIndex: number;
  stock: ProductStock[];
  onChange: (index: number) => void;
};

const ProductColorSelector = ({
  colors,
  stock,
  selectedIndex,
  onChange,
}: ProductColorSelectorProps) => {
  return (
    <div className="flex">
      {colors.map((color, i) => {
        const isWhite = color.color.hex === "#FFFFFF";
        const isSelected = i === selectedIndex;
        const hasStock = stock.some((s) =>
          s.color_id === color.id && s.stock > 0 ? true : false
        );
        return (
          <div key={color.id} className="mr-2">
            <button
              onClick={() => onChange(i)}
              disabled={!hasStock}
              style={{ backgroundColor: color.color.hex }}
              className={`rounded-lg border-1 w-12 h-12 md:w-20 md:h-14  ${
                isSelected
                  ? isWhite
                    ? "border-black"
                    : "border-white"
                  : "border-white/50"
              } ${
                !hasStock ? "bg-blue-700 cursor-not-allowed" : "cursor-pointer"
              }`}
            ></button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductColorSelector;
