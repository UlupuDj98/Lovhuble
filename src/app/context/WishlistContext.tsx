import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { toast } from 'sonner';
import { medusa } from '@/app/lib/medusa';
import { useAuth } from './AuthContext';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  categorySlug: string;
  subCategorySlug: string;
  subCategory: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
}

const STORAGE_KEY = 'sense-wishlist';

function readStorage(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function clearStorage() {
  if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
}

function fromBackend(item: Record<string, unknown>): WishlistItem {
  return {
    id: item.product_id as string,
    name: item.product_name as string,
    price: item.price as number,
    image: (item.image as string) ?? '',
    slug: item.slug as string,
    categorySlug: item.category_slug as string,
    subCategorySlug: item.sub_category_slug as string,
    subCategory: item.sub_category as string,
  };
}

async function fetchBackend(): Promise<WishlistItem[]> {
  const data = await medusa.client.fetch<{ items: Record<string, unknown>[] }>('/store/wishlist');
  return data.items.map(fromBackend);
}

async function addToBackend(item: WishlistItem): Promise<void> {
  await medusa.client.fetch('/store/wishlist', {
    method: 'POST',
    body: {
      product_id: item.id,
      product_name: item.name,
      price: item.price,
      image: item.image,
      slug: item.slug,
      category_slug: item.categorySlug,
      sub_category_slug: item.subCategorySlug,
      sub_category: item.subCategory,
    },
  });
}

async function removeFromBackend(productId: string): Promise<void> {
  await medusa.client.fetch(`/store/wishlist/${productId}`, { method: 'DELETE' });
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { customer, isLoading: authLoading } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const prevCustomerId = useRef<string | null>(null);

  // Sync state when auth state is resolved
  useEffect(() => {
    if (authLoading) return;

    if (!customer) {
      // Guest: use localStorage
      setItems(readStorage());
      prevCustomerId.current = null;
      return;
    }

    // Logged in: fetch backend and merge any localStorage items
    const sync = async () => {
      const backendItems = await fetchBackend();
      const localItems = readStorage();

      // Merge: POST any localStorage items not already in backend
      const backendIds = new Set(backendItems.map(i => i.id));
      const toMerge = localItems.filter(i => !backendIds.has(i.id));

      await Promise.allSettled(toMerge.map(addToBackend));

      clearStorage();
      const finalItems = toMerge.length > 0 ? await fetchBackend() : backendItems;
      setItems(finalItems);
      prevCustomerId.current = customer.id;
    };

    sync().catch(console.error);
  }, [customer, authLoading]);

  // On logout (customer becomes null)
  useEffect(() => {
    if (!authLoading && !customer && prevCustomerId.current) {
      setItems([]);
      prevCustomerId.current = null;
    }
  }, [customer, authLoading]);

  // Persist to localStorage when guest
  useEffect(() => {
    if (!authLoading && !customer) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }
    }
  }, [items, customer, authLoading]);

  const addToWishlist = async (item: WishlistItem) => {
    if (items.find(i => i.id === item.id)) return;

    if (customer) {
      // Optimistic update
      setItems(prev => [...prev, item]);
      try {
        await addToBackend(item);
        toast.success('Aggiunto ai preferiti', { description: item.name });
      } catch {
        setItems(prev => prev.filter(i => i.id !== item.id));
        toast.error('Errore nell\'aggiunta ai preferiti');
      }
    } else {
      setItems(prev => {
        toast.success('Aggiunto ai preferiti', { description: item.name });
        return [...prev, item];
      });
    }
  };

  const removeFromWishlist = async (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    if (customer) {
      setItems(prev => prev.filter(i => i.id !== id));
      try {
        await removeFromBackend(id);
        toast.success('Rimosso dai preferiti');
      } catch {
        setItems(prev => [...prev, item]);
        toast.error('Errore nella rimozione dai preferiti');
      }
    } else {
      setItems(prev => {
        toast.success('Rimosso dai preferiti');
        return prev.filter(i => i.id !== id);
      });
    }
  };

  const isInWishlist = (id: string) => items.some(i => i.id === id);

  const toggleWishlist = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
