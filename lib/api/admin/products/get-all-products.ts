import { createClient } from "@/lib/supabase/server";
import { AdminProduct } from "@/types/admin-product";

export const getAllProductsAdmin = async (): Promise<AdminProduct[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `*,
        product_colors(
        id,
        colors(*)
        ),
        product_sizes(id,
        sizes(*)
        ),
        product_images(*),
        product_stock(*)`
    )
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error while fetching products: ", error.message);
    return [];
  }

  return (data as AdminProduct[]) || [];
};
