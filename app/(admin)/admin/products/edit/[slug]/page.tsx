import ProductForm from "@/components/admin/ProductForm";
import { getProduct } from "@/lib/api/admin/products/get-product";
import { getColors } from "@/lib/api/admin/variants/get-colors";
import { getSizes } from "@/lib/api/admin/variants/get-sizes";
import React from "react";

type AdminProductEditPageProps = {
  params: Promise<{ slug: string }>;
};

const AdminProductEditPage = async ({ params }: AdminProductEditPageProps) => {
  const { slug } = await params;
  const [product, initialColors, initialSizes] = await Promise.all([
    getProduct(slug),
    getColors(),
    getSizes(),
  ]);

  if (!product) {
    return <p>No Product</p>;
  }

  return (
    <div className=" max-w-sm md:max-w-2xl w-full container mx-auto flex flex-col py-4 items-center justify-center">
      <ProductForm
        product={product ?? null}
        initialColors={initialColors}
        initialSizes={initialSizes}
      />
    </div>
  );
};

export default AdminProductEditPage;
