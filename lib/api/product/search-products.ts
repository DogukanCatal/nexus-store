import { supabase } from "../../supabase/client";
import type { Products } from "@/types/products";

const searchProducts = async (
  query: string,
  fetchAll = false,
  page = 0,
  pageSize = 24
): Promise<Products[]> => {
  if (!query) return [];

  let queryBuilder = supabase
    .from("products_with_images")
    .select("*")
    .eq("is_active", true)
    .ilike("name", `%${query}%`);

  if (!fetchAll) {
    queryBuilder = queryBuilder.order("name", { ascending: true }).limit(10);
  } else {
    queryBuilder = queryBuilder.range(
      page * pageSize,
      (page + 1) * pageSize - 1
    );
  }

  const { data, error } = await queryBuilder;

  if (error) {
    console.log("Search error:", error.message);
    return [];
  }

  return data as Products[];
};

export default searchProducts;
