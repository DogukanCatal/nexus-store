"use client";
import { Products } from "@/types/products";
import ProductItem from "./ProductItem";
import { useEffect, useRef } from "react";
import { LoaderCircle } from "lucide-react";
import { useProductLoader } from "@/hooks/useProductLoader";
import { AnimatePresence } from "framer-motion";

type ProductGridProps = {
  initialProducts: Products[];
  query?: string;
  search?: boolean;
};

const ProductGrid = ({
  initialProducts,
  query = "",
  search = false,
}: ProductGridProps) => {
  const { loadMore, isLoading, hasMore, products } = useProductLoader({
    initialProducts,
    query,
    search,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "10px",
        threshold: 1,
      }
    );

    const target = observerRef.current;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [loadMore, hasMore, isLoading]);
  console.log(initialProducts);
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <AnimatePresence>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </div>

      <div
        ref={observerRef}
        className="text-center mt-10 flex items-center justify-center"
      >
        {isLoading && <LoaderCircle className="size-5 animate-spin" />}
      </div>
    </div>
  );
};

export default ProductGrid;
