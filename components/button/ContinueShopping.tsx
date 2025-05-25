"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

type ContinueShoppingProps = {
  onClose?: () => void;
};

const ContinueShopping = ({ onClose }: ContinueShoppingProps) => {
  const router = useRouter();
  return (
    <Button
      className="text-sm md:text-base py-6 md:py-8 font-semibold cursor-pointer"
      onClick={() => {
        router.replace("/");
        onClose?.();
      }}
    >
      Continue Shopping
    </Button>
  );
};

export default ContinueShopping;
