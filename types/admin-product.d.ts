import { ProductColor } from "./product-color";
import { ProductImage } from "./product-image";
import { ProductSize } from "./product-size";
import { ProductStock } from "./product-stock";

export type AdminProduct = {
  created_at: string;
  description: string;
  discount_percent: number | null;
  discount_price: number | null;
  price: number;
  id: string;
  is_active: boolean;
  name: string;
  product_colors: ProductColor[];
  product_images: ProductImage[];
  product_sizes: ProductSize[];
  product_stock: ProductStock[];
  slug: string;
  updated_at: string;
};
