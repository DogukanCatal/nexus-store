import React, { useState } from "react";

import { Label } from "../ui/label";

import { GroupedStockByColor } from "@/types/grouped-stock-by-color";
import DeleteAlertDialog from "./DeleteAlertDialog";
import { Color } from "@/types/product-color";
import CreateEditVariantDialog from "./CreateEditVariantDialog";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { Size } from "@/types/product-size";

type VariantsProps = {
  variants: GroupedStockByColor[];
  handleOnDelete: (id: string) => void;
  initialColors: Color[];
  initialSizes: Size[];
  onSaveOrEdit: (updatedVariant: GroupedStockByColor) => void;
};

const Variants = ({
  variants,
  handleOnDelete,
  initialColors,
  initialSizes,
  onSaveOrEdit,
}: VariantsProps) => {
  const [showVariantDialog, setShowVariantDialog] = useState<boolean>(false);
  const [selectedVariant, setSelectedVariant] = useState<GroupedStockByColor>();
  const handleAddVariant = () => {
    console.log(initialSizes);
    if (initialSizes) {
      const emptyVariant: GroupedStockByColor = {
        id: crypto.randomUUID(),
        color: { id: "", name: "", hex: "" },
        sizes: initialSizes.map((s) => ({
          id: s.id,
          label: s.label,
          sort_order: s.sort_order,
          stock: 0,
        })),
      };
      setSelectedVariant(emptyVariant);
      setShowVariantDialog(true);
    }
  };

  return (
    <>
      {showVariantDialog && selectedVariant && (
        <CreateEditVariantDialog
          initialColors={initialColors}
          variant={selectedVariant}
          showVariantDialog={showVariantDialog}
          onClose={() => setShowVariantDialog(false)}
          dialogTitle="Edit Variant"
          onSaveOrEdit={(updatedVariant: GroupedStockByColor) => {
            onSaveOrEdit(updatedVariant);
            setShowVariantDialog(false);
          }}
        />
      )}
      <Label className="font-semibold">Variants</Label>
      <Button
        type="button"
        className="font-semibold cursor-pointer"
        variant="outline"
        onClick={handleAddVariant}
      >
        Add Variant
      </Button>
      {variants &&
        variants.map((variant, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-2 border-1 rounded-lg p-4 "
          >
            <div
              className="size-10 rounded-full border-2"
              style={{ backgroundColor: variant.color.hex }}
            />
            <div className="flex">
              {variant.sizes.map((size) => (
                <div
                  key={size.id}
                  className="flex flex-col items-center justify-center gap-2 p-2"
                >
                  <p className="font-semibold text-xs">{size.label}</p>
                  <p className="font-semibold text-xs">{size.stock}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                className="size-10 cursor-pointer"
                variant="outline"
                onClick={() => {
                  setSelectedVariant(variant);
                  setShowVariantDialog(true);
                }}
              >
                <Pencil />
              </Button>
              <DeleteAlertDialog
                id={variant.id}
                onDelete={(id: string) => handleOnDelete(id)}
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default Variants;
