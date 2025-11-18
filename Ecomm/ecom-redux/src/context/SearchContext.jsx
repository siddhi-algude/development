// src/context/SearchContext.jsx
import { createContext, useContext, useState } from "react";

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearch must be used inside SearchProvider");
  }
  return ctx;
}
