import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutProducts from "@/components/checkout/CheckoutProducts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CheckoutPage = () => {
  return (
    <div className="flex flex-col relative min-h-screen">
      <div className="hidden md:block absolute top-21 right-0 w-1/2 h-full bg-[#454545] -z-10" />

      <div className=" flex relative justify-center items-center w-full md:py-4 md:border-b-2 md:border-[#454545]">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="Brand Logo"
            width={50}
            height={50}
            className="object-contain"
            priority
          />
        </Link>
      </div>
      <div className="flex flex-col md:flex-row min-h-screen container mx-auto">
        <CheckoutForm />
        <CheckoutProducts />
      </div>
    </div>
  );
};

export default CheckoutPage;
