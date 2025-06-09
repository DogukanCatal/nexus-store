"use server";
import { addColorSchema } from "@/schemas/admin/colors/add-color-schema";
import { createClient } from "@/lib/supabase/server"; // örnek
import { Color } from "@/types/product-color";
import { addNewColor } from "@/lib/api/admin/variants/add-new-color";

type AddColorActionResponse =
  | { success: true; data: Color }
  | {
      success: false;
      fieldErrors?: { name?: string; hex?: string };
      error?: string;
    };

export const addColorAction = async (formData: {
  name: string;
  hex: string;
}): Promise<AddColorActionResponse> => {
  const validation = addColorSchema.safeParse(formData);

  if (!validation.success) {
    const formatted = validation.error.format();
    return {
      success: false,
      fieldErrors: {
        name: formatted.name?._errors?.[0],
        hex: formatted.hex?._errors?.[0],
      },
    };
  }

  const newColor = await addNewColor(formData.name, formData.hex);

  if (!newColor) {
    return { success: false, error: "error while inserting color." };
  }

  return { success: true, data: newColor as Color };
};
