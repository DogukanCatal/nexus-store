"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  GroupedStockByColor,
  GroupedStockByColorSizes,
} from "@/types/grouped-stock-by-color";
import ColorSelectorWithCreate from "./ColorSelectorWithCreate";
import { Color } from "@/types/product-color";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type CreateEdiVariantDialogProps = {
  showVariantDialog: boolean;
  variant: GroupedStockByColor;
  onClose: () => void;
  initialColors: Color[];
  dialogTitle: "Create Variant" | "Edit Variant";
  onSaveOrEdit: (updatedVariant: GroupedStockByColor) => void;
};

const CreateEditVariantDialog = ({
  showVariantDialog,
  variant,
  onClose,
  initialColors,
  dialogTitle,
  onSaveOrEdit,
}: CreateEdiVariantDialogProps) => {
  const [colors, setColors] = useState<Color[]>(initialColors);
  const [variantSizes, setVariantSizes] = useState<GroupedStockByColorSizes[]>(
    variant.sizes
  );
  const [selectedColor, setSelectedColor] = useState<Color>(
    variant.color ?? {}
  );
  const [showColors, setShowColors] = useState<boolean>(false);

  return (
    <Dialog open={showVariantDialog} onOpenChange={onClose}>
      <DialogContent
        className=" bg-[#262626] sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()} //do not close dialog when outside of dialog is clicked
        onEscapeKeyDown={(e) => e.preventDefault()} //do not close dialog when esc is pressed
      >
        <DialogHeader>
          <DialogTitle className="font-bold">{dialogTitle}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <div
              className="size-10 rounded-full border-2 flex items-center justify-center "
              style={{ backgroundColor: selectedColor.hex }}
            />
            <Button
              variant="ghost"
              className="cursor-pointer text-sm font-bold"
              onClick={() => {
                setShowColors((prev) => !prev);
              }}
            >
              Change Color
            </Button>
            {/* <div className="border w-full" /> */}
            {showColors && (
              <ColorSelectorWithCreate
                colors={colors}
                onColorCreated={(newColor) =>
                  setColors((prev) => [...prev, newColor])
                }
                selectedColor={variant.color}
                onColorSelected={(color: Color) => {
                  setSelectedColor(color);
                  // const updatedVariant = {
                  //   ...variant,
                  //   color: selectedColor,
                  // };
                  // onSaveOrEdit(updatedVariant);
                }}
              />
            )}
            <div className="flex justify-between items-center w-full border-t-2 py-2">
              {variantSizes.map((size) => (
                <div
                  key={size.id}
                  className="flex flex-col items-center justify-center"
                >
                  <p className="font-semibold">{size.label}</p>
                  <Input
                    type="text"
                    className="font-semibold text-xs text-center"
                    value={size.stock}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        const updatedSizes = variantSizes.map((s) =>
                          s.id === size.id
                            ? { ...s, stock: value === "" ? 0 : Number(value) }
                            : s
                        );
                        setVariantSizes(updatedSizes);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button
            className="cursor-pointer text-sm font-bold"
            type="button"
            onClick={() => {
              const updatedVariant = {
                ...variant,
                color: selectedColor,
                sizes: variantSizes,
              };
              onSaveOrEdit(updatedVariant);
            }}
          >
            Okay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditVariantDialog;
