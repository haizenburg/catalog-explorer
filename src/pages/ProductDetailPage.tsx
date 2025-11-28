import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types/product';
import { fetchProductById } from '../api/productsApi';
import { useFavoritesContext } from '../contexts/FavoritesContext';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavoritesContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    loadProduct(id);
  }, [id]);

  async function loadProduct(productId: string) {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProductById(productId);
      if (!data) {
        setError('Product not found');
      } else {
        setProduct(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div className="error">
        <p>{error || 'Product not found'}</p>
        <button onClick={() => navigate('/')}>Back to Catalog</button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Catalog
      </button>

      <div className="product-detail">
        <div className="product-images">
          <img src={product.imageUrl} alt={product.name} className="main-image" />
        </div>

        <div className="product-details">
          <h1>{product.name}</h1>
          <div className="rating">
            ⭐ {product.rating} ({product.reviewCount} reviews)
          </div>
          <p className="price">${product.price.toFixed(2)} {product.currency}</p>
          <p className={`stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </p>

          <button
            className={`favorite-btn-large ${isFavorite(product.id) ? 'is-favorite' : ''}`}
            onClick={() => toggleFavorite(product.id)}
          >
            {isFavorite(product.id) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>

          <div className="tags">
            {product.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className="description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          <div className="specifications">
            <h2>Specifications</h2>
            <dl>
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
