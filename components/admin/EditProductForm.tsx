import React from "react";
import MultiImageUploader from "./MultiImageUploader";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const EditProductForm = () => {
  return (
    <form className="grid w-full gap-4">
      <div className="grid w-full gap-3">
        <Label htmlFor="name" className="font-semibold">
          Product Name
        </Label>

        <Input
          placeholder="Product Name"
          type="text"
          className={`font-semibold text-xs md:text-sm py-4 md:py-6`}
        />
      </div>
      <div className="grid w-full gap-3">
        <Label htmlFor="descriptiontr" className="font-semibold">
          Description TR
        </Label>

        <Textarea
          placeholder="Enter your description here"
          className={`font-semibold text-xs md:text-sm h-[100px]`}
        />
      </div>
      <div className="grid w-full gap-3">
        <Label htmlFor="descriptionen" className="font-semibold">
          Description EN
        </Label>

        <Textarea
          placeholder="Enter your description here"
          className={`font-semibold text-xs md:text-sm h-[100px]`}
        />
      </div>
      <div className="flex w-full gap-4">
        <div className="grid w-full gap-3">
          <Label htmlFor="price" className="font-semibold">
            Price
          </Label>

          <Input
            placeholder="Price"
            type="text"
            className={`font-semibold text-xs md:text-sm py-4 md:py-6`}
          />
        </div>
        <div className="grid w-full gap-3">
          <Label htmlFor="discount" className="font-semibold">
            Discount %
          </Label>

          <Input
            placeholder="%"
            type="text"
            className={`font-semibold text-xs md:text-sm py-4 md:py-6`}
          />
        </div>
      </div>
      <MultiImageUploader />
    </form>
  );
};

export default EditProductForm;
