"use client";
import { ProductImage } from "@/types/product-image";
import dynamic from "next/dynamic";
import React from "react";

const ProductCarousel = dynamic(() => import("./ProductCarousel"), {
  ssr: false,
});

type ProductCarouselWrapperProps = {
  images: ProductImage[];
};

const ProductCarouselWrapper = ({ images }: ProductCarouselWrapperProps) => {
  return <ProductCarousel images={images} />;
};

export default ProductCarouselWrapper;
