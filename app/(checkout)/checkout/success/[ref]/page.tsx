import { getSuccessOrder } from "@/lib/api/checkout/get-success-order";
import { Order } from "@/types/api/order";
import React from "react";

type CheckoutSuccessPageProps = Promise<{ ref: string }>;

const CheckoutSuccessPage = async (props: {
  params: CheckoutSuccessPageProps;
}) => {
  const { ref } = await props.params;
  const order: Order | null = await getSuccessOrder(ref);

  if (!order) {
    return;
  }

  console.log(order);
  return <div>CheckoutSuccessPage</div>;
};

export default CheckoutSuccessPage;
