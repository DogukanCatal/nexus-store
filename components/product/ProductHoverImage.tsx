import Image from "next/image";
import React from "react";

type ProductHoverImageProps = {
  name: string;
  main_img: string | null;
  second_img: string | null;
};

const ProductHoverImage = ({
  name,
  main_img,
  second_img,
}: ProductHoverImageProps) => {
  return (
    <div className="relative block aspect-square group">
      {main_img && (
        <Image
          fill
          src={main_img}
          alt={`${name} hover`}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:opacity-0 transition duration-300"
        />
      )}
      {second_img && (
        <Image
          fill
          src={second_img}
          alt={`${name} hover`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition duration-300"
        />
      )}
    </div>
  );
};

export default ProductHoverImage;
