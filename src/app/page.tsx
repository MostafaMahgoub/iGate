import ProductListingPage from "@/components/product-listing-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Listing | E-commerce Store",
  description:
    "Browse our extensive collection of products with advanced filtering and search capabilities.",
  keywords: "products, e-commerce, shopping, filters, categories",
  openGraph: {
    title: "Product Listing | E-commerce Store",
    description:
      "Browse our extensive collection of products with advanced filtering and search capabilities.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-philosopher">
            Product Listing
          </h1>
          <p className="text-gray-600">
            Discover our wide range of products with easy filtering and search
            options.
          </p>
        </div>
        <ProductListingPage />
      </div>
    </main>
  );
}
