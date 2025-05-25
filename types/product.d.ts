import type { ProductColor } from "./product-color";
import type { ProductImage } from "./product-image";
import type { ProductSize } from "./product-size";
import type { ProductStock } from "./product-stock";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  slug: string;
  discount_percent: number | null;
  discount_price: number | null;
  is_active: boolean;
  product_colors: ProductColor[] | [];
  product_images: ProductImage[] | [];
  product_sizes: ProductSize[] | [];
  product_stock: ProductStock[] | [];
  final_price: number;
};
