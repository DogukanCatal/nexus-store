"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { CheckoutFormData, checkoutSchema } from "@/schemas/checkout-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useBasketStore } from "@/store/basket-store";
import { useShallow } from "zustand/shallow";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { CheckoutResponse } from "@/types/api/checkout-response";
import { fetchApi } from "@/lib/api/fect-api";
import { sendEmailVerificationCode } from "@/lib/api/send-email-verification-code";
import { SendCode } from "@/schemas/email/send-code-schema";
import VerificationDialog from "../email/VerificationDialog";
import { getRecaptchaToken } from "@/lib/recaptcha/get-recaptcha-token";
import { LoaderCircle } from "lucide-react";

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const { items } = useBasketStore(
    useShallow((state) => ({
      items: state.items,
      totalQuantity: state.totalQuantity,
      totalPrice: state.totalPrice,
    }))
  );

  const isLoggedIn = false;
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [submitData, setSubmitData] = useState<CheckoutFormData>();
  const router = useRouter();
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);

  const onSubmit = async (formData: CheckoutFormData) => {
    try {
      setIsPlacingOrder(true);

      if (!isLoggedIn) {
        const token = await getRecaptchaToken("verify_email");
        setSubmitData(formData);

        const data: SendCode = {
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          recaptchaToken: token,
        };
        const response = await sendEmailVerificationCode(data);

        if (!response.success) {
          console.error("Send Code Error:", response.error);
          return alert("Send Code Error:" + response.error);
        }

        setShowDialog(true);
        setIsPlacingOrder(false);
        return;
      }
      await submitCheckout(formData);
    } catch (err) {
      console.error("onSubmit error", err);
      alert("An unexpected error occurred.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const submitCheckout = async (formData: CheckoutFormData) => {
    try {
      setIsPlacingOrder(true);
      const token = await getRecaptchaToken("checkout");
      const response = await fetchApi<CheckoutResponse>("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          items,
          recaptchaToken: token,
        }),
      });

      if (!response.success) {
        console.error("Checkout error:", response.error);
        return alert("Checkout failed: " + response.error);
      }
      alert("Order placed! Order ID: " + response.data);
    } catch (err) {
      console.log("Unexpected error: ", err);
      alert("Something went wrong.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      {showDialog && submitData && (
        <VerificationDialog
          email={submitData.email}
          showDialog
          onVerified={async () => {
            setShowDialog(false);
            await submitCheckout(submitData);
          }}
          onClose={() => setShowDialog(false)}
        />
      )}

      <div className="order-2 flex-1 px-4 flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="flex flex-col">
            <span className="font-bold text-xs md:text-base mb-2">
              * Verification code will be sent to your email address.
            </span>
            <Input
              {...register("email")}
              placeholder="Email"
              type="text"
              className={`font-semibold text-xs md:text-sm py-4 md:py-6 ${
                errors.email ? "border-[#EA4A78]" : ""
              }`}
            />
            {errors.email && (
              <span className="text-[#EA4A78] font-semibold text-xs md:tex-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col flex-1">
              <Input
                {...register("name")}
                placeholder="First Name"
                type="text"
                className={` font-semibold text-xs md:text-sm py-4 md:py-6 ${
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
                className={` font-semibold text-xs md:text-sm py-4 md:py-6 ${
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
              {...register("city")}
              placeholder="City"
              type="text"
              className={`font-semibold text-xs md:text-sm py-4 md:py-6 ${
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
              className={`font-semibold text-xs md:text-sm py-4 md:py-6 ${
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
              className={`font-semibold text-xs md:text-sm py-4 md:py-6 ${
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
            className="w-full font-bold text-sm md:text-base py-6 md:py-8 cursor-pointer border-2 hover:bg-[#131313] hover:border-2 hover:border-white hover:text-white transition duration-300"
            type="submit"
            disabled={isPlacingOrder}
          >
            {isPlacingOrder ? (
              <span>
                <LoaderCircle className="size-5 animate-spin" /> ...
              </span>
            ) : (
              <span>Place Order</span>
            )}
          </Button>
          <Button
            className="w-full font-bold text-sm md:text-base py-6 md:py-8 cursor-pointer"
            type="button"
            onClick={() => router.replace("/")}
          >
            Continue Shopping
          </Button>
          <div className="flex items-center justify-center w-full">
            <p className="text-xs text-muted-foreground text-center mt-2">
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                className="underline"
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                className="underline"
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutForm;
