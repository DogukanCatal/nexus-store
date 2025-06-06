import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductsGridLoader = () => {
  return (
    <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className=" w-40 h-50 md:w-50 md:h-70 rounded-lg" />
      ))}
    </div>
  );
};

export default ProductsGridLoader;
