import { Products } from "@/types/products";
import ProductItem from "./ProductItem";

type ProductGridProps = {
  products: Products[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
