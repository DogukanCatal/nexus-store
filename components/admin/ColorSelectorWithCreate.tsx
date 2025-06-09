"use client";
import { Color } from "@/types/product-color";
import React, { useState, useTransition } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LoaderCircle } from "lucide-react";
import { addColorAction } from "@/actions/add-color";

type ColorSelectorWithCreateProps = {
  colors: Color[];
  onColorCreated?: (newColor: Color) => void;
  selectedColor: Color;
  onColorSelected: (selectedColor: Color) => void;
};

const ColorSelectorWithCreate = ({
  colors,
  onColorCreated,
  selectedColor,
  onColorSelected,
}: ColorSelectorWithCreateProps) => {
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [colorName, setColorName] = useState<string>("");
  const [colorHex, setColorHex] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<{ name?: string; hex?: string }>({});
  const handleAddColor = () => {
    startTransition(async () => {
      const formData = { name: colorName, hex: colorHex };

      const addColorResponse = await addColorAction(formData);

      if (!addColorResponse.success) {
        if (addColorResponse.fieldErrors) {
          setErrors(addColorResponse.fieldErrors);
        } else {
          console.error(addColorResponse.error);
        }
        return;
      }

      if (addColorResponse && addColorResponse.data.id) {
        onColorCreated?.(addColorResponse.data);
        setShowCreateForm(false);
        setColorName("");
        setColorHex("");
        setErrors({});
      }
    });
  };

  if (colors.length === 0) {
    return <div></div>;
  }
  return (
    <div className="space-y-2">
      <Label>Choose Color</Label>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <Button
            type="button"
            key={color.id}
            variant="outline"
            style={{ backgroundColor: color.hex }}
            className={`w-10 h-10 rounded-full border-2 cursor-pointer ${selectedColor.id === color.id ? "border-white" : ""}`}
            onClick={() => onColorSelected(color)}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          className="w-10 h-10 rounded-full"
          onClick={() => setShowCreateForm((prev) => !prev)}
          disabled={isPending}
        >
          +
        </Button>
      </div>
      {showCreateForm && (
        <div className="grid gap-2 mt-2">
          <div className="grid">
            <Input
              placeholder="Color Name"
              type="text"
              value={colorName}
              onChange={(e) => {
                setColorName(e.target.value);
                if (errors.name) {
                  setErrors((prev) => ({ ...prev, name: "" }));
                }
              }}
              className={`font-semibold text-xs md:text-sm py-4 md:py-6 ${
                errors.name ? "border-[#EA4A78]" : ""
              }`}
            />
            {errors.name && (
              <p className="text-[#EA4A78] font-semibold text-xs md:tex-sm">
                {errors.name}
              </p>
            )}
          </div>
          <div className="grid">
            <Input
              placeholder="Color Hex"
              type="text"
              value={colorHex}
              onChange={(e) => {
                setColorHex(e.target.value);
                if (errors.hex) {
                  setErrors((prev) => ({ ...prev, hex: "" }));
                }
              }}
              className={`font-semibold text-xs md:text-sm py-4 md:py-6 ${
                errors.hex ? "border-[#EA4A78]" : ""
              }`}
            />
            {errors.hex && (
              <p className="text-[#EA4A78] font-semibold text-xs md:tex-sm">
                {errors.hex}
              </p>
            )}
          </div>
          <Button
            type="button"
            size="sm"
            onClick={handleAddColor}
            disabled={isPending}
          >
            {isPending ? (
              <span>
                <LoaderCircle className="size-5 animate-spin" />
              </span>
            ) : (
              <span>Add Color</span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ColorSelectorWithCreate;
