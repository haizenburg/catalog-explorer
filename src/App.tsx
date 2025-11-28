import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FavoritesProvider, useFavoritesContext } from './contexts/FavoritesContext';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import './App.css';

function AppContent() {
  const { favoritesCount } = useFavoritesContext();

  return (
    <div className="app">
      <header className="app-header">
        <nav className="nav">
          <Link to="/" className="logo">Catalog Explorer</Link>
          <div className="nav-links">
            <Link to="/">Catalog</Link>
            <Link to="/favorites" className="favorites-link">
              Favorites {favoritesCount > 0 && <span className="favorites-count">{favoritesCount}</span>}
            </Link>
          </div>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
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
