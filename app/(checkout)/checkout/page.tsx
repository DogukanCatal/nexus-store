import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutProducts from "@/components/checkout/CheckoutProducts";
import React from "react";

const CheckoutPage = () => {
  return (
    <div className="relative py-4">
      <div className="hidden md:block fixed right-0 top-0 w-1/2  bg-[#262626] h-screen -z-10" />

      <div className="flex flex-col md:flex-row container mx-auto">
        <CheckoutForm />
        <CheckoutProducts />
      </div>
    </div>
  );
};

export default CheckoutPage;
