import { VerifyCode } from "@/schemas/email/verify-code-schema";
import { fetchApi } from "./fect-api";

export const verifyEmailCode = async (data: VerifyCode) => {
  console.log(data.code, data.email);
  const response = await fetchApi("/api/email-verification/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};
