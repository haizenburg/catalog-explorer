import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FavoritesProvider, useFavoritesContext } from './contexts/FavoritesContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import './App.css';

// Lazy load routes for code splitting
const CatalogPage = lazy(() => import('./pages/CatalogPage').then(m => ({ default: m.CatalogPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage').then(m => ({ default: m.FavoritesPage })));

function AppContent() {
  const { favoritesCount } = useFavoritesContext();

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="app-header" role="banner">
        <nav className="nav" aria-label="Main navigation">
          <Link to="/" className="logo" aria-label="Catalog Explorer Home">
            Catalog Explorer
          </Link>
          <div className="nav-links">
            <Link to="/" aria-current="page">Catalog</Link>
            <Link to="/favorites" className="favorites-link">
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="favorites-count" aria-label={`${favoritesCount} items in favorites`}>
                  {favoritesCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      <main id="main-content" className="app-main" role="main">
        <ErrorBoundary>
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route path="/" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <AppContent />
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
