"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import type { ProductSearchProps } from "@/types";

export function ProductSearch({ initialQuery, onSearch }: ProductSearchProps) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-6 h-6 bg-purple-50 rounded-lg flex items-center justify-center">
          <Search className="h-3 w-3 text-purple-600" />
        </div>
        <h3 className="font-medium text-gray-900 font-philosopher">
          Search Products
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-12 h-12 border-2 rounded-xl focus:ring-2 focus:ring-primary/20 bg-gray-50 focus:bg-white transition-colors"
            aria-label="Search products"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100 rounded-lg"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-gray-400" />
            </Button>
          )}
        </div>
        <Button
          type="submit"
          className="h-12 px-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          aria-label="Search"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>
    </div>
  );
}
