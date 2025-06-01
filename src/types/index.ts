// Product related types
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// Hook parameters and return types
export interface UseProductsParams {
  page: number;
  limit: number;
  category: string;
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
}

export interface UseProductsReturn {
  products: Product[];
  categories: string[];
  totalProducts: number;
  loading: boolean;
  error: string | null;
}

// Component props types
export interface ProductCardProps {
  product: Product;
}

export interface ProductGridProps {
  products: Product[];
}

export interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  minPrice: number;
  maxPrice: number;
  onFilterChange: (
    category: string,
    minPrice: number,
    maxPrice: number
  ) => void;
  loading: boolean;
}

export interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ProductSearchProps {
  initialQuery: string;
  onSearch: (query: string) => void;
}

export interface ErrorMessageProps {
  message: string;
}
