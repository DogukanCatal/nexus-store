import Image from "next/image";
import Link from "next/link";
import React from "react";
import HomeButton from "../shared/button/HomeButton";
import SignOutButton from "../shared/button/SignOutButton";

const MinimalAdminHeader = () => {
  return (
    <div className=" flex justify-between items-center md:py-4 px-4 md:border-b-2 md:border-[#262626] z-50 bg-[#131313]">
      <div className="w-1/3 ">
        <HomeButton />
      </div>
      <div className="w-1/3 flex items-center justify-center">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="Brand Logo"
            width={50}
            height={50}
            className="object-contain"
            priority
          />
        </Link>
      </div>
      <div className="w-1/3">
        <div className="flex items-center justify-end">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default MinimalAdminHeader;
