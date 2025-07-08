import { ProductFormData } from "@/schemas/admin/product/product-form-schema";
import { ApiResponse } from "@/types/api/base";
import { ProductImage } from "@/types/product-image";
import { fetchApi } from "../../fect-api";
import { AdminProduct } from "@/types/admin-product";
import { createClient } from "@/lib/supabase/client";

export const submitProductAsync = async (
  data: ProductFormData,
  newFiles: File[],
  deletedImages: ProductImage[],
  product: AdminProduct | null
): Promise<ApiResponse<boolean>> => {
  console.log("hereeeeeee", newFiles);
  const supabase = createClient();

  // Step 1: Upload new files
  const uploadedImageUrls: { url: string; display_order: number }[] = [];
  console.log("filessss", newFiles);
  for (let i = 0; i < newFiles.length; i++) {
    const file = newFiles[i];

    console.log("fileeeee", file);
    const filePath = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);
    if (error) {
      return { success: false, error: "Error uploading photo" };
    }

    const publicUrl = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath).data.publicUrl;

    uploadedImageUrls.push({ url: publicUrl, display_order: i });
  }

  // Step 2: Remove deleted images from storage
  for (const img of deletedImages) {
    const path = img.url.split("/product-images//")[1];

    if (path) {
      const { error } = await supabase.storage
        .from("product-images")
        .remove([path]);
      if (error) {
        return { success: false, error: "Error removing photo" };
      }
    }
  }

  // Step 3: Prepare final image array
  const allImages = [
    ...(product?.product_images || [])
      .filter((img) => !deletedImages.some((d) => d.url === img.url))
      .map((img, index) => ({
        url: img.url,
        display_order: index,
      })),
    ...uploadedImageUrls,
  ];

  const response = await fetchApi<boolean>("/api/admin/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
      allImages,
      deletedImages,
      product,
    }),
  });
  return response;
};
