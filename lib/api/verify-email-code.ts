import { VerifyCode } from "@/schemas/email/verify-code-schema";
import { fetchApi } from "./fect-api";

export const VerifyEmailCode = async (data: VerifyCode) => {
  const response = await fetchApi("/api/email-verification/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
    }),
  });

  return response;
};
