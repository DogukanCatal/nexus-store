import AdminProductItem from "@/components/admin/AdminProductItem";
import { Button } from "@/components/ui/button";
import { getAllProductsAdmin } from "@/lib/api/admin/products/get-all-products";
import { AdminProduct } from "@/types/admin-product";
import Link from "next/link";
import React from "react";

const AdminProductsPage = async () => {
  const products: AdminProduct[] = await getAllProductsAdmin();

  if (!products || products.length === 0) {
    return <p>Product not found</p>;
  }

  return (
    <div className="w-full flex-col flex items-center justify-center space-y-6 ">
      <Link href={"/admin/products/create"}>
        <Button className="font-semibold cursor-pointer float-right">
          Create
        </Button>
      </Link>
      {products.map((product) => (
        <Link
          href={`/admin/products/edit/${product.slug}`}
          key={product.id}
          className="border p-6 rounded-lg w-full flex items-center justify-between transition duration-300  hover:border-white"
        >
          <AdminProductItem product={product} />
        </Link>
      ))}
    </div>
  );
};

export default AdminProductsPage;
