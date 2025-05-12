"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ProductImage } from "@/types/productImages";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductCarouselProps = {
  images: ProductImage[];
};

const ProductCarousel = ({ images }: ProductCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const thumbnailContainerRef = useRef<HTMLDivElement | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Ana carousel değişince indexi güncelle
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  // Aktif thumbnail'ı görünür alana kaydır
  useEffect(() => {
    const activeThumb = thumbnailRefs.current[selectedIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const scrollThumbnails = (direction: "left" | "right") => {
    const container = thumbnailContainerRef.current;
    if (!container) return;

    const scrollAmount = 100;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className=" w-full max-w-xl relative">
      {/* Carousel container */}
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div
              className="relative flex-[0_0_100%] aspect-square"
              key={image.id}
            >
              <Image
                src={image.url}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prev/Next buttons */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-2 -translate-y-1/2 z-10 p-2 bg-white/50 rounded-full cursor-pointer"
      >
        <ChevronLeft className="text-black" size={20} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 z-10 p-2 bg-white/50 rounded-full cursor-pointer"
      >
        <ChevronRight className="text-black" size={20} />
      </button>

      {/* Thumbnail row */}
      <div className="relative mt-4 flex items-center justify-center gap-2">
        {/* Scroll left */}
        <button
          onClick={() => scrollThumbnails("left")}
          className="z-10 p-1 bg-white/50 rounded-full cursor-pointer"
        >
          <ChevronLeft size={18} className="text-black" />
        </button>

        {/* Thumbnails - exactly 3 visible */}
        <div
          ref={thumbnailContainerRef}
          className="flex overflow-x-auto gap-2 max-w-[172px] md:max-w-[286px] flex-nowrap scrollbar-hidden"
        >
          {images.map((img, i) => (
            <button
              key={img.id}
              ref={(el: HTMLButtonElement | null) => {
                thumbnailRefs.current[i] = el;
              }}
              onClick={() => scrollTo(i)}
              className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded overflow-hidden border-2 ${
                i === selectedIndex ? "border-white" : "border-transparent"
              }`}
            >
              <Image
                src={img.url}
                alt={`Thumbnail ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Scroll right */}
        <button
          onClick={() => scrollThumbnails("right")}
          className="z-10 p-1 bg-white/50 rounded-full cursor-pointer"
        >
          <ChevronRight size={18} className="text-black" />
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
