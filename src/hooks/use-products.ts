"use client";

import { useState, useEffect } from "react";
import type { Product, UseProductsParams, UseProductsReturn } from "@/types";

export function useProducts({
  page,
  limit,
  category,
  minPrice,
  maxPrice,
  searchQuery,
}: UseProductsParams): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();

        const categoryList = Array.isArray(data)
          ? data.map((item: any) =>
              typeof item === "string"
                ? item
                : item.slug || item.name || String(item)
            )
          : [];

        setCategories(categoryList);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let url: string;
        let allProducts: Product[] = [];

        if (searchQuery) {
          const searchResponse = await fetch(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(
              searchQuery
            )}&limit=0&skip=0`
          );
          if (!searchResponse.ok)
            throw new Error("Failed to fetch search results");
          const searchData = await searchResponse.json();

          const allSearchResponse = await fetch(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(
              searchQuery
            )}&limit=${searchData.total}&skip=0`
          );
          if (!allSearchResponse.ok)
            throw new Error("Failed to fetch all search results");
          const allSearchData = await allSearchResponse.json();
          allProducts = allSearchData.products;
        } else if (category) {
          const categoryResponse = await fetch(
            `https://dummyjson.com/products/category/${encodeURIComponent(
              category
            )}?limit=0&skip=0`
          );
          if (!categoryResponse.ok)
            throw new Error("Failed to fetch category products");
          const categoryData = await categoryResponse.json();

          const allCategoryResponse = await fetch(
            `https://dummyjson.com/products/category/${encodeURIComponent(
              category
            )}?limit=${categoryData.total}&skip=0`
          );
          if (!allCategoryResponse.ok)
            throw new Error("Failed to fetch all category products");
          const allCategoryData = await allCategoryResponse.json();
          allProducts = allCategoryData.products;
        } else {
          const totalResponse = await fetch(
            "https://dummyjson.com/products?limit=0&skip=0"
          );
          if (!totalResponse.ok)
            throw new Error("Failed to fetch product count");
          const totalData = await totalResponse.json();

          const allResponse = await fetch(
            `https://dummyjson.com/products?limit=${totalData.total}&skip=0`
          );
          if (!allResponse.ok) throw new Error("Failed to fetch all products");
          const allData = await allResponse.json();
          allProducts = allData.products;
        }

        const filteredProducts = allProducts.filter(
          (product: Product) =>
            product.price >= minPrice && product.price <= maxPrice
        );

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        setProducts(paginatedProducts);
        setTotalProducts(filteredProducts.length);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
        setProducts([]);
        setTotalProducts(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, category, minPrice, maxPrice, searchQuery]);

  return {
    products,
    categories,
    totalProducts,
    loading,
    error,
  };
}
