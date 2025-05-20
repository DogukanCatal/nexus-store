"use client";
import { Product } from "@/types/product";
import React, { useEffect, useMemo, useState } from "react";
import ProductColorSelector from "./ProductColorSelector";
import ProductSizeSelector from "./ProductSizeSelector";
import { Button } from "../ui/button";
import { useBasketStore } from "@/store/basket-store";
import { useShallow } from "zustand/shallow";
import { BasketProduct } from "@/types/basket-product";
import { toast } from "sonner";
import CustomToast from "../shared/toast/CustomToast";

type ProductOptionsWrapperProps = {
  product: Product;
};

const ProductOptionsWrapper = ({ product }: ProductOptionsWrapperProps) => {
  const { addItem } = useBasketStore(
    useShallow((state) => ({
      addItem: state.addItem,
    }))
  );

  const orderedSizes = useMemo(() => {
    return [...product.product_sizes].sort(
      (a, b) => a.size.sort_order - b.size.sort_order
    );
  }, [product.product_sizes]);

  const [selectedColorId, setSelectedColorId] = useState<string>(() => {
    const colorWithStock = product.product_colors.find((color) =>
      product.product_stock.some(
        (stock) => stock.color_id === color.id && stock.stock > 0
      )
    );
    return colorWithStock?.id ?? product.product_colors[0]?.id;
  });

  const [selectedSizeId, setSelectedSizeId] = useState<string>(() => {
    const sizeWithStock = orderedSizes.find((size) =>
      product.product_stock.some(
        (stock) =>
          stock.color_id === selectedColorId &&
          stock.size_id === size.id &&
          stock.stock > 0
      )
    );
    return sizeWithStock?.id ?? product.product_sizes[0]?.id;
  });

  const filteredStock = useMemo(() => {
    return product.product_stock.filter((s) => s.color_id === selectedColorId);
  }, [product.product_stock, selectedColorId]);

  const filteredSizes = useMemo(() => {
    return orderedSizes.filter((size) =>
      filteredStock.some((stock) => stock.size_id === size.id)
    );
  }, [orderedSizes, filteredStock]);

  const selectedColor = product.product_colors.find(
    (color) => color.id === selectedColorId
  );
  const selectedSize = filteredSizes.find((size) => size.id === selectedSizeId);

  const isCompletelyOutOfStock = product.product_stock.every(
    (stock) => stock.stock <= 0
  );

  useEffect(() => {
    const stockForColor = product.product_stock.filter(
      (s) => s.color_id === selectedColorId && s.stock > 0
    );
    const firstAvailableSize = filteredSizes.find((size) =>
      stockForColor.some((s) => s.size_id === size.id)
    );
    if (firstAvailableSize) {
      setSelectedSizeId(firstAvailableSize.id);
    }
  }, [selectedColorId, product.product_stock, filteredSizes]);

  const buttonTitle = isCompletelyOutOfStock ? "Out Of Stock" : "Add To Cart";
  const handleAddToBasket = () => {
    if (!product) return;

    const productStock = filteredStock.find(
      (s) =>
        s.product_id === product.id &&
        s.size_id === selectedSizeId &&
        s.color_id === selectedColorId
    );

    if (!productStock) return;

    const basketProduct: BasketProduct = {
      product_id: product.id,
      name: product.name,
      slug: product.slug,
      image: product.product_images[0].url ?? null,
      price: product.price,
      discount_price: product.discount_price,
      discount_percent: product.discount_percent,
      final_price: product.final_price,
      color_id: selectedColorId,
      color_name: selectedColor?.color.name,
      color_hex: selectedColor?.color.hex,
      size_id: selectedSizeId,
      size_name: selectedSize?.size.label,
      stock: productStock.stock,
    };
    //if you want it to be silent do
    //addItem(basketProduct, undefined, { silent: true });
    addItem(basketProduct, (success, msg) => {
      toast.custom((id) => (
        <CustomToast success={success} message={msg} toastId={id} />
      ));
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-white/50 text-xs md:text-sm">
          Color:{" "}
          <span className="font-bold text-white">
            {selectedColor?.color.name}
          </span>
        </span>

        <ProductColorSelector
          colors={product.product_colors}
          stock={product.product_stock}
          selectedColorId={selectedColorId}
          onChange={(id) => setSelectedColorId(id)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-semibold text-white/50 text-xs md:text-sm">
          Size:{" "}
          <span className="font-bold text-white">
            {selectedSize?.size.label}
          </span>
        </span>

        <ProductSizeSelector
          sizes={filteredSizes}
          stock={filteredStock}
          selectedSizeId={selectedSizeId}
          onChange={(id) => setSelectedSizeId(id)}
        />
      </div>

      <Button
        disabled={isCompletelyOutOfStock}
        onClick={handleAddToBasket}
        className={`font-bold text-sm ms:text-base py-8 ${
          isCompletelyOutOfStock
            ? "cursor-not-allowed bg-[#262626] text-white"
            : "cursor-pointer bg-white text-black"
        }`}
      >
        {buttonTitle}
      </Button>
    </div>
  );
};

export default ProductOptionsWrapper;
