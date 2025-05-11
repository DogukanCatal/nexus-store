import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type ProductDescriptionProps = {
  description: string;
};

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  if (!description) return null;

  return (
    <div className="border-b-2">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-bold text-sm md:text-base hover:no-underline cursor-pointer">
            Description
          </AccordionTrigger>
          <AccordionContent className="font-semibold">
            {description}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductDescription;
