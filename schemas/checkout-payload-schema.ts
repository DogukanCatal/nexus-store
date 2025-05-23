import { z } from "zod";

export const checkoutPayloadSchema = z.object({
  name: z.string().trim().min(1),
  surname: z.string().trim().min(1),
  email: z.string().trim().toLowerCase().email(),
  phone: z.string().trim().min(1),
  address: z.string().trim().min(1),
  city: z.string().trim().min(1),
  recaptchaToken: z.string().min(1),
  items: z
    .array(
      z.object({
        quantity: z.number().int().min(1),
        product: z.object({
          product_id: z.string().uuid(),
          color_id: z.string().uuid(),
          size_id: z.string().uuid(),
        }),
      })
    )
    .min(1),
});

export type CheckoutPayload = z.infer<typeof checkoutPayloadSchema>;
