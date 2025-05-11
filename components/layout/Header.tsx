import { ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchInput from "../search/SearchInput";

const Header = () => {
  return (
    <header className="bg-transparent sticky z-50 top-0 backdrop-blur-md shadow-sm border-b ">
      <div className="max-w-screen-2xl w-full mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* HomePage Categories vs... */}
        <div className="w-1/3" />

        {/* Logo */}
        <div className="w-1/3 flex justify-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Nexus Store Logo"
              width={50}
              height={50}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Search Login Basket */}
        <div className="w-1/3 flex justify-end items-center gap-4">
          <SearchInput />

          <ShoppingBasketIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
