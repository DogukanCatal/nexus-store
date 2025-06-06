import { SortOption } from "@/types/sort";
import { supabase } from "../../supabase/client";
import type { Products } from "@/types/products";
import { unstable_cache } from "next/cache";

const getAllProductsServer = unstable_cache(
  async (sort?: string, page = 0, pageSize = 24): Promise<Products[]> => {
    console.log("CACHE DENIYORUMMMMMMMMMMMMMMM");
    let queryBuilder = supabase
      .from("products_with_images")
      .select("*")
      .eq("is_active", true);

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
    queryBuilder = queryBuilder.range(
      page * pageSize,
      (page + 1) * pageSize - 1
    );

    const { data, error } = await queryBuilder;

    if (error) {
      console.error("Supabase error:", error.message);
      return [];
    }

    return data as Products[];
  },
  ["products"],
  {
    tags: ["products"],
    revalidate: 60,
  }
);

export default getAllProductsServer;
