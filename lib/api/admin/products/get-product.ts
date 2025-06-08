import { createClient } from "@/lib/supabase/server";
import { AdminProduct } from "@/types/admin-product";

export const getProduct = async (
  slug: string
): Promise<AdminProduct | null> => {
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
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error while fetching product by slug: ", error.message);
    return null;
  }

  return data as AdminProduct;
};
