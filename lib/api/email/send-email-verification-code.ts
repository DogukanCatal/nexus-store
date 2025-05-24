import { SendCode } from "@/schemas/email/send-code-schema";
import { fetchApi } from "../fect-api";

export const sendEmailVerificationCode = async (data: SendCode) => {
  const response = await fetchApi("/api/email-verification/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};
