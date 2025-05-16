import Image from "next/image";
import React from "react";
import InstagramIcon from "@/svg/InstagramIcon";
import Link from "next/link";

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <div className="bg-[#454545] mt-10 p-4 sm:p-8 md:px-14 flex items-center justify-between border-t-2">
      <div className="relative size-10 md:size-20 ">
        <Image
          fill
          src="/logo.png"
          alt="Brand Logo"
          className="object-contain"
          priority
        />
      </div>
      <div>
        <span className="font-semibold text-xs">
          @{currentYear} All Rights Reserved
        </span>
      </div>
      <Link href={`https://www.instagram.com/nexus_cy?igsh=cHlnam1wZmxwc3hn`}>
        <InstagramIcon className="size-5 fill-white" />
      </Link>
    </div>
  );
};

export default Footer;
