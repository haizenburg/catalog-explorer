import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import type { Product, ProductFilters } from '../types/product';
import { fetchProducts } from '../api/productsApi';
import { FilterBar } from '../components/FilterBar';
import { LazyImage } from '../components/LazyImage';
import { useFavoritesContext } from '../contexts/FavoritesContext';
import { useDebounce } from '../hooks/useDebounce';

export function CatalogPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleFavorite, isFavorite } = useFavoritesContext();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Read filters from URL
  const searchQuery = searchParams.get('search') || '';
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const selectedCategory = searchParams.get('category') || '';
  const tagsParam = searchParams.get('tags') || '';
  const selectedTags = useMemo(() => tagsParam.split(',').filter(Boolean), [tagsParam]);
  const stockFilterParam = searchParams.get('stock');
  const stockFilter = stockFilterParam === 'true' ? true : stockFilterParam === 'false' ? false : undefined;
  const sortBy = searchParams.get('sort') || '';

  // Update URL when filters change
  function updateFilters(updates: Partial<{
    search: string;
    category: string;
    tags: string[];
    stock: boolean | undefined;
    sort: string;
  }>) {
    const newParams = new URLSearchParams(searchParams);

    if (updates.search !== undefined) {
      if (updates.search) {
        newParams.set('search', updates.search);
      } else {
        newParams.delete('search');
      }
    }

    if (updates.category !== undefined) {
      if (updates.category) {
        newParams.set('category', updates.category);
      } else {
        newParams.delete('category');
      }
    }

    if (updates.tags !== undefined) {
      if (updates.tags.length > 0) {
        newParams.set('tags', updates.tags.join(','));
      } else {
        newParams.delete('tags');
      }
    }

    if (updates.stock !== undefined) {
      if (updates.stock === true) {
        newParams.set('stock', 'true');
      } else if (updates.stock === false) {
        newParams.set('stock', 'false');
      } else {
        newParams.delete('stock');
      }
    }

    if (updates.sort !== undefined) {
      if (updates.sort) {
        newParams.set('sort', updates.sort);
      } else {
        newParams.delete('sort');
      }
    }

    setSearchParams(newParams);
  }

  function clearAllFilters() {
    setSearchParams(new URLSearchParams());
  }

  // Build filters object for API (using debounced search query for performance)
  const filters = useMemo(() => {
    const f: ProductFilters = {};
    if (debouncedSearchQuery) f.search = debouncedSearchQuery;
    if (selectedCategory) f.category = selectedCategory;
    if (selectedTags.length > 0) f.tags = selectedTags;
    if (stockFilter !== undefined) f.inStock = stockFilter;
    if (sortBy) f.sortBy = sortBy as ProductFilters['sortBy'];
    return f;
  }, [debouncedSearchQuery, selectedCategory, selectedTags, stockFilter, sortBy]);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts(filters);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [filters]);

  function retry() {
    setError(null);
    setLoading(true);
  }

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={retry}>Retry</button>
      </div>
    );
  }

  return (
    <div className="catalog-page">
      <h1>Product Catalog</h1>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={(search) => updateFilters({ search })}
        selectedCategory={selectedCategory}
        onCategoryChange={(category) => updateFilters({ category })}
        selectedTags={selectedTags}
        onTagsChange={(tags) => updateFilters({ tags })}
        stockFilter={stockFilter}
        onStockFilterChange={(stock) => updateFilters({ stock })}
        sortBy={sortBy}
        onSortChange={(sort) => updateFilters({ sort })}
        onClearFilters={clearAllFilters}
      />

      <p className="product-count">{products.length} products found</p>

      {products.length === 0 ? (
        <div className="empty-state" role="status" aria-live="polite">
          <p>No products found matching your criteria.</p>
          <button onClick={clearAllFilters}>Clear Filters</button>
        </div>
      ) : (
        <div className="products-grid" role="list" aria-label="Product list">
          {products.map(product => (
            <article key={product.id} className="product-card" role="listitem">
              <button
                className={`favorite-btn ${isFavorite(product.id) ? 'is-favorite' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product.id);
                }}
                aria-label={`${isFavorite(product.id) ? 'Remove' : 'Add'} ${product.name} ${isFavorite(product.id) ? 'from' : 'to'} favorites`}
                aria-pressed={isFavorite(product.id)}
              >
                {isFavorite(product.id) ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
              </button>
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/product/${product.id}`);
                  }
                }}
                className="product-card-content"
                role="button"
                tabIndex={0}
                aria-label={`View details for ${product.name}`}
              >
                <LazyImage src={product.imageUrl} alt="" />
                <h3>{product.name}</h3>
                <div className="product-info">
                  <p className="price" aria-label={`Price: ${product.price} rands`}>
                    R{product.price.toFixed(2)}
                  </p>
                  <p className="rating" aria-label={`Rating: ${product.rating} out of 5 stars, ${product.reviewCount} reviews`}>
                    <FaStar size={16} /> {product.rating} ({product.reviewCount})
                  </p>
                </div>
                <p className={`stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
