"use client";
import { Product } from "@/types/product";
import React, { useEffect, useMemo, useState } from "react";
import ProductColorSelector from "./ProductColorSelector";
import ProductSizeSelector from "./ProductSizeSelector";
import { Button } from "../ui/button";
import ProductPrice from "./ProductPrice";
import ProductDescription from "./ProductDescription";
import { useBasketStore } from "@/lib/store/basket-store";
import { useShallow } from "zustand/shallow";
import { BasketProduct } from "@/types/basketProduct";

type ProductOptionsWrapperProps = {
  product: Product;
};

const ProductOptionsWrapper = ({ product }: ProductOptionsWrapperProps) => {
  const { addItem } = useBasketStore(
    useShallow((state) => ({
      addItem: state.addItem,
    }))
  );

  const [selectedColorId, setSelectedColorId] = useState<string>(() => {
    const colorWithStock = product.product_colors.find((color) =>
      product.product_stock.some(
        (stock) => stock.color_id === color.id && stock.stock > 0
      )
    );
    return colorWithStock?.id ?? product.product_colors[0]?.id;
  });

  const [selectedSizeId, setSelectedSizeId] = useState<string>(() => {
    const sizeWithStock = product.product_sizes.find((size) =>
      product.product_stock.some(
        (stock) =>
          stock.color_id === selectedColorId &&
          stock.size_id === size.id &&
          stock.stock > 0
      )
    );
    return sizeWithStock?.id ?? product.product_sizes[0]?.id;
  });

  const orderedSizes = useMemo(() => {
    return [...product.product_sizes].sort(
      (a, b) => a.size.sort_order - b.size.sort_order
    );
  }, [product.product_sizes]);

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

  const isDiscounted: boolean =
    product.discount_percent !== null && product.discount_percent > 0;
  const isCompletelyOutOfStock = product.product_stock.every(
    (stock) => stock.stock <= 0
  );
  useEffect(() => {
    const stockForColor = product.product_stock.filter(
      (s) => s.color_id === selectedColorId && s.stock > 0
    );
    const firstAvailableSize = product.product_sizes.find((size) =>
      stockForColor.some((s) => s.size_id === size.id)
    );
    if (firstAvailableSize) {
      setSelectedSizeId(firstAvailableSize.id);
    }
  }, [selectedColorId, product.product_sizes, product.product_stock]);

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
      size_id: selectedSizeId,
      size_name: selectedSize?.size.label,
      stock: productStock.stock,
    };
    //todo should not be able to add more than stock number.
    addItem(basketProduct);
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

      <ProductPrice
        price={product.price}
        discountPercent={product.discount_percent}
        isDiscounted={isDiscounted}
        finalPrice={product.final_price}
        discountSize="medium"
        priceSize="large"
      />

      <Button
        disabled={isCompletelyOutOfStock}
        onClick={handleAddToBasket}
        className={`font-bold text-sm ms:text-base ${
          isCompletelyOutOfStock
            ? "cursor-not-allowed bg-[#262626] text-white"
            : "cursor-pointer bg-white text-black"
        }`}
      >
        {buttonTitle}
      </Button>

      <ProductDescription description={product.description} />
    </div>
  );
};

export default ProductOptionsWrapper;
