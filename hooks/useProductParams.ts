import { useQueryState } from "nuqs";

export const useProductParams = () => {
  const [sortBy, setSortBy] = useQueryState("sort", {
    defaultValue: "",
    parse: (value) => value || "",
    history: "push",
    shallow: false,
  });

  return {
    sortBy,
    setSortBy,
  };
};
