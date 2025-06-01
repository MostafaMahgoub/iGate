"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  SlidersHorizontal,
  Tags,
  DollarSign,
  Check,
  RotateCcw,
} from "lucide-react";
import type { ProductFiltersProps } from "@/types";

export function ProductFilters({
  categories,
  selectedCategory,
  minPrice,
  maxPrice,
  onFilterChange,
  loading,
}: ProductFiltersProps) {
  const [localCategory, setLocalCategory] = useState(selectedCategory);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);

  useEffect(() => {
    setLocalCategory(selectedCategory);
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
    setPriceRange([minPrice, maxPrice]);
  }, [selectedCategory, minPrice, maxPrice]);

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    setLocalMinPrice(values[0]);
    setLocalMaxPrice(values[1]);
  };

  const handleApplyFilters = () => {
    onFilterChange(localCategory, localMinPrice, localMaxPrice);
  };

  const handleResetFilters = () => {
    setLocalCategory("");
    setLocalMinPrice(0);
    setLocalMaxPrice(2000);
    setPriceRange([0, 2000]);
    onFilterChange("", 0, 2000);
  };

  const formatCategoryName = (category: string): string => {
    if (typeof category !== "string") return "Category";
    return category.replace(/-/g, " ").replace(/_/g, " ");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 font-philosopher flex items-center">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
          </div>
          Filters
        </h2>
      </div>

      <div className="p-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center">
              <Tags className="h-3 w-3 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 font-philosopher">
              Categories
            </h3>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <RadioGroup
              value={localCategory}
              onValueChange={setLocalCategory}
              className="space-y-2"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="" id="all-categories" />
                <Label
                  htmlFor="all-categories"
                  className="cursor-pointer font-medium text-gray-700 flex-1"
                >
                  All Categories
                </Label>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                  All
                </span>
              </div>
              {categories.map((category, index) => {
                const categoryString = String(category);
                const categoryId = `category-${categoryString}-${index}`;

                return (
                  <div
                    key={categoryId}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <RadioGroupItem
                      value={categoryString}
                      id={categoryId}
                      className="border-2"
                    />
                    <Label
                      htmlFor={categoryId}
                      className="cursor-pointer font-medium text-gray-700 capitalize flex-1"
                    >
                      {formatCategoryName(categoryString)}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          )}
        </div>

        <Separator className="bg-gray-200" />

        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="h-3 w-3 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 font-philosopher">
              Price Range
            </h3>
          </div>

          <div className="space-y-6">
            {/* Price Display */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Selected Range
                </span>
                <span className="text-sm font-bold text-gray-900">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
            </div>

            <div>
              <div className="relative">
                <Slider
                  value={priceRange}
                  min={0}
                  max={2000}
                  step={10}
                  onValueChange={handlePriceRangeChange}
                  className="w-full"
                  aria-label="Price range"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label
                  htmlFor="min-price"
                  className="text-sm font-medium text-gray-600 flex items-center"
                >
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 mr-2"></div>
                  Min Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    $
                  </span>
                  <Input
                    id="min-price"
                    type="number"
                    value={localMinPrice}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setLocalMinPrice(value);
                      setPriceRange([value, priceRange[1]]);
                    }}
                    className="pl-7 h-11 border-2 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                    min={0}
                    max={localMaxPrice}
                    aria-label="Minimum price"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="max-price"
                  className="text-sm font-medium text-gray-600 flex items-center"
                >
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 mr-2"></div>
                  Max Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    $
                  </span>
                  <Input
                    id="max-price"
                    type="number"
                    value={localMaxPrice}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setLocalMaxPrice(value);
                      setPriceRange([priceRange[0], value]);
                    }}
                    className="pl-7 h-11 border-2 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    min={localMinPrice}
                    max={2000}
                    aria-label="Maximum price"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-200" />

        <div className="space-y-3">
          <Button
            onClick={handleApplyFilters}
            className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label="Apply selected filters"
          >
            <Check className="h-4 w-4" />
            Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="w-full h-12 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium rounded-xl transition-all duration-200"
            aria-label="Reset all filters"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
