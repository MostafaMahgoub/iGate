"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Package, ShoppingCart } from "lucide-react";
import type { ProductCardProps } from "@/types";

export function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <Card
      className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200 group"
      role="gridcell"
    >
      <Link
        href={`/products/${product.id}`}
        prefetch={true}
        className="flex-1 flex flex-col"
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.thumbnail || "/placeholder.svg?height=300&width=300"}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
          {product.discountPercentage > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
              -{Math.round(product.discountPercentage)}%
            </Badge>
          )}
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span
              className="text-xs font-medium"
              aria-label={`Rating: ${product.rating} out of 5`}
            >
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <CardContent className="flex-grow p-4">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs capitalize">
              {typeof product.category === "string"
                ? product.category.replace(/-/g, " ")
                : "Category"}
            </Badge>
          </div>
          <h3
            className="font-semibold text-gray-900 mb-2 line-clamp-2 font-philosopher"
            title={product.title}
          >
            {product.title}
          </h3>
          <p
            className="text-sm text-gray-600 line-clamp-2 mb-3"
            title={product.description}
          >
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span
                className="text-lg font-bold text-gray-900"
                aria-label={`Price: $${discountedPrice.toFixed(2)}`}
              >
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span
                  className="text-sm text-gray-500 line-through"
                  aria-label={`Original price: $${product.price}`}
                >
                  ${product.price}
                </span>
              )}
            </div>
            <span
              className="text-sm text-gray-600 flex items-center"
              aria-label={`${product.stock} items in stock`}
            >
              <Package className="h-3 w-3 mr-1" />
              {product.stock}
            </span>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          aria-label={`Add ${product.title} to cart`}
          onClick={(e) => {
            e.preventDefault();
            console.log(`Added ${product.title} to cart`);
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
