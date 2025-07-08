"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight, Send, ShoppingBag, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { Collapsible } from "../ui/collapsible";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { useState } from "react";
import Image from "next/image";
import SignOutButton from "../shared/button/SignOutButton";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="w-full flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Brand Logo"
                width={50}
                height={50}
                className="object-contain"
                priority
              />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="Shop">
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <ShoppingBag />
                    <span>Shop</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Collapsible
                open={isProductsOpen}
                onOpenChange={setIsProductsOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem key="Products">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className="cursor-pointer"
                      isActive={pathname.startsWith("/admin/products")}
                    >
                      <ShoppingBasket />
                      <div className="flex items-center justify-between w-full">
                        <span>Products</span>
                        <ChevronRight
                          className={`transition-transform duration-300 ${isProductsOpen ? "rotate-90" : ""}`}
                          size={18}
                        />
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem key="Products">
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/admin/products"}
                        >
                          <Link href="/admin/products">
                            <span>Products</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem key="Create Product">
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/admin/create"}
                        >
                          <Link href="/admin/create">
                            <span>Create Product</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              <SidebarMenuItem key="Orders">
                <SidebarMenuButton asChild>
                  <Link href="/admin/orders">
                    <Send />
                    <span>Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t flex items-center justify-center">
        <SignOutButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
