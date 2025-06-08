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
import useMediaQuery from "@/hooks/useMediaQuery";
import { Products } from "@/types/products";
import { Skeleton } from "../ui/skeleton";
import SearchResult from "./SearchResult";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { useSearchInput } from "@/hooks/useSearchInput";
import searchProductsClient from "@/lib/api/product/search-products";

const SearchSheet = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sheetSide = isMobile ? "top" : "right";
  const roundSide = isMobile ? "rounded-b-2xl" : "rounded-l-2xl";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Products[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { query, setQuery, handleSearch } = useSearchInput();
  useEffect(() => {
    setIsLoading(true);
    const delay = setTimeout(async () => {
      if (query.trim()) {
        const products = await searchProductsClient(query);
        setSearchResults(products);
      } else {
        setSearchResults([]);
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSearchWrapper = () => {
    if (query.trim().length > 0) {
      handleSearch();
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
              onEnter={handleSearchWrapper}
              onSearchClick={handleSearchWrapper}
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
