"use client";
import React, { useState } from "react";
import MultiImageUploader from "./MultiImageUploader";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { AdminProduct } from "@/types/admin-product";
import { Color } from "@/types/product-color";
import { Size } from "@/types/product-size";
import { useGroupedStockByColor } from "@/hooks/use-grouped-stock-by-color";
import { GroupedStockByColor } from "@/types/grouped-stock-by-color";
import Variants from "./Variants";
import { Button } from "../ui/button";

type ProductFormProps = {
  product: AdminProduct | null;
  initialColors: Color[];
  initialSizes: Size[];
};

const ProductForm = ({
  product,
  initialColors,
  initialSizes,
}: ProductFormProps) => {
  console.log(product);
  const [variants, setVariants] = useState<GroupedStockByColor[]>(
    useGroupedStockByColor(product)
  );
  const isEdit = !!product;
  console.log(initialSizes, "ilk sizes");
  const handleVariantDelete = (id: string) => {
    console.log("hereeeee");
    setVariants(variants.filter((variant) => variant.id !== id));
  };

  return (
    <form className="grid w-full gap-4">
      <div className="grid w-full gap-3">
        <Label htmlFor="name" className="font-semibold">
          Product Name
        </Label>

        <Input
          placeholder="Product Name"
          type="text"
          className={`font-semibold text-xs md:text-sm py-4 md:py-6`}
          defaultValue={isEdit ? product.name : ""}
        />
      </div>
      <div className="grid w-full gap-3">
        <Label className="font-semibold">Images</Label>
        <MultiImageUploader />
      </div>

      {/* <div className="grid w-full gap-3">
        <Label htmlFor="descriptiontr" className="font-semibold">
          Description TR
        </Label>

        <Textarea
          placeholder="Enter your description here"
          className={`font-semibold text-xs md:text-sm h-[100px]`}
        />
      </div> */}
      <div className="grid w-full gap-3">
        <Label htmlFor="descriptionen" className="font-semibold">
          Description EN
        </Label>

        <Textarea
          placeholder="Enter your description here"
          className={`font-semibold text-xs md:text-sm h-[100px]`}
          defaultValue={isEdit ? product.description : ""}
        />
      </div>
      <div className="flex w-full gap-4">
        <div className="grid w-full gap-3">
          <Label htmlFor="price" className="font-semibold">
            Price
          </Label>

          <Input
            placeholder="Price"
            type="text"
            className={`font-semibold text-xs md:text-sm py-4 md:py-6`}
            defaultValue={isEdit ? product.price.toString() : ""}
          />
        </div>
        <div className="grid w-full gap-3">
          <Label htmlFor="discount" className="font-semibold">
            Discount %
          </Label>

          <Input
            placeholder="%"
            type="text"
            className={`font-semibold text-xs md:text-sm py-4 md:py-6`}
            defaultValue={isEdit ? product.discount_percent?.toString() : ""}
          />
        </div>
      </div>

      <Variants
        variants={variants}
        handleOnDelete={(id: string) => handleVariantDelete(id)}
        initialColors={initialColors}
        initialSizes={initialSizes}
        onSaveOrEdit={(updatedVariant: GroupedStockByColor) => {
          setVariants((prev) => {
            const existingVariant = prev.some(
              (v) => v.id === updatedVariant.id
            );
            return existingVariant
              ? prev.map((v) =>
                  v.id === updatedVariant.id ? updatedVariant : v
                )
              : [...prev, updatedVariant];
          });
        }}
      />
      <Button
        className="w-full font-bold text-sm  cursor-pointer border-2 hover:bg-[#131313] hover:border-2 hover:border-white hover:text-white transition duration-300"
        type="submit"
      >
        {isEdit ? "Update Product" : "Create Product"}
      </Button>
    </form>
  );
};

export default ProductForm;
