import EditProductForm from "@/components/admin/EditProductForm";
import { getProduct } from "@/lib/api/admin/products/get-product";
import { AdminProduct } from "@/types/admin-product";
import React from "react";

type AdminProductEditPageProps = {
  params: Promise<{ slug: string }>;
};

const AdminProductEditPage = async ({ params }: AdminProductEditPageProps) => {
  const { slug } = await params;
  const product: AdminProduct | null = await getProduct(slug);

  if (!product) {
    return <p>No Product</p>;
  }

  return (
    <div className=" max-w-sm md:max-w-2xl w-full container mx-auto flex flex-col py-4 items-center justify-center">
      <EditProductForm />
    </div>
  );
};

export default AdminProductEditPage;
