"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SortOption } from "@/types/sort";
import { SortLabels } from "@/lib/sort-labels";
import { useProductParams } from "@/hooks/useProductParams";

type SortProps = {
  refetchProducts?: () => Promise<void>;
  search?: boolean;
};

const Sort = ({ refetchProducts, search = false }: SortProps) => {
  const { sortBy, setSortBy } = useProductParams();

  const handleSort = (val: SortOption) => {
    setSortBy(val);
    if (!search) {
      refetchProducts?.();
    }
  };

  return (
    <div className=" flex items-center justify-start w-full">
      <Select
        value={sortBy}
        onValueChange={(val) => handleSort(val as SortOption)}
      >
        <SelectTrigger className="w-[180px]">
          <span className="text-sm text-muted-foreground">
            {SortLabels[sortBy as SortOption] ?? "Sort by"}
          </span>
        </SelectTrigger>
        <SelectContent>
          {Object.values(SortOption).map((sortValue) => (
            <SelectItem key={sortValue} value={sortValue}>
              {SortLabels[sortValue]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
