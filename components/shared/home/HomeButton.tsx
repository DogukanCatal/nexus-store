"use client";
import React from "react";
import { House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HomeButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="link"
      className="cursor-pointer hover:no-underline"
      onClick={() => {
        router.replace("/");
      }}
    >
      <span className="text-white font-bold text-sm hidden md:block">Home</span>
      <House className="md:hidden size-5" />
    </Button>
  );
};

export default HomeButton;
