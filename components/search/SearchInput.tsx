import { Search } from "lucide-react";
import React from "react";

type SearchInputProps = {
  query: string;
  setQuery?: (value: string) => void;
  onSearchClick?: () => void;
  onEnter?: () => void;
};

const SearchInput = ({
  query,
  setQuery,
  onSearchClick,
  onEnter,
}: SearchInputProps) => {
  //   const [localQuery, setLocalQuery] = useState<string>(query);
  //   const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter?.();
    }
  };

  return (
    <div className="flex items-center justify-center w-full bg-[#262626] p-2 mb-5 rounded-full shadow-sm gap-2">
      <button
        className="cursor-pointer"
        aria-label="search product"
        onClick={onSearchClick}
      >
        <Search />
      </button>
      {/* todo add Enter key down to route search page */}
      <input
        type="text"
        placeholder="Search..."
        autoFocus
        value={query}
        onChange={(e) => setQuery!(e.target.value)}
        onKeyDown={handleKeyDown}
        className="placeholder-white/50 focus:outline-none bg-transparent font-semibold w-full"
      />
    </div>
  );
};

export default SearchInput;
