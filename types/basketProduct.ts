export type BasketProduct = {
  product_id: string;
  name: string;
  slug: string;
  price: number;
  discount_price: number | null;
  discount_percent: number | null;
  final_price: number;
  image: string;
  color_id: string;
  color_name: string | undefined;
  size_id: string;
  size_name: string | undefined;
  stock: number;
};
