import { z } from "zod";

export const sendCodeSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().min(1),
  recaptchaToken: z.string().min(1),
});

export type SendCode = z.infer<typeof sendCodeSchema>;
