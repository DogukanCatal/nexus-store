import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSearchInput = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed.length > 0) {
      router.push(`/search/${trimmed}`);
    }
  };

  return {
    query,
    setQuery,
    handleSearch,
  };
};
