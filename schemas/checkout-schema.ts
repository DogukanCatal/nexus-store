import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  surname: z.string().trim().min(1, "Surname is required"),
  email: z.string().trim().toLowerCase().email("Invalid email"),
  phone: z.string().trim().min(1, "Phone is required"),
  address: z.string().trim().min(1, "Address is required"),
  city: z.string().trim().min(1, "City is required"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
