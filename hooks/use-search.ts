import useSWR from "swr";
import type { SearchResult } from "@/app/api/search/route";

interface SearchResponse {
  results: SearchResult[];
}

const fetcher = async (url: string): Promise<SearchResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }
  return res.json();
};

export function useSearch(query: string) {
  const { data, error, isLoading } = useSWR<SearchResponse>(
    query ? `/api/search?q=${encodeURIComponent(query)}` : `/api/search?q=`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 2000,
    },
  );

  const results = data?.results || [];

  return {
    results,
    isLoading,
    error,
  };
}
