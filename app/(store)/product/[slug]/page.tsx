import ProductCarouselWrapper from "@/components/product/ProductCarouselWrapper";
import ProductDescription from "@/components/product/ProductDescription";
import ProductOptionsWrapper from "@/components/product/ProductOptionsWrapper";
import ProductPrice from "@/components/product/ProductPrice";
import { getProductDetailBySlug } from "@/lib/api/product/get-product-detail-by-slug";
// import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export type ParamsType = Promise<{ slug: string }>;

// ✅ Metadata Fonksiyonu
// export async function generateMetadata(props: {
//   params: ParamsType;
// }): Promise<Metadata> {
//   const { slug } = await props.params;

//   const product = await getProductDetailBySlug(slug);

//   if (!product) {
//     return {
//       title: "Product not found",
//       description: "The product you are looking for does not exist.",
//       robots: { index: false, follow: false },
//     };
//   }

//   const imageUrl = product.product_images[0]?.url || "/default-image.png";
//   const description =
//     product.description?.slice(0, 160) || "Explore product details and prices.";

//   return {
//     title: product.name,
//     description,
//     keywords: [product.name, "buy", "ecommerce", "online shopping", "product"],
//     openGraph: {
//       title: product.name,
//       description,
//       images: [{ url: imageUrl, alt: product.name }],
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: product.name,
//       description,
//       images: [imageUrl],
//     },
//     robots: { index: true, follow: true },
//     alternates: {
//       canonical: `/product/${slug}`,
//     },
//   };
// }

const ProductDetailPage = async (props: { params: ParamsType }) => {
  const { slug } = await props.params;
  const product = await getProductDetailBySlug(slug);

  // todo style here if product not found
  if (!product) {
    return <p>Product not found</p>;
  }
  const isDiscounted: boolean =
    product.discount_percent !== null && product.discount_percent > 0;

  const orderedImages = product.product_images.sort(
    (a, b) => a.display_order - b.display_order
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-4 min-h-screen">
      <div>
        {/* SEO Fallback */}
        <noscript>
          <div className="rounded-lg overflow-hidden aspect-square relative mb-4">
            <Image
              src={product.product_images[0].url}
              alt="Product thumbnail"
              priority
              className="object-cover"
            />
          </div>
        </noscript>
        {/* Actual Carousel */}
        {orderedImages && <ProductCarouselWrapper images={orderedImages} />}
      </div>

      <div className="flex flex-col gap-6">
        {/* Title */}
        <h1 className="font-bold text-2xl md:text-3xl">{product.name}</h1>

        {/* Price */}
        <ProductPrice
          price={product.price}
          discountPercent={product.discount_percent}
          isDiscounted={isDiscounted}
          finalPrice={product.final_price}
          discountSize="medium"
          priceSize="large"
        />

        {/* Description */}
        <ProductDescription description={product.description} />

        {/* Size and Color and Basket Button */}
        <ProductOptionsWrapper product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
