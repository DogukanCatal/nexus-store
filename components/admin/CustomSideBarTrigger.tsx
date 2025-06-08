"use client";
import React from "react";
import { useSidebar } from "../ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

const CustomSideBarTrigger = () => {
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();
  if (isMobile) {
    return (
      <button onClick={toggleSidebar} className="flex items-center">
        <Menu className="size-5" />
        <span className="font-semibold">Menu</span>
      </button>
    );
  }
  //   return <SidebarTrigger />;
};

export default CustomSideBarTrigger;
