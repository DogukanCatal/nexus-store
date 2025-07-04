"use client";
import { Products } from "@/types/products";
import Link from "next/link";
import React from "react";
import ProductPrice from "./ProductPrice";
import ProductHoverImage from "./ProductHoverImage";
import { motion } from "framer-motion";
type ProductItemProps = {
  product: Products;
};

const ProductItem = ({ product }: ProductItemProps) => {
  if (!product || !product.price || product.price <= 0 || !product.is_active)
    return null;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-lg overflow-hidden relative flex flex-col"
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square group"
      >
        <ProductHoverImage
          name={product.name}
          main_img={product.main_image_url}
          second_img={product.second_image_url}
        />

        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <span className="font-bold text-xs text-white">Out Of Stock</span>
          </div>
        )}
        {/* {typeof product.discount_percent === "number" && */}
        {Number(product.discount_percent) > 0 && (
          <span className="absolute bottom-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded rounded-b-none">
            %{Math.round(Number(product.discount_percent))}
          </span>
        )}
      </Link>
      <div className="flex flex-col w-full p-4 bg-[#262626] gap-1">
        <Link
          href={`/product/${product.slug}`}
          className="font-bold text-sm truncate"
        >
          {product.name}
        </Link>
        <ProductPrice
          price={product.price}
          finalPrice={product.final_price}
          discountPercent={product.discount_percent}
          isDiscounted={product.is_discounted}
        />
      </div>
    </motion.div>
  );
};

export default ProductItem;
