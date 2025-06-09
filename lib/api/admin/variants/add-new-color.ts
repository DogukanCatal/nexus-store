import { Color } from "@/types/product-color";
import { createClient } from "@/lib/supabase/server";

export const addNewColor = async (
  colorName: string,
  colorHex: string
): Promise<Color | null> => {
  const supabase = await createClient();
  console.log(colorName, colorHex);
  const { data, error } = await supabase
    .from("colors")
    .insert([{ name: colorName, hex: colorHex }])
    .select();

  if (error) {
    console.error("Error inserting new color: ", error.message);
    return null;
  }

  return data?.[0] as Color;
};
