import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
