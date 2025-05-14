import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/api/get-all-products";

export default async function Home() {
  const products = await getAllProducts();

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500 mt-8">Urun bulunamadi.</p>;
  }

  return (
    <section className="py-4">
      <ProductGrid products={products} />
    </section>
  );
}
