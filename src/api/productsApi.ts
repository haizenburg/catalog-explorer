import type { Product, ProductFilters } from '../types/product';
import { mockProducts } from './mockData';

/**
 * Products API - Handles product data fetching, filtering, and sorting
 *
 * This module provides a mock API layer that simulates real backend behavior.
 * In production, replace the mock implementation with actual API calls.
 *
 * Features:
 * - Search across name, description, and tags
 * - Filter by category, tags, and stock availability
 * - Multiple sort options
 * - Network delay simulation for realistic UX testing
 * - Error simulation for testing error handling
 */

// Simulate network delay for realistic loading states
const SIMULATE_DELAY = 300; // ms

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulate network failures (5% chance) to test error handling
function shouldSimulateError(): boolean {
  return Math.random() < 0.05;
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * Fetch all products with optional filtering and sorting
 *
 * @param filters - Optional filters to apply (search, category, tags, stock, sort)
 * @returns Promise<Product[]> - Filtered and sorted products
 *
 * @example
 * // Get all products in Electronics category
 * const products = await fetchProducts({ category: 'Electronics' });
 *
 * @example
 * // Search for laptops, in stock only, sorted by price
 * const products = await fetchProducts({
 *   search: 'laptop',
 *   inStock: true,
 *   sortBy: 'price-asc'
 * });
 */
export async function fetchProducts(filters?: ProductFilters): Promise<Product[]> {
  await delay(SIMULATE_DELAY);

  if (shouldSimulateError()) {
    throw new NetworkError('Failed to fetch products. Please try again.');
  }

  let filtered = [...mockProducts];

  // Apply search filter
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Apply category filter
  if (filters?.category) {
    filtered = filtered.filter(product => product.category === filters.category);
  }

  // Apply tags filter
  if (filters?.tags && filters.tags.length > 0) {
    filtered = filtered.filter(product =>
      filters.tags!.some(tag => product.tags.includes(tag))
    );
  }

  // Apply stock filter
  if (filters?.inStock !== undefined) {
    filtered = filtered.filter(product => product.inStock === filters.inStock);
  }

  // Apply sorting
  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
        break;
    }
  }

  return filtered;
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id: string): Promise<Product | null> {
  await delay(SIMULATE_DELAY);

  if (shouldSimulateError()) {
    throw new NetworkError('Failed to fetch product details. Please try again.');
  }

  const product = mockProducts.find(p => p.id === id);
  return product || null;
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  const categories = new Set(mockProducts.map(p => p.category));
  return Array.from(categories).sort();
}

/**
 * Get all unique tags
 */
export function getTags(): string[] {
  const tags = new Set(mockProducts.flatMap(p => p.tags));
  return Array.from(tags).sort();
}
