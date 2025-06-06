import SearchPageInput from "@/components/search/SearchPageInput";
import ProductsGridLoader from "@/components/shared/loading/ProductsGridLoader";
import ProductsGridServerWrapper from "@/components/shared/server/ProductsGridServerWrapper";
import Sort from "@/components/shared/sort/Sort";
import { loadSearchParams } from "@/lib/nuqs/searchParams";
import { SearchParams } from "nuqs";
import React, { Suspense } from "react";

const SearchPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ query: string }>;
  searchParams: Promise<SearchParams>;
}) => {
  const { query } = await params;
  const { sort } = await loadSearchParams(searchParams);

  return (
    <section className="py-4 min-h-screen flex flex-col items-center justify-start space-y-4">
      <div className="mt-5">
        <h1 className="text-4xl font-semibold">
          Results for &quot;{query}&quot;
        </h1>
      </div>
      <SearchPageInput />
      <Sort search={true} />
      <Suspense key={query + sort} fallback={<ProductsGridLoader />}>
        <ProductsGridServerWrapper query={query} sort={sort} search={true} />
      </Suspense>
    </section>
  );
};

export default SearchPage;
