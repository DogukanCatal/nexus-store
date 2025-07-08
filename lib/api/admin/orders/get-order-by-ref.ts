import { createClient } from "@/lib/supabase/server";
import { Order } from "@/types/order/order";

export const getOrderByRef = async (
  order_ref: string
): Promise<Order | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `*,
        order_items(*),
        order_addresses(*)`
    )
    .eq("order_ref", order_ref)
    .single();

  if (error) {
    console.log("Error fetching Order Item: ", error.message);
    return null;
  }
  console.log(data);
  return data as Order;
};
