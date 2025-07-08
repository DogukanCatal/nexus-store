import { OrderStatus } from "./order";

export type OrderStatusPayload = {
  orderId: string;
  newStatus: OrderStatus;
  customerEmail: string;
  orderRef: string;
};
