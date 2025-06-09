"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const MultiImageUploader = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    // setPreviews(files.map((file) => URL.createObjectURL(file)));
    const uniqueFiles = newFiles.filter(
      (file) => !files.some((f) => f.name === file.name)
    );

    setFiles((prev) => [...prev, ...uniqueFiles]);
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    };
  }, [files]);

  const handleDeleteFile = (fileToDelete: File) => {
    setFiles((prev) => prev.filter((file) => file !== fileToDelete));
  };

  console.log(files);

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
          {files.map((file, i) => (
            <div
              key={i}
              className="relative  aspect-square h-[100px] w-[100px] border-2 rounded-lg overflow-hidden "
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={`Preview image ${i + 1}`}
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
