import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types/product';
import { fetchProducts } from '../api/productsApi';

export function CatalogPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={loadProducts}>Retry</button>
      </div>
    );
  }

  return (
    <div className="catalog-page">
      <h1>Product Catalog</h1>
      <p className="product-count">{products.length} products found</p>
      <div className="products-grid">
        {products.map(product => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <div className="product-info">
              <p className="price">${product.price.toFixed(2)}</p>
              <p className="rating">⭐ {product.rating} ({product.reviewCount})</p>
            </div>
            <p className={`stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
