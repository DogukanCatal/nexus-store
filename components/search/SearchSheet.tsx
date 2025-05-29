"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Search } from "lucide-react";
import useMediaQuery from "@/lib/use-media-query";
import searchProducts from "@/lib/api//product/search-products";
import { Products } from "@/types/products";
import { Skeleton } from "../ui/skeleton";
import SearchResult from "./SearchResult";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";

const SearchSheet = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sheetSide = isMobile ? "top" : "right";
  const roundSide = isMobile ? "rounded-b-2xl" : "rounded-l-2xl";
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Products[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        const products = await searchProducts(query);
        setSearchResults(products);
        setIsLoading(false);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed.length > 0) {
      router.push(`/search/${trimmed}`);
      setOpen(false);
    }
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="flex">
          <Search className="hover:cursor-pointer" />
        </SheetTrigger>
        <SheetContent
          side={sheetSide}
          className={`w-full bg-[#131313] ${roundSide}`}
        >
          <SheetHeader className="hidden">
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex flex-col items-center flex-1 justify-start p-4 mt-5 overflow-hidden">
            <SearchInput
              query={query}
              setQuery={setQuery}
              onEnter={handleSearch}
              onSearchClick={handleSearch}
            />
            {isLoading && (
              <div className="flex w-full flex-col ">
                <div className="flex items-center gap-4 w-full mb-5">
                  <Skeleton className="aspect-square w-24 rounded-lg" />
                  <div className="flex flex-col gap-2 flex-1 ">
                    <Skeleton className="h-4 rounded w-3/4" />
                    <Skeleton className="h-4 rounded w-3/4" />
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full mb-5">
                  <Skeleton className="aspect-square w-24 rounded-lg" />
                  <div className="flex flex-col gap-2 flex-1 ">
                    <Skeleton className="h-4 rounded w-3/4" />
                    <Skeleton className="h-4 rounded w-3/4" />
                  </div>
                </div>
              </div>
            )}
            {/* todo style no product found */}
            <div className="overflow-y-auto min-h-0 flex-1 w-full scrollbar-hidden">
              {!isLoading && searchResults.length > 0 ? (
                <>
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => setOpen(false)}
                      className="text-left block cursor-pointer w-full"
                    >
                      <SearchResult product={product} />
                    </Link>
                  ))}
                </>
              ) : (
                !isLoading && query.trim() && <span>No Product Found</span>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SearchSheet;
