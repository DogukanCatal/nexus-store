import { SortOption } from "@/types/sort";

export const SortLabels: Record<SortOption, string> = {
  [SortOption.None]: "No Sort",
  [SortOption.PriceAscending]: "Price, low to high",
  [SortOption.PriceDescending]: "Price, high to low",
};
