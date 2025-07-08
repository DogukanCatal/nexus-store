import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import { Toaster } from "sonner";
import Footer from "@/components/layout/Footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark bg-[#131313] `}
      >
        <NuqsAdapter>
          <Header />
          <main className="mx-auto container px-4">{children}</main>
          <Toaster style={{ zIndex: 99999 }} />
          <Footer />
        </NuqsAdapter>
      </body>
    </html>
  );
}
