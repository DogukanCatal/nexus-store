import { dateConverter } from "@/lib/utils/date-converter";
import { AdminProduct } from "@/types/admin-product";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

type AdminProductItemProps = {
  product: AdminProduct;
};

const AdminProductItem = ({ product }: AdminProductItemProps) => {
  return (
    <div className="w-full flex items-center justify-between gap-2">
      <div className="w-full flex gap-2">
        <Image
          src={product.product_images[0].url ?? "/logo.png"}
          alt="Brand Logo"
          width={50}
          height={50}
          className="object-contain"
          priority
        />
        <div className="flex flex-col items-start justify-center">
          <p className="font-semibold">{product.name}</p>
          <p className="text-sm font-semibold text-gray-500">
            <span>Last Update:</span> {dateConverter(product.updated_at)}
          </p>
        </div>
      </div>
      <div>
        <ChevronRight />
      </div>
    </div>
  );
};

export default AdminProductItem;
