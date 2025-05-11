import React from "react";
import ProductHoverImage from "../product/ProductHoverImage";
import ProductPrice from "../product/ProductPrice";
import { Products } from "@/types/products";

type SearchResultProps = {
  product: Products;
};

const SearchResult = ({ product }: SearchResultProps) => {
  return (
    <div className="flex items-center justify-start gap-2 w-full mb-4 bg-blue-600 group">
      <div className="rounded-lg overflow-hidden relative block aspect-square w-24 shrink-0">
        <ProductHoverImage
          name={product.name}
          main_img={product.main_image_url}
          second_img={product.second_image_url}
        />
      </div>
      <div className="flex flex-col gap-2 justify-center items-start min-w-0 flex-1">
        <span className="rounded  truncate font-bold  text-sm md:text-base">
          {product.name}
        </span>
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

export default SearchResult;
