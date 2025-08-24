import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useTelegram } from '../hooks/useTelegram';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const { tg } = useTelegram();
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const isAdding = !prev.includes(id);
      const newFavorites = isAdding
        ? [...prev, id]
        : prev.filter((favId) => favId !== id);
      
      localStorage.setItem('favorites', JSON.stringify(newFavorites));

      // Show notification
      if (isAdding) {
        try {
          tg.showAlert("Товар добавлен в избранное");
        } catch (error) {
          console.warn('Could not show Telegram alert:', error);
        }
      }

      return newFavorites;
    });
  }, [tg]);

  const isFavorite = useCallback((id: string) => {
    return favorites.includes(id);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
