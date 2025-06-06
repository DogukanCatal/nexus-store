"use client";

import getAllProductsClient from "@/lib/api/product/get-all-products-client";
import searchProducts from "@/lib/api/product/search-products";
import { Products } from "@/types/products";
import { useCallback, useState } from "react";

type useProductLoaderOptions = {
  initialProducts: Products[];
  query?: string;
  search?: boolean;
  sort?: string;
};

export const useProductLoader = ({
  initialProducts,
  query = "",
  search = false,
  sort = "",
}: useProductLoaderOptions) => {
  const pageSize = 24;
  const [products, setProducts] = useState<Products[]>(initialProducts);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(
    initialProducts.length === pageSize
  );

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const products = search
      ? await searchProducts(query, sort, search, page, pageSize)
      : await getAllProductsClient(sort, page, pageSize);

    if (products && products.length > 0) {
      setProducts((prev) => [...prev, ...products]);
      setPage((p) => p + 1);
      if (products.length < pageSize) setHasMore(false);
    } else {
      setHasMore(false);
    }
    setIsLoading(false);
  }, [search, query, isLoading, hasMore, page, pageSize]);

  return {
    products,
    isLoading,
    hasMore,
    loadMore,
  };
};
