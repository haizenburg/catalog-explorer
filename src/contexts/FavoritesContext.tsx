import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useFavorites } from '../hooks/useFavorites';

/**
 * FavoritesContext provides global state management for favorite products
 *
 * This context makes favorites state available throughout the app without
 * prop drilling. It uses localStorage for persistence across sessions.
 *
 * Usage:
 * 1. Wrap app with <FavoritesProvider>
 * 2. Access state with useFavoritesContext() hook in any component
 */

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  removeFavorite: (productId: string) => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

/**
 * FavoritesProvider - Wraps the app to provide favorites state globally
 *
 * @example
 * <FavoritesProvider>
 *   <App />
 * </FavoritesProvider>
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favoritesData = useFavorites();

  return (
    <FavoritesContext.Provider value={favoritesData}>
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * useFavoritesContext - Hook to access favorites state in any component
 *
 * @throws Error if used outside FavoritesProvider
 *
 * @example
 * const { favorites, toggleFavorite, isFavorite } = useFavoritesContext();
 */
export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within FavoritesProvider');
  }
  return context;
}
