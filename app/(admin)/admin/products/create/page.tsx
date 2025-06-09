import ProductForm from "@/components/admin/ProductForm";
import { getColors } from "@/lib/api/admin/variants/get-colors";
import { getSizes } from "@/lib/api/admin/variants/get-sizes";
import React from "react";

const CreateProductPage = async () => {
  const [initialColors, initialSizes] = await Promise.all([
    getColors(),
    getSizes(),
  ]);
  return (
    <div className=" max-w-sm md:max-w-2xl w-full container mx-auto flex flex-col py-4 items-center justify-center">
      <ProductForm
        product={null}
        initialColors={initialColors}
        initialSizes={initialSizes}
      />
    </div>
  );
};

export default CreateProductPage;
