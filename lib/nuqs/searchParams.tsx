import { parseAsString, createLoader } from "nuqs/server";

export const sortSearchParams = {
  sort: parseAsString.withDefault(""),
};

export const loadSearchParams = createLoader(sortSearchParams);
