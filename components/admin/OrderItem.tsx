import { dateConverter } from "@/lib/utils/date-converter";
import {
  Order,
  OrderStatus,
  orderStatusColors,
  orderStatusLabels,
} from "@/types/order/order";
import { ChevronRight } from "lucide-react";
import React from "react";

type OrderItemProps = {
  order: Order;
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col">
        <p className="font-semibold">{order.order_ref}</p>
        <p className="text-xs font-semibold text-gray-500">
          <span>Last Update:</span> {dateConverter(order.updated_at)}
        </p>
      </div>
      <div className="flex  items-center justify-center">
        <div
          className={`p-2 border-2  rounded-lg ${orderStatusColors[order.status as OrderStatus]}`}
        >
          <p className={`text-sm font-semibold text-white/75`}>
            {orderStatusLabels[order.status]}
          </p>
        </div>
        <ChevronRight />
      </div>
    </div>
  );
};

export default OrderItem;
