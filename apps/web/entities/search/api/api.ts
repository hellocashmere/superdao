import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import type { APIResponse } from "@/shared/api";
import { baseQuery } from "@/shared/api/tanstack";

import { SearchResultDTOToView } from "../lib/to-map";
import type { SearchResultView } from "../model/types/types";

import type { SearchResultDTO } from "./types/types";

/**
 * Loads global search results matching a query.
 *
 * Matches result names and types after normalizing the query.
 *
 * Endpoint: `GET /search-results`.
 */
export function useGetSearchResults(query: string): UseQueryResult<readonly SearchResultView[], Error> {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return useQuery<APIResponse<readonly SearchResultDTO[]>, Error, readonly SearchResultView[]>({
    queryKey: ["search-results", normalizedQuery],
    queryFn: () => {
      return baseQuery<readonly SearchResultDTO[]>("/search-results", {
        method: "GET",
      });
    },
    select: (response: APIResponse<readonly SearchResultDTO[]>): readonly SearchResultView[] => {
      return response.data
        .filter((result) => {
          return `${result.name} ${result.type}`.toLocaleLowerCase().includes(normalizedQuery);
        })
        .map((result) => {
          return SearchResultDTOToView(result);
        });
    },
    placeholderData: {
      data: [],
    },
    enabled: normalizedQuery.length > 0,
  });
}

/**
 * Loads persisted recent-search results by their identifiers.
 *
 * Preserves the order of the supplied identifiers and skips missing results.
 *
 * Endpoint: `GET /search-results`.
 */
export function useGetRecentSearchResults(ids: readonly string[]): UseQueryResult<readonly SearchResultView[], Error> {
  return useQuery<APIResponse<readonly SearchResultDTO[]>, Error, readonly SearchResultView[]>({
    queryKey: ["search-results", "recent", ...ids],
    queryFn: () => {
      return baseQuery<readonly SearchResultDTO[]>("/search-results", {
        method: "GET",
      });
    },
    select: (response: APIResponse<readonly SearchResultDTO[]>): readonly SearchResultView[] => {
      return ids.flatMap((id) => {
        const result = response.data.find((item) => {
          return item.id === id;
        });

        return result ? [SearchResultDTOToView(result)] : [];
      });
    },
    placeholderData: {
      data: [],
    },
    enabled: ids.length > 0,
  });
}
