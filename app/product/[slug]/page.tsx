import ProductCarouselWrapper from "@/components/product/ProductCarouselWrapper";
import ProductOptionsWrapper from "@/components/product/ProductOptionsWrapper";
import ProductPrice from "@/components/product/ProductPrice";
import { getProductDetailBySlug } from "@/lib/api/get-product-detail-by-slug";
import React from "react";

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductDetailBySlug(slug);

  // todo style here if product not found
  if (!product) {
    return <p>Product not found</p>;
  }

  const isDiscounted: boolean =
    product.discount_percent !== null && product.discount_percent > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-4 sm:p-8 md:p-14 mx-auto w-full">
      <div>
        {product.product_images && (
          <ProductCarouselWrapper images={product?.product_images} />
        )}
      </div>
      <div className="flex flex-col gap-6">
        {/* Title */}
        <span className="font-bold text-2xl md:text-3xl">{product.name}</span>

        {/* Size and Color and Basket Button */}
        <ProductOptionsWrapper product={product} />

        {/* Description */}

        {/* Price */}
        <ProductPrice
          price={product.price}
          discountPercent={product.discount_percent}
          isDiscounted={isDiscounted}
          finalPrice={product.final_price}
          discountSize="medium"
          priceSize="large"
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
