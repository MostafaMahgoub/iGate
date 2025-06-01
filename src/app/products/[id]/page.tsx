import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  Star,
  Package,
  Truck,
  ShoppingCart,
  Heart,
  Share2,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { getProduct } from "@/lib/get-product";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  try {
    const product = await getProduct(params.id);

    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [{ url: product.thumbnail }],
      },
      twitter: {
        card: "summary_large_image",
        title: product.title,
        description: product.description,
        images: [product.thumbnail],
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const product = await getProduct(params.id);
    const discountedPrice = product.discountPercentage
      ? product.price * (1 - product.discountPercentage / 100)
      : product.price;

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4 inline" /> Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">
                  {product.category.replace(/-/g, " ")}
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {product.discountPercentage > 0 && (
                  <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-lg px-3 py-1">
                    -{Math.round(product.discountPercentage)}% OFF
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.images
                  .slice(0, 4)
                  .map((image: string, index: number) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.title} image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                        sizes="(max-width: 768px) 25vw, 12vw"
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="mb-4 capitalize">
                  {product.category.replace(/-/g, " ")}
                </Badge>
                <h1 className="text-4xl font-bold text-gray-900 mb-4 font-philosopher capitalize">
                  {product.title}
                </h1>

                <div className="flex items-center mb-6 space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating.toFixed(1)} (
                    {Math.floor(Math.random() * 500) + 50} reviews)
                  </span>
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      {product.discountPercentage > 0 && (
                        <span className="text-xl text-gray-500 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Package className="h-4 w-4 mr-1" />
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>
                      <span className="flex items-center">
                        <Truck className="h-4 w-4 mr-1" />
                        Free shipping
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 font-philosopher">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-900 font-philosopher">
                      Brand
                    </h3>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-900 font-philosopher">
                      Category
                    </h3>
                    <p className="text-sm text-gray-600 capitalize">
                      {product.category.replace(/-/g, " ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <Button
                  size="lg"
                  className="w-full text-lg py-6"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" size="lg">
                    <Heart className="h-4 w-4" />
                    Add to Wishlist
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
