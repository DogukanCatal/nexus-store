import React from "react";
import ProductGrid from "@/components/product/ProductGrid";
import SearchPageInput from "@/components/search/SearchPageInput";
import getAllProductsServer from "@/lib/api/product/get-all-products-server";
import searchProducts from "@/lib/api/product/search-products";

type ProductsGridServerWrapperProps = {
  query?: string;
  sort?: string;
  search?: boolean;
};

const ProductsGridServerWrapper = async ({
  query = "",
  sort = "",
  search = false,
}: ProductsGridServerWrapperProps) => {
  const products = search
    ? await searchProducts(query, sort, true)
    : await getAllProductsServer(sort);

  const isEmpty = !products || products.length === 0;
  if (isEmpty && search) {
    return (
      <section className="py-4 min-h-screen flex flex-col items-center justify-start gap-6">
        <div className="mt-10 gap-6">
          <h1 className="text-4xl font-semibold">
            Results for &quot;{query}&quot;
          </h1>
        </div>
        <SearchPageInput />
        <p className="text-center min-h-screen text-gray-500 mt-8">
          Urun bulunamadi.
        </p>
      </section>
    );
  } else if (isEmpty && !search) {
    return (
      <p className="text-center min-h-screen text-gray-500 mt-8">
        Urun bulunamadi.
      </p>
    );
  }

  return (
    <ProductGrid
      initialProducts={products}
      sort={sort}
      query={query}
      search={search}
    />
  );
};

export default ProductsGridServerWrapper;
