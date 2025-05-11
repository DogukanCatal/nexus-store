"use client";
import { Product } from "@/types/product";
import React, { useState } from "react";
import ProductColorSelector from "./ProductColorSelector";
import ProductSizeSelector from "./ProductSizeSelector";

type ProductOptionsWrapperProps = {
  product: Product;
};

const ProductOptionsWrapper = ({ product }: ProductOptionsWrapperProps) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  // todo
  // const selectedColor = product.product_colors[selectedColorIndex];
  // const selectedSize = product.product_sizes[selectedSizeIndex];
  const orderedSizes = product.product_sizes.sort(
    (a, b) => a.size.sort_order - b.size.sort_order
  );

  console.log("sizes", orderedSizes);

  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold text-white/50 text-xs md:text-sm">
        Color:{" "}
        <span className="font-bold text-white">
          {product.product_colors[selectedColorIndex].color.name}
        </span>
      </span>

      <ProductColorSelector
        colors={product.product_colors}
        stock={product.product_stock}
        selectedIndex={selectedColorIndex}
        onChange={(index) => setSelectedColorIndex(index)}
      />

      <span className="font-semibold text-white/50 text-xs md:text-sm mt-2">
        Size:{" "}
        <span className="font-bold text-white">
          {orderedSizes[selectedSizeIndex].size.label}
        </span>
      </span>

      <ProductSizeSelector
        sizes={orderedSizes}
        stock={product.product_stock}
        selectedIndex={selectedSizeIndex}
        onChange={(index) => setSelectedSizeIndex(index)}
      />
    </div>
  );
};

export default ProductOptionsWrapper;
