"use client";
import React from "react";
import SearchInput from "./SearchInput";
import { useSearchInput } from "@/hooks/useSearchInput";

const SearchPageInput = () => {
  const { query, setQuery, handleSearch } = useSearchInput();

  return (
    <div className=" w-full max-w-md md:max-w-3xl">
      <SearchInput
        query={query}
        setQuery={setQuery}
        onSearchClick={handleSearch}
        onEnter={handleSearch}
      />
    </div>
  );
};

export default SearchPageInput;
