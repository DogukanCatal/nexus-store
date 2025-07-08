import { ProductFormData } from "@/schemas/admin/product/product-form-schema";
import { ProductImage } from "./product-image";
import { AdminProduct } from "./admin-product";

export type ProductPayload = {
  data: ProductFormData;
  allImages: ProductImage[];
  product: AdminProduct | null;
};
