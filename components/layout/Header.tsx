import Image from "next/image";
import Link from "next/link";
import React from "react";
import Basket from "../basket/Basket";
import HomeButton from "../shared/button/HomeButton";
import SearchSheet from "../search/SearchSheet";

type HeaderProps = {
  hideIcons?: boolean;
};

const Header = ({ hideIcons = false }: HeaderProps) => {
  return (
    <header className="bg-transparent sticky z-50 top-0 backdrop-blur-md shadow-sm border-b">
      <div className=" container mx-auto px-4 py-4 flex items-center justify-between">
        {/* HomePage Categories vs... */}
        <div className="w-1/3">
          <HomeButton />
        </div>

        {/* Logo */}
        <div className="w-1/3 flex justify-center relative">
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
        <div className="w-1/3 ">
          <div
            className={`flex justify-end items-center gap-4 ${hideIcons && "hidden"}`}
          >
            <SearchSheet />

            <Basket />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
