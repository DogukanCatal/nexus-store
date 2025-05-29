import { CheckoutFormData } from "@/schemas/checkout-schema";
import { fetchApi } from "../fect-api";
import { BasketItem } from "@/store/basket-store";
import type { ApiResponse } from "@/types/api/base";

export const submitCheckoutAsync = async (
  formData: CheckoutFormData,
  items: BasketItem[],
  token: string
): Promise<ApiResponse<string>> => {
  const response = await fetchApi<string>("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
      items,
      recaptchaToken: token,
    }),
  });
  return response;
};
