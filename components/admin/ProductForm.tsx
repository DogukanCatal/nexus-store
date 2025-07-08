"use client";
import React, { useState, useTransition } from "react";
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
import { ProductImage } from "@/types/product-image";
import {
  ProductFormData,
  productFormSchema,
} from "@/schemas/admin/product/product-form-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitProductAsync } from "@/lib/api/admin/products/create-or-edit-product";
import { LoaderCircle } from "lucide-react";

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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      discount_percent: product?.discount_percent ?? 0,
      // images: [],
      variants: useGroupedStockByColor(product),
    },
  });
  const [isPending, startTransition] = useTransition();
  const [variants, setVariants] = useState<GroupedStockByColor[]>(
    useGroupedStockByColor(product)
  );
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [deletedImages, setDeletedImages] = useState<ProductImage[]>([]);
  const isEdit = !!product;
  console.log(product);
  const handleVariantDelete = (id: string) => {
    const updated = variants.filter((variant) => variant.id !== id);
    setVariants(updated);
    setValue("variants", updated, { shouldValidate: true }); // <--- Zod form datasını da güncelle
  };
  const onSubmit = (data: ProductFormData) => {
    startTransition(async () => {
      try {
        console.log(newFiles);
        const response = await submitProductAsync(
          data,
          newFiles,
          deletedImages,
          product
        );
        if (!response.success) {
          console.error("Checkout error:", response.error);
        }
      } catch (err) {
        console.error("Error during form submit:", err);
      }
    });
  };

  return (
    <form className="grid w-full gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-3">
        <Label htmlFor="name" className="font-semibold">
          Product Name
        </Label>

        <div className="flex flex-col flex-1">
          <Input
            {...register("name")}
            placeholder="Product Name"
            type="text"
            className={` font-semibold text-xs md:text-sm py-4 md:py-6 ${
              errors.name ? "border-[#EA4A78]" : ""
            }`}
          />
          {errors.name && (
            <span className="text-[#EA4A78] font-semibold text-xs md:tex-sm">
              {errors.name.message}
            </span>
          )}
        </div>
      </div>
      <div className="grid w-full gap-3">
        <Label className="font-semibold">Images</Label>
        <MultiImageUploader
          initialImages={product?.product_images ?? []}
          onChange={(added, removed) => {
            setNewFiles(added);
            setDeletedImages(removed);
            // setValue("images", added, { shouldValidate: true });
          }}
        />
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
          {...register("description")}
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
            {...register("price")}
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
            {...register("discount_percent")}
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
            const updated = prev.some((v) => v.id === updatedVariant.id)
              ? prev.map((v) =>
                  v.id === updatedVariant.id ? updatedVariant : v
                )
              : [...prev, updatedVariant];

            // JSON formatına dönüştür
            const formatted = updated;

            setValue("variants", formatted, { shouldValidate: true });
            return updated;
          });
        }}
      />
      <Button
        className="w-full font-bold text-sm  cursor-pointer border-2 hover:bg-[#131313] hover:border-2 hover:border-white hover:text-white transition duration-300"
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <span>
            <LoaderCircle className="size-5 animate-spin" />
          </span>
        ) : (
          <span> {isEdit ? "Update Product" : "Create Product"}</span>
        )}
      </Button>
    </form>
  );
};

export default ProductForm;
