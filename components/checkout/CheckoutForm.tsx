"use client";
import React from "react";
import { Input } from "../ui/input";
import { CheckoutFormData, checkoutSchema } from "@/schemas/checkoutSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import Image from "next/image";

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data: CheckoutFormData) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col w-full px-4 justify-start h-full mt-5 md:mt-0">
      <div className="hidden md:flex relative size-20 self-center">
        <Image
          fill
          src="/logo.png"
          alt="Brand Logo"
          className="object-contain"
          priority
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col flex-1">
            <Input
              {...register("name")}
              placeholder="First Name"
              type="text"
              className={` font-semibold text-xs md:text-base py-4 md:py-6 ${
                errors.name ? "border-[#EA4A78]" : ""
              }`}
            />
            {errors.name && (
              <span className="text-[#EA4A78] font-semibold text-xs md:tex-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col">
            <Input
              {...register("surname")}
              placeholder="Last Name"
              type="text"
              className={` font-semibold text-xs md:text-base py-4 md:py-6 ${
                errors.surname ? "border-[#EA4A78]" : ""
              }`}
            />
            {errors.surname && (
              <span className="text-[#EA4A78] font-semibold text-xs md:tex-sm">
                {errors.surname.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <Input
            {...register("email")}
            placeholder="Email"
            type="text"
            className={`font-semibold text-xs md:text-base py-4 md:py-6 ${
              errors.email ? "border-[#EA4A78]" : ""
            }`}
          />
          {errors.email && (
            <span className="text-[#EA4A78] font-semibold text-xs md:tex-sm">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <Input
            {...register("city")}
            placeholder="City"
            type="text"
            className={`font-semibold text-xs md:text-base py-4 md:py-6${
              errors.city ? "border-[#EA4A78]" : ""
            }`}
          />
          {errors.city && (
            <span className="text-[#EA4A78] font-semibold text-xs md:tex-sm">
              {errors.city.message}
            </span>
          )}
        </div>

        <div>
          <Input
            {...register("address")}
            placeholder="Address"
            type="text"
            className={`font-semibold text-xs md:text-base py-4 md:py-6${
              errors.address ? "border-[#EA4A78]" : ""
            }`}
          />
          {errors.address && (
            <span className="text-[#EA4A78] font-semibold text-xs md:tex-sm">
              {errors.address.message}
            </span>
          )}
        </div>

        <div>
          <Input
            {...register("phone")}
            placeholder="Phone"
            type="text"
            className={`font-semibold text-xs md:text-base py-4 md:py-6 ${
              errors.phone ? "border-[#EA4A78]" : ""
            }`}
          />
          {errors.phone && (
            <span className="text-[#EA4A78] font-semibold text-xs md:tex-sm">
              {errors.phone.message}
            </span>
          )}
        </div>

        <h2 className="font-bold text-xs md:text-base py-4">
          * Our only payment option is at the door.
        </h2>

        <Button
          className="w-full font-bold text-sm md:text-base py-6 md:py-8 cursor-pointer"
          type="submit"
        >
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
