import { z } from "zod";

export const sendCodeSchema = z.object({
  name: z.string().trim().min(1),
  surname: z.string().trim().min(1),
  email: z.string().trim().toLowerCase().min(1),
  recaptchaToken: z.string().min(1),
});

export type SendCode = z.infer<typeof sendCodeSchema>;
