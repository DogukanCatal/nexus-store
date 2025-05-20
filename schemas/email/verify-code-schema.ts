import { z } from "zod";

export const verifyCodeSchema = z.object({
  code: z.string().min(6),
  email: z.string().min(1),
});

export type VerifyCode = z.infer<typeof verifyCodeSchema>;
