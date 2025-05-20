import { BasketItem } from "@/store/basket-store";
import { BasketProduct } from "@/types/basket-product";

export function getBasketProductFromBasketItem(
  product: BasketItem
): BasketProduct {
  const basketProduct: BasketProduct = {
    product_id: product.product.product_id,
    name: product.product.name,
    slug: product.product.slug,
    image: product.product.image ?? null,
    price: product.product.price,
    discount_price: product.product.discount_price,
    discount_percent: product.product.discount_percent,
    final_price: product.product.final_price,
    color_id: product.product.color_id,
    color_name: product.product.color_name,
    color_hex: product.product.color_hex,
    size_id: product.product.size_id,
    size_name: product.product.size_name,
    stock: product.product.stock,
  };

  return basketProduct;
}
