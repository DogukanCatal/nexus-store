import { OrderAddress } from "./order-address";
import { OrderItem } from "./order-item";

export type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  payment_method: string;
  total_price: number;
  created_at: string;
  updated_at: string;
  user_id: string | null;
  status: OrderStatus;
  customer_surname: string;
  order_ref: string;
  order_items: OrderItem[];
  order_addresses: OrderAddress[];
};

export enum OrderStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

export const orderStatusColors: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: "border-yellow-300 bg-yellow-500/50",
  [OrderStatus.Confirmed]: "border-blue-300 bg-blue-500/50",
  [OrderStatus.Shipped]: "border-purple-300 bg-purple-500/50",
  [OrderStatus.Delivered]: "border-green-300 bg-green-500/50",
  [OrderStatus.Cancelled]: "border-red-300 bg-red-500/50",
};

export const orderStatusLabels: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: "Pending",
  [OrderStatus.Confirmed]: "Confirmed",
  [OrderStatus.Shipped]: "Shipped",
  [OrderStatus.Delivered]: "Delivered",
  [OrderStatus.Cancelled]: "Cancelled",
};
