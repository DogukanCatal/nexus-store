"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { ProductImage } from "@/types/product-image";

type MultiImageUploaderProps = {
  initialImages: ProductImage[];
  onChange: (added: File[], removed: ProductImage[]) => void;
};

const MultiImageUploader = ({
  initialImages,
  onChange,
}: MultiImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>(
    initialImages || []
  );
  const [deletedImages, setDeletedImages] = useState<ProductImage[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const uniqueFiles = newFiles.filter(
      (file) => !files.some((f) => f.name === file.name)
    );

    const updatedFiles = [...files, ...uniqueFiles];
    setFiles(updatedFiles);

    onChange?.(updatedFiles, deletedImages);
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    };
  }, [files]);

  const handleDeleteFile = (fileToDelete: File) => {
    const updatedFiles = files.filter((file) => file !== fileToDelete);
    setFiles(updatedFiles);

    onChange?.(updatedFiles, deletedImages);
  };
  const handleDeleteExistingImage = (image: ProductImage) => {
    const updatedImages = existingImages.filter((img) => img.id !== image.id);
    setExistingImages(updatedImages);
    const updatedDeleted = [...deletedImages, image];
    setDeletedImages(updatedDeleted);

    onChange?.(files, updatedDeleted);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full border-1 rounded-lg p-4 overflow-x-auto">
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      <div className=" w-full">
        <div className="flex flex-wrap justify-center gap-2 w-full overflow-y-auto">
          {existingImages.map((image, i) => (
            <div
              key={`existing-${image.id}`}
              className="relative aspect-square h-[100px] w-[100px] border-2 rounded-lg overflow-hidden"
            >
              <Image
                src={image.url}
                alt={`Existing image ${i + 1}`}
                fill
                className="object-cover"
              />
              <Button
                type="button"
                variant="link"
                className="absolute top-0 right-0 cursor-pointer"
                onClick={() => handleDeleteExistingImage(image)}
              >
                <X />
              </Button>
            </div>
          ))}

          {files.map((file, i) => (
            <div
              key={`file-${i}`}
              className="relative aspect-square h-[100px] w-[100px] border-2 rounded-lg overflow-hidden"
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={`New image ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
              />
              <Button
                type="button"
                variant="link"
                className="absolute top-0 right-0 cursor-pointer"
                onClick={() => handleDeleteFile(file)}
              >
                <X />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        className="text-sm font-semibold cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        Add Picture
      </Button>
    </div>
  );
};

export default MultiImageUploader;
