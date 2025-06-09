import { AdminProduct } from "@/types/admin-product";
import { GroupedStockByColor } from "@/types/grouped-stock-by-color";

export const useGroupedStockByColor = (
  product: AdminProduct | null
): GroupedStockByColor[] => {
  if (!product) return [];

  const productStock = product.product_stock;
  const productColors = product.product_colors;
  const productSizes = product.product_sizes;

  const grouped: GroupedStockByColor[] = [];

  productColors.forEach((productColor) => {
    const color = productColor.color;
    if (!color) return;

    const sizes = productSizes.map((productSize) => {
      const stockEntry = productStock.find(
        (entry) =>
          entry.color_id === productColor.id && entry.size_id === productSize.id
      );

      return {
        id: productSize.size.id,
        label: productSize.size.label,
        sort_order: productSize.size.sort_order,
        stock: stockEntry?.stock ?? 0,
      };
    });

    grouped.push({
      id: crypto.randomUUID(),
      color: {
        id: color.id,
        hex: color.hex,
        name: color.name,
      },
      sizes,
    });
  });

  return grouped;
};
