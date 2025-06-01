import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductFilters } from "@/components/product-filters";
import React from "react";

describe("ProductFilters", () => {
  const categories = ["cat1", "cat2"];
  const onFilterChange = jest.fn();

  it("renders categories and allows filter change", () => {
    render(
      <ProductFilters
        categories={categories}
        selectedCategory="cat1"
        minPrice={0}
        maxPrice={100}
        onFilterChange={onFilterChange}
        loading={false}
      />
    );
    expect(screen.getByText(/cat1/i)).toBeInTheDocument();
    expect(screen.getByText(/cat2/i)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/cat2/i));
    fireEvent.click(
      screen.getByRole("button", { name: /apply selected filters/i })
    );
    expect(onFilterChange).toHaveBeenCalled();
  });
});
