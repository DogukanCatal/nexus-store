import { createClient } from "@/lib/supabase/server";
import { Size } from "@/types/product-size";

export const getSizes = async (): Promise<Size[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("sizes").select("*");

  if (error) {
    console.error("Error fetching sizes: ", error.message);
    return [];
  }

  return data as Size[];
};
