import { z } from "zod";

export const verifyCodeSchema = z.object({
  code: z.string().min(6, "Should be exactly 6 digits"),
  email: z.string().min(1),
});

export const codeOnlySchema = verifyCodeSchema.pick({ code: true });

export type VerifyCode = z.infer<typeof verifyCodeSchema>;
export type CodeOnly = z.infer<typeof codeOnlySchema>;
