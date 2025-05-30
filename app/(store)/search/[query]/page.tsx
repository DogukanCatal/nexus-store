import ProductGrid from "@/components/product/ProductGrid";
import SearchPageInput from "@/components/search/SearchPageInput";
import searchProducts from "@/lib/api/product/search-products";
import React from "react";

const SearchPage = async ({
  params,
}: {
  params: Promise<{ query: string }>;
}) => {
  const { query } = await params;
  const products = await searchProducts(query, true);
  if (!products || products.length === 0) {
    return (
      <section className="py-4 min-h-screen flex flex-col items-center justify-center gap-6">
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
  }

  return (
    <section className="py-4 min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="mt-5 gap-6">
        <h1 className="text-4xl font-semibold">
          Results for &quot;{query}&quot;
        </h1>
      </div>
      <SearchPageInput />
      <ProductGrid initialProducts={products} query={query} search={true} />
    </section>
  );
};

export default SearchPage;
