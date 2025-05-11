import { ProductSize } from "@/types/productSize";
import { ProductStock } from "@/types/productStock";
import React from "react";

type ProductSizeSelectorProps = {
  sizes: ProductSize[];
  stock: ProductStock[];
  selectedIndex: number;
  onChange: (index: number) => void;
};

const ProductSizeSelector = ({
  sizes,
  stock,
  selectedIndex,
  onChange,
}: ProductSizeSelectorProps) => {
  return (
    <div className="flex">
      {sizes.map((size, i) => {
        const isSelected = i === selectedIndex;
        const hasStock = stock.some(
          (s) => s.size_id === size.id && s.stock > 0
        );
        return (
          <div key={size.id} className="mr-2">
            <button
              onClick={() => onChange(i)}
              disabled={!hasStock}
              className={`rounded-lg border-1 w-12 h-12 md:w-20 md:h-14 bg-[#131313] font-bold text-xs md:text-sm ${
                isSelected ? "border-white" : "border-white/50"
              } ${
                !hasStock
                  ? "bg-white/50 cursor-not-allowed"
                  : "hover:cursor-pointer"
              }`}
            >
              {size.size.label}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductSizeSelector;
