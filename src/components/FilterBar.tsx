import { getCategories, getTags } from '../api/productsApi';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  stockFilter: boolean | undefined;
  onStockFilterChange: (inStock: boolean | undefined) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagsChange,
  stockFilter,
  onStockFilterChange,
  sortBy,
  onSortChange,
  onClearFilters
}: FilterBarProps) {
  const categories = getCategories();
  const tags = getTags();

  const hasActiveFilters = searchQuery || selectedCategory || selectedTags.length > 0 || stockFilter !== undefined;

  return (
    <div className="filter-bar">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
          aria-label="Search products"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="clear-search"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="category-filter">Category:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="stock-filter">Availability:</label>
          <select
            id="stock-filter"
            value={stockFilter === undefined ? 'all' : stockFilter ? 'in-stock' : 'out-of-stock'}
            onChange={(e) => {
              const value = e.target.value;
              onStockFilterChange(value === 'all' ? undefined : value === 'in-stock');
            }}
            className="filter-select"
          >
            <option value="all">All Products</option>
            <option value="in-stock">In Stock Only</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-filter">Sort By:</label>
          <select
            id="sort-filter"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="filter-select"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button onClick={onClearFilters} className="clear-filters-btn">
            Clear All Filters
          </button>
        )}
      </div>

      <div className="tags-section">
        <label>Filter by tags:</label>
        <div className="tags-list">
          {tags.slice(0, 10).map(tag => (
            <label key={tag} className="tag-checkbox">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onTagsChange([...selectedTags, tag]);
                  } else {
                    onTagsChange(selectedTags.filter(t => t !== tag));
                  }
                }}
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
