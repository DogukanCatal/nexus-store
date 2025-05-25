export type Products = {
  id: string;
  name: string;
  price: number;
  discount_price: number | null;
  discount_percent: number | null;
  slug: string;
  main_image_url: string | null;
  second_image_url: string | null;
  total_stock: number;
  final_price: number;
  is_discounted: boolean;
  is_active: boolean;
  in_stock: boolean;
};
