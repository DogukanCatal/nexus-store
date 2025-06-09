import { Color } from "./product-color";

export type GroupedStockByColor = {
  //   colorId: string;
  //   colorHex: string;
  //   colorName: string;
  id: string;
  color: Color;
  sizes: GroupedStockByColorSizes[];
};

export type GroupedStockByColorSizes = {
  id: string;
  label: string;
  sort_order: number;
  stock: number;
};
