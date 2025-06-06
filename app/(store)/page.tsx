import ProductsGridLoader from "@/components/shared/loading/ProductsGridLoader";
import ProductsGridServerWrapper from "@/components/shared/server/ProductsGridServerWrapper";
import Sort from "@/components/shared/sort/Sort";
import { loadSearchParams } from "@/lib/nuqs/searchParams";
import { revalidateTag } from "next/cache";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const { sort } = await loadSearchParams(searchParams);
  const suspenseKey = `sort=${sort}`;

  async function refetchProducts() {
    "use server";
    revalidateTag("products");
  }

  return (
    <section className="py-4 min-h-screen space-y-6">
      <Sort refetchProducts={refetchProducts} />
      <Suspense key={suspenseKey} fallback={<ProductsGridLoader />}>
        <ProductsGridServerWrapper sort={sort} />
      </Suspense>
    </section>
  );
}
