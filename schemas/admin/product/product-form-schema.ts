import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, "Price must be positive"),
  discount_percent: z.coerce.number().min(0).max(100).optional(),
  //   images: z.union([
  //     z.array(z.instanceof(File)).min(1, "At least one image is required"),
  //     z
  //       .array(z.object({ url: z.string().url(), display_order: z.number() }))
  //       .min(1, "At least one image is required"),
  //   ]),
  variants: z
    .array(
      z.object({
        id: z.string(), // color id
        color: z.object({
          id: z.string(),
          name: z.string(),
          hex: z.string(),
        }),
        sizes: z.array(
          z.object({
            id: z.string(), // size_id
            label: z.string(), // size label
            sort_order: z.number(),
            stock: z.number().min(0),
          })
        ),
      })
    )
    .min(1, "At least one variant is required"),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
