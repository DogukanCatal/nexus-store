import OrderDetail from "@/components/admin/OrderDetail";
import { getOrderByRef } from "@/lib/api/admin/orders/get-order-by-ref";
import React from "react";

type OrderDetailPageProps = Promise<{
  order_ref: string;
}>;

const OrderDetailPage = async (props: { params: OrderDetailPageProps }) => {
  const { order_ref } = await props.params;
  const order = await getOrderByRef(order_ref);
  if (!order || order === null) {
    return <p>Order Detail not found.</p>;
  }

  return <OrderDetail order={order} />;
};

export default OrderDetailPage;
