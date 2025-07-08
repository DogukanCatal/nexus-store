import { createClient } from "@/lib/supabase/server";
import { Order } from "@/types/order/order";

export const getAllOrders = async (): Promise<Order[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error while fetching orders: ", error.message);
    return [];
  }
  return data as Order[];
};
