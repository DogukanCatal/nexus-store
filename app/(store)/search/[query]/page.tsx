import ProductGrid from "@/components/product/ProductGrid";
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
      <p className="text-center min-h-screen text-gray-500 mt-8">
        Urun bulunamadi.
      </p>
    );
  }

  return (
    <section className="py-4 min-h-screen flex flex-col items-center justify-center">
      <div className="my-10 gap-6">
        <h1 className="text-4xl font-semibold">
          Results for &quot;{query}&quot;
        </h1>
      </div>
      <ProductGrid initialProducts={products} query={query} search={true} />
    </section>
  );
};

export default SearchPage;
