import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import CustomSideBarTrigger from "@/components/admin/CustomSideBarTrigger";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Nexus",
  description: "Nexus Store",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="en"
      className="h-full overflow-x-hidden"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark bg-[#131313] h-full w-full flex flex-col`}
      >
        <SidebarProvider>
          <AdminSidebar />
          <main className="min-h-0 flex-1 p-4 ">
            <CustomSideBarTrigger />
            {children}
          </main>
        </SidebarProvider>
        {/* <MinimalAdminHeader /> */}
      </body>
    </html>
  );
};
export default layout;
