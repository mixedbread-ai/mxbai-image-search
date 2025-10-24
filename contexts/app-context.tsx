"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import type { SearchResult } from "@/app/api/search/route";
import { useSearch } from "@/hooks/use-search";

interface AppContextType {
  query: string;
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  results: SearchResult[];
  isLoading: boolean;
  error: Error | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("Mountain Scenery");
  const [searchInput, setSearchInput] = useState("");

  const { results, isLoading, error } = useSearch(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  return (
    <AppContext.Provider
      value={{
        query,
        searchInput,
        setSearchInput,
        handleSearch,
        results,
        isLoading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
