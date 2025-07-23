import { createClient } from "@/lib/supabase/client";
import { Products } from "@/types/products";
import { SortOption } from "@/types/sort";

const getAllProductsClient = async (
  sort?: string,
  page = 0,
  pageSize = 24
): Promise<Products[]> => {
  let queryBuilder = createClient()
    .from("products_with_images")
    .select("*")
    .eq("is_active", true)
    .order("updated_at", { ascending: false });

  if (sort?.trim()) {
    switch (sort) {
      case SortOption.None:
        queryBuilder = queryBuilder.order("name", { ascending: true });
        break;
      case SortOption.PriceAscending:
        queryBuilder = queryBuilder.order("final_price", { ascending: true });
        break;
      case SortOption.PriceDescending:
        queryBuilder = queryBuilder.order("final_price", {
          ascending: false,
        });
        break;
      default:
        queryBuilder = queryBuilder.order("name", { ascending: true });
    }
  } else {
    queryBuilder = queryBuilder.order("name", { ascending: true });
  }
  queryBuilder = queryBuilder.range(page * pageSize, (page + 1) * pageSize - 1);

  const { data, error } = await queryBuilder;

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }

  return data as Products[];
};

export default getAllProductsClient;
