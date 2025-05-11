import { supabase } from "../supabase";
import { Products } from "@/types/products";

const searchProducts = async (query: string): Promise<Products[]> => {
  if (!query) return [];

  const { data, error } = await supabase
    .from("products_with_images")
    .select("*")
    .ilike("name", `%${query}%`)
    .limit(10);

  if (error) {
    console.log("Search error:", error.message);
    return [];
  }

  return data as Products[];
};

export default searchProducts;
