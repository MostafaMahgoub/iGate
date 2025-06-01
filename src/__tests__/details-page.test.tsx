import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProductPage from "../app/products/[id]/page";
import * as getProductModule from "@/lib/get-product";

jest.mock("@/lib/get-product");

const mockProduct = {
  id: 1,
  title: "Test Product",
  description: "A great product",
  price: 100,
  discountPercentage: 10,
  rating: 4.5,
  stock: 5,
  brand: "Brand",
  category: "cat",
  thumbnail: "",
  images: [""],
};

describe("ProductPage", () => {
  beforeEach(() => {
    (getProductModule.getProduct as jest.Mock).mockResolvedValue(mockProduct);
  });

  it("renders product details", async () => {
    render(await ProductPage({ params: { id: "1" } }));
    expect(
      screen.getByRole("heading", { name: /test product/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/a great product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100/i)).toBeInTheDocument();
  });
});
