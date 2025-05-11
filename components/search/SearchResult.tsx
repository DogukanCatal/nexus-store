import Link from "next/link";
import React from "react";
import ProductHoverImage from "../product/ProductHoverImage";
import ProductPrice from "../product/ProductPrice";
import { Products } from "@/types/products";

type SearchResultProps = {
  product: Products;
};

const SearchResult = ({ product }: SearchResultProps) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      key={product.id}
      className="flex items-center gap-2 w-full mb-4 group"
    >
      <div className="rounded-lg overflow-hidden relative block aspect-square w-24 shrink-0">
        <ProductHoverImage
          name={product.name}
          main_img={product.main_image_url}
          second_img={product.second_image_url}
        />
      </div>
      <div className="flex flex-col gap-2 justify-center min-w-0 ">
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
    </Link>
  );
};

export default SearchResult;
