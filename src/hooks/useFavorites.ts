import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'catalog-explorer-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, [favorites]);

  function toggleFavorite(productId: string) {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }

  function isFavorite(productId: string): boolean {
    return favorites.includes(productId);
  }

  function removeFavorite(productId: string) {
    setFavorites(prev => prev.filter(id => id !== productId));
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    removeFavorite,
    favoritesCount: favorites.length
  };
}
