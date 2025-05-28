"use client";
import { Products } from "@/types/products";
import ProductItem from "./ProductItem";
import { useState } from "react";
import { getAllProducts } from "@/lib/api/product/get-all-products";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

type ProductGridProps = {
  initialProducts: Products[];
};

const ProductGrid = ({ initialProducts }: ProductGridProps) => {
  const [products, setProducts] = useState<Products[]>(initialProducts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const loadMore = async () => {
    setIsLoading(true);
    const pageSize = 24;
    const products = await getAllProducts(page, pageSize);
    if (products) {
      setProducts((prev) => [...prev, ...products]);
      setPage((p) => p + 1);
      if (products.length < pageSize) setHasMore(false);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-10 flex items-center justify-center">
          {!isLoading ? (
            <Button
              variant="link"
              className="cursor-pointer h-5 w-25 "
              onClick={loadMore}
              disabled={isLoading}
            >
              Load More
            </Button>
          ) : (
            <LoaderCircle className="size-5 animate-spin self-center" />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
