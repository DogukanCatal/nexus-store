"use client";
import { dateConverter } from "@/lib/utils/date-converter";
import { formatCurrency } from "@/lib/utils/price-utils";
import {
  Order,
  OrderStatus,
  orderStatusColors,
  orderStatusLabels,
} from "@/types/order/order";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import EditOrderStatusDialog from "./EditOrderStatusDialog";

type OrderDetailProps = {
  order: Order;
};

const OrderDetail = ({ order }: OrderDetailProps) => {
  const [showEditOrderStatusDialog, setShowEditOrderStatusDialog] =
    useState<boolean>(false);
  return (
    <>
      <EditOrderStatusDialog
        showEditOrderDialog={showEditOrderStatusDialog}
        onClose={() => setShowEditOrderStatusDialog(false)}
        selectedStatus={order.status as OrderStatus}
        orderId={order.id}
        customerEmail={order.customer_email}
        orderRef={order.order_ref}
      />
      <div className="w-full space-y-4">
        <p className="font-semibold">{order.order_ref}</p>
        <div>
          <p className="text-xs md:text-sm font-semibold">
            Created at: {dateConverter(order.created_at)}
          </p>
          <p className="text-xs md:text-sm font-semibold">
            Updated at: {dateConverter(order.updated_at)}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm font-semibold">
            {order.order_addresses[0]?.full_name}
          </p>
          <p className="text-xs md:text-sm font-semibold">
            {order.customer_email}
          </p>
          <p className="text-xs md:text-sm font-semibold">
            {order.customer_phone}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm font-semibold">
            {order.order_addresses[0]?.city}
          </p>
          <p className="text-xs md:text-sm font-semibold">
            {order.order_addresses[0]?.address_line}
          </p>
        </div>
        <div className="flex gap-4">
          <div
            className={`p-2 border-2 rounded-lg ${orderStatusColors[order.status as OrderStatus]}`}
          >
            <p className={`text-sm font-semibold text-white/75`}>
              {orderStatusLabels[order.status]}
            </p>
          </div>
          <Button
            type="button"
            className="size-10 cursor-pointer"
            variant="outline"
            onClick={() => {
              setShowEditOrderStatusDialog(true);
            }}
          >
            <Pencil />
          </Button>
        </div>
        <div>
          <div>
            <p className="font-semibold ">
              {formatCurrency(order.total_price)}
            </p>
            {order.order_items.map((product, index) => (
              <div key={index} className="flex gap-4 items-center">
                <Image
                  src={product.image_url ?? "/logo.png"}
                  alt="Brand Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                  priority
                />
                <div>
                  <p className="text-xs md:text-sm font-semibold">
                    {product.product_name}
                  </p>
                  <div className="flex gap-2 items-center">
                    <p className="text-xs md:text-sm font-semibold">
                      {product.quantity}
                    </p>
                    <div
                      className="size-5 rounded-full border-white border"
                      style={{ backgroundColor: product.color_hex }}
                    />
                    <p className="text-xs md:text-sm font-semibold">
                      {product.size_label}
                    </p>
                    <p className="text-xs md:text-sm font-semibold">
                      {formatCurrency(product.unit_price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
