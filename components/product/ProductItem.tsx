import { Products } from "@/types/products";
import Link from "next/link";
import React from "react";
import ProductPrice from "./ProductPrice";
import ProductHoverImage from "./ProductHoverImage";

type ProductItemProps = {
  product: Products;
};

const ProductItem = ({ product }: ProductItemProps) => {
  if (!product || !product.price || product.price <= 0 || !product.is_active)
    return null;

  console.log(product);
  return (
    <div className="rounded-lg overflow-hidden relative flex flex-col">
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
    </div>
  );
};

export default ProductItem;
