import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortLabels } from "@/lib/sort-labels";
import { SortOption } from "@/types/sort";
const Sort = ({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) => {
  console.log(value);
  console.log("SelectItem values:", Object.keys(SortLabels));
  return (
    <Select
      value={value}
      onValueChange={(val) => {
        onChange(val as SortOption);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(SortLabels).map(([key, label]) => (
          <SelectItem key={key} value={key}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sort;
