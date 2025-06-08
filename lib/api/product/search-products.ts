import { createClient } from "@/lib/supabase/client";
import { Products } from "@/types/products";
import { SortOption } from "@/types/sort";

const searchProducts = async (
  query: string,
  sort?: string,
  fetchAll = false,
  page = 0,
  pageSize = 24
): Promise<Products[]> => {
  if (!query) return [];
  let queryBuilder = createClient()
    .from("products_with_images")
    .select("*")
    .eq("is_active", true)
    .ilike("name", `%${query}%`);

  if (!fetchAll) {
    queryBuilder = queryBuilder.order("name", { ascending: true }).limit(10);
  } else {
    if (sort?.trim()) {
      switch (sort) {
        case SortOption.None:
          queryBuilder = queryBuilder.order("name", { ascending: true });
          break;
        case SortOption.PriceAscending:
          queryBuilder = queryBuilder.order("final_price", {
            ascending: true,
          });
          break;
        case SortOption.PriceDescending:
          queryBuilder = queryBuilder.order("final_price", {
            ascending: false,
          });
          break;
        default:
          break;
      }
    } else {
      queryBuilder = queryBuilder.order("name", { ascending: true });
    }
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
