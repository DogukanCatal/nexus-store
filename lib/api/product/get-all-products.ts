import { supabase } from "../../supabase/client";
import type { Products } from "@/types/products";

export const getAllProducts = async (
  page = 0,
  pageSize = 24
): Promise<Products[]> => {
  const { data, error } = await supabase
    .from("products_with_images")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true })
    .range(page * pageSize, (page + 1) * pageSize - 1);

  if (error) {
    console.log("Supabase error:", error.message);
    return [];
  }

  return data as Products[];
};
