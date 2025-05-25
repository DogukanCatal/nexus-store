import ContinueShopping from "@/components/button/ContinueShopping";
import LottieWrapper from "@/components/lottie/LottieWrapper";
import { getSuccessOrder } from "@/lib/api/checkout/get-success-order";
import type { Order } from "@/types/api/order";
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

  console.log(order.order_items);
  return (
    <div className=" flex flex-col items-center justify-center flex-1">
      <div className="h-[200px] w-[200px] flex items-center justify-center">
        <LottieWrapper
          path="/animations/lottie_success.json"
          style={{ width: 200, height: 200 }}
        />
      </div>
      <div className="text-center mx-auto space-y-4">
        <h1 className="font-bold text-2xl md:text-4xl">Order Confirmed!</h1>
        <div className="text-center">
          <p className="font-semibold text-base md:text-lg text-muted-foreground">
            Thank you for ordering from our store.
          </p>
          <p className="font-semibold text-base md:text-lg text-muted-foreground">
            You will receive a confirmation email shortly.
          </p>
        </div>
        <p className="text-sm text-muted-foreground font-semibold">
          Order No: <span className="font-semibold">{order.order_ref}</span>
        </p>
      </div>
      <div className="mt-4">
        <ContinueShopping />
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
