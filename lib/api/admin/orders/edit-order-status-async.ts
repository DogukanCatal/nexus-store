import { ApiResponse } from "@/types/api/base";
import { OrderStatusPayload } from "@/types/order/order-status-payload";
import { fetchApi } from "../../fect-api";

export const editOrderStatusAsync = async ({
  orderId,
  newStatus,
  customerEmail,
  orderRef,
}: OrderStatusPayload): Promise<ApiResponse<boolean>> => {
  console.log("ORDEREREFFFFFFF", orderRef);
  const response = await fetchApi<boolean>("/api/admin/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId,
      newStatus,
      customerEmail,
      orderRef,
    }),
  });
  return response;
};
