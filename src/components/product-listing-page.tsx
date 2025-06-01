"use client";

import { useCallback, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";
import { ProductPagination } from "@/components/product-pagination";
import { ProductSearch } from "@/components/product-search";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { ErrorMessage } from "@/components/error-message";
import { MobileFiltersDrawer } from "@/components/mobile-filters-drawer";
import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

export default function ProductListingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const page = Number(searchParams.get("page") || "1");
  const category = searchParams.get("category") || "";
  const minPrice = Number(searchParams.get("minPrice") || "0");
  const maxPrice = Number(searchParams.get("maxPrice") || "2000");
  const searchQuery = searchParams.get("q") || "";
  const limit = 12;

  const { products, categories, totalProducts, loading, error } = useProducts({
    page,
    limit,
    category,
    minPrice,
    maxPrice,
    searchQuery,
  });

  const updateURL = useCallback(
    (params: Record<string, string | number>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === "" || value === 0 || value === "0") {
          newParams.delete(key);
        } else {
          newParams.set(key, value.toString());
        }
      });

      router.push(`${pathname}?${newParams.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const handleFilterChange = useCallback(
    (newCategory: string, newMinPrice: number, newMaxPrice: number) => {
      updateURL({
        category: newCategory,
        minPrice: newMinPrice,
        maxPrice: newMaxPrice,
        page: 1,
      });
      setIsFilterDrawerOpen(false);
    },
    [updateURL]
  );

  const handleSearchChange = useCallback(
    (query: string) => {
      updateURL({
        q: query,
        page: 1,
      });
      setIsFilterDrawerOpen(false);
    },
    [updateURL]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      updateURL({ page: newPage });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateURL]
  );

  const totalPages = Math.ceil(totalProducts / limit);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-6">
      <div className="hidden md:block">
        <ProductSearch
          initialQuery={searchQuery}
          onSearch={handleSearchChange}
        />
      </div>

      <div className="md:hidden">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsFilterDrawerOpen(true)}
          aria-label="Open filters and search"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters & Search
        </Button>
      </div>

      <MobileFiltersDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="Filters & Search"
      >
        <div className="space-y-6">
          <ProductSearch
            initialQuery={searchQuery}
            onSearch={handleSearchChange}
          />
          <ProductFilters
            categories={categories}
            selectedCategory={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onFilterChange={handleFilterChange}
            loading={loading}
          />
        </div>
      </MobileFiltersDrawer>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside
          className="hidden lg:block"
          role="complementary"
          aria-label="Product filters"
        >
          <ProductFilters
            categories={categories}
            selectedCategory={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onFilterChange={handleFilterChange}
            loading={loading}
          />
        </aside>

        <main
          className="lg:col-span-3"
          role="main"
          aria-label="Product listing"
        >
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div className="space-y-1">
                  <p
                    className="text-sm text-gray-600"
                    role="status"
                    aria-live="polite"
                  >
                    {products.length > 0
                      ? `Showing ${(page - 1) * limit + 1}-${Math.min(
                          page * limit,
                          totalProducts
                        )} of ${totalProducts} products`
                      : "No products found"}
                    {category && ` in "${category.replace(/-/g, " ")}"`}
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                  {(minPrice > 0 || maxPrice < 2000) && (
                    <p className="text-xs text-gray-500">
                      Price range: ${minPrice} - ${maxPrice}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Page {page} of {totalPages} • {limit} per page
                  </p>
                </div>
              </div>

              <ProductGrid products={products} />

              {totalPages > 1 && (
                <div className="mt-8">
                  <ProductPagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
