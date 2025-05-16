import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutProducts from "@/components/checkout/CheckoutProducts";
import Image from "next/image";
import React from "react";

const CheckoutPage = () => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 w-full min-h-screen py-4">
      <div className="order-1 md:order-1 md:hidden relative size-20 self-center ">
        <Image
          fill
          src="/logo.png"
          alt="Brand Logo"
          className="object-contain"
          priority
        />
      </div>

      <div className="order-3 md:order-1 overflow-y-auto max-h-screen md:py-8 px-4 flex flex-col">
        <CheckoutForm />
      </div>
      <div className="order-2 md:order-2 bg-[#454545] px-4 w-full">
        <CheckoutProducts />
      </div>
    </div>
  );
};

export default CheckoutPage;
