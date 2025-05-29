import { supabase } from "@/lib/supabase/client";
import { Order } from "@/types/api/order";

export const getSuccessOrder = async (
  orderRef: string
): Promise<Order | null> => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `*,
            order_items(
                *
            )`
    )
    .eq("order_ref", orderRef)
    .single();

  if (error) {
    console.error("Supabase error:", error.message);
    return null;
  }
  return data as Order;
};
