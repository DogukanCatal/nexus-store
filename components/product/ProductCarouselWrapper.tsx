"use client";
import { ProductImage } from "@/types/productImages";
import React from "react";
import dynamic from "next/dynamic";

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
