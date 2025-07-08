import OrderItem from "@/components/admin/OrderItem";
import { getAllOrders } from "@/lib/api/admin/orders/get-all-orders";
import Link from "next/link";
import React from "react";

const AdminOrdersPage = async () => {
  const orders = await getAllOrders();
  if (!orders || orders.length === 0) {
    return <p>Orders not found</p>;
  }
  return (
    <div className=" flex flex-col space-y-6">
      {orders.map((order) => (
        <Link
          href={`/admin/orders/${order.order_ref}`}
          key={order.order_ref}
          className="border p-6 rounded-lg w-full flex items-center justify-between transition duration-300  hover:border-white "
        >
          <OrderItem order={order} />
        </Link>
      ))}
    </div>
  );
};

export default AdminOrdersPage;
