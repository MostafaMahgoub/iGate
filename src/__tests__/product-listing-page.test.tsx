import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ProductListingPage from "@/components/product-listing-page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

global.fetch = jest.fn();

const mockRouter = { push: jest.fn() };
const mockSearchParams = new URLSearchParams();

beforeEach(() => {
  jest.clearAllMocks();
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  (usePathname as jest.Mock).mockReturnValue("/");
  (useSearchParams as jest.Mock).mockReturnValue({
    get: (param: string) => mockSearchParams.get(param),
    toString: () => mockSearchParams.toString(),
  });

  (global.fetch as jest.Mock).mockImplementation((url: string) => {
    if (url.includes("categories")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(["smartphones", "laptops", "fragrances"]),
      });
    }
    // Return 24 products for pagination test
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          products: Array.from({ length: 24 }, (_, i) => ({
            id: i + 1,
            title: `iPhone ${i + 1}`,
            description: "An apple mobile which is nothing like apple",
            price: 549,
            discountPercentage: 12.96,
            rating: 4.69,
            stock: 94,
            brand: "Apple",
            category: "smartphones",
            thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
            images: ["https://i.dummyjson.com/data/products/1/1.jpg"],
          })),
          total: 24,
        }),
    });
  });
});

describe("ProductListingPage", () => {
  test("renders loading state initially", () => {
    render(<ProductListingPage />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("renders products after loading", async () => {
    render(<ProductListingPage />);
    await waitFor(() => {
      expect(screen.getByText("iPhone 1")).toBeInTheDocument();
    });
  });

  test("handles search functionality", async () => {
    render(<ProductListingPage />);
    await waitFor(() => {
      expect(screen.getByText("iPhone 1")).toBeInTheDocument();
    });
    const searchInput = screen.getByPlaceholderText(/search for products/i);
    const searchButtons = screen.getAllByRole("button", { name: /search/i });
    const searchButton = searchButtons.find(
      (btn) => (btn as HTMLButtonElement).type === "submit"
    );
    fireEvent.change(searchInput, { target: { value: "iPhone" } });
    fireEvent.click(searchButton!);
    expect(mockRouter.push).toHaveBeenCalledWith("/?q=iPhone&page=1");
  });

  test("handles pagination", async () => {
    render(<ProductListingPage />);
    await waitFor(() => {
      expect(screen.getByText("iPhone 1")).toBeInTheDocument();
    });
    const nextPageButton = screen.getByRole("link", { name: /next/i });
    fireEvent.click(nextPageButton);
    expect(mockRouter.push).toHaveBeenCalledWith("/?page=2");
  });

  test("displays error message on API failure", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));
    render(<ProductListingPage />);
    await waitFor(() => {
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });

  test("shows no products message when no results", async () => {
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ products: [], total: 0 }),
      })
    );
    render(<ProductListingPage />);
    await waitFor(() => {
      expect(screen.getAllByText("No products found").length).toBeGreaterThan(
        0
      );
    });
  });
});
