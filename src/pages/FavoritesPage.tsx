import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types/product';
import { fetchProductById } from '../api/productsApi';
import { useFavoritesContext } from '../contexts/FavoritesContext';

export function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useFavoritesContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, [favorites]);

  async function loadFavorites() {
    if (favorites.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const productPromises = favorites.map(id => fetchProductById(id));
      const loadedProducts = await Promise.all(productPromises);
      setProducts(loadedProducts.filter((p): p is Product => p !== null));
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="loading">Loading your favorites...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="favorites-page">
        <h1>My Favorites</h1>
        <div className="empty-state">
          <p>You haven't added any favorites yet.</p>
          <button onClick={() => navigate('/')}>Browse Products</button>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h1>My Favorites</h1>
      <p className="product-count">{products.length} favorite{products.length !== 1 ? 's' : ''}</p>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <button
              className={`favorite-btn ${isFavorite(product.id) ? 'is-favorite' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(product.id);
              }}
              aria-label="Remove from favorites"
            >
              ❤️
            </button>
            <div onClick={() => navigate(`/product/${product.id}`)} className="product-card-content">
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
          </div>
        ))}
      </div>
    </div>
  );
}
