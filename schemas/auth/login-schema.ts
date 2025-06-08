import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must include at least one special character"
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
