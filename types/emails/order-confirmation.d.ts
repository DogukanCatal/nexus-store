export type OrderConfirmationProps = {
  name: string;
  order_ref: string;
  items: {
    product_id: string;
    product_name: string;
    product_image: string;
    total_price: number;
    unit_price: number;
    quantity: number;
    color_hex: string;
  }[];
  total_quantity: number;
  total_price: number;
};
