import Image from "next/image";
import Link from "next/link";
import React from "react";

const MinimalHeader = () => {
  return (
    <div className=" flex relative justify-center items-center w-full md:py-4 md:border-b-2 md:border-[#454545] z-50 bg-[#131313]">
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
  );
};

export default MinimalHeader;
