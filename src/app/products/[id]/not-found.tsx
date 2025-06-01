import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Home } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="text-gray-400 text-3xl" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-philosopher">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8 font-muli">
            The product you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-4">
            <Button asChild className="w-full font-muli">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full font-muli">
              <Link href="/">
                <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
