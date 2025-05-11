import { supabase } from "../supabase";
import { Products } from "@/types/products";

export const getAllProducts = async (): Promise<Products[]> => {
  const { data, error } = await supabase
    .from("products_with_images")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    console.log("Supabase error:", error.message);
    return [];
  }

  return data as Products[];
};
