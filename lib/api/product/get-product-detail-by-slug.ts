import { Product } from "@/types/product";
import { supabase } from "../../supabase/client";

export const getProductDetailBySlug = async (
  slug: string
): Promise<Product | null> => {
  const { data: product, error } = await supabase
    .from("products")
    .select(
      `*,
    product_images(id,url,display_order),
    product_colors(id,color:color_id (*)),
    product_sizes(id,size:size_id (*)),
    product_stock(*)
    `
    )
    .eq("slug", slug)
    .single();

  // .order("display_order", {
  //   referencedTable: "product_images",
  //   ascending: true,
  // })

  if (error || !product) {
    console.log("Product Detail error:", error);
    return null;
  }

  const finalPrice = product.discount_price ?? product.price;

  return {
    ...product,
    final_price: finalPrice,
  } as Product;
};
