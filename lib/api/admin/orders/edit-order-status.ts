import { createClient } from "@/lib/supabase/server";
import { OrderStatus } from "@/types/order/order";

export const editOrderStatus = async (
  orderId: string,
  newStatus: OrderStatus
): Promise<{ success: boolean; message?: string }> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", orderId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
};
