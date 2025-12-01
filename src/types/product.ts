export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  category: string;
  inStock: boolean;
  imageUrl: string;
  description: string;
  specifications: Record<string, string>;
  updatedAt: string;
  images?: string[];
}

export interface ProductFilters {
  search?: string;
  category?: string;
  tags?: string[];
  inStock?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'rating-desc' | 'newest' | 'oldest';
}
