"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Search } from "lucide-react";
import useMediaQuery from "@/lib/useMediaQuery";
import searchProducts from "@/lib/api/search-products";
import { Products } from "@/types/products";
import { Skeleton } from "../ui/skeleton";
import SearchResult from "./SearchResult";
import { useRouter } from "next/navigation";

const SearchInput = () => {
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

  const handleProductClick = (slug: string) => {
    setOpen(false); // Sheet'i kapat
    setTimeout(() => {
      router.push(`/product/${slug}`);
    }, 100); // animasyon süresi
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="flex">
          <Search className="hover:cursor-pointer" />
        </SheetTrigger>
        <SheetContent side={sheetSide} className={`bg-[#131313] ${roundSide}`}>
          <SheetHeader>
            <SheetTitle>{}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center flex-1 justify-start px-4 overflow-hidden">
            <div className="flex items-center justify-center w-full bg-[#262626] p-2 rounded-full shadow-sm gap-2 mb-5">
              <Search />
              {/* todo add Enter key down to route search page */}
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="placeholder-white/50 focus:outline-none bg-transparent font-semibold w-full"
              />
            </div>

            {isLoading && (
              <div className="flex w-full flex-col">
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
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.slug)}
                      className="p-0 mx-auto cursor-pointer w-full"
                    >
                      <SearchResult product={product} />
                    </button>
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

export default SearchInput;
