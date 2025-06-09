import { z } from "zod";

export const addColorSchema = z.object({
  name: z.string().trim().min(1),
  hex: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex code"),
});

export type ColorData = z.infer<typeof addColorSchema>;
