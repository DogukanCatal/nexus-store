import { createClient } from "@/lib/supabase/server";
import { Color } from "@/types/product-color";

export const getColors = async (): Promise<Color[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("colors").select("*");

  if (error) {
    console.error("Error fetching colors: ", error.message);
    return [];
  }

  return data as Color[];
};
