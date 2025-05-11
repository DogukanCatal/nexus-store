import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/api/get-all-products";

export default async function Home() {
  const products = await getAllProducts();

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500 mt-8">Urun bulunamadi.</p>;
  }

  return (
    <div className="p-4 sm:p-8 md:p-14 mx-auto ">
      <section>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
