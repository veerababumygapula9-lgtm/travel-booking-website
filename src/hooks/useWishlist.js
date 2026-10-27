import { useCallback, useEffect, useState } from 'react';

export const WISHLIST_STORAGE_KEY = 'wayfarer-wishlist';
const WISHLIST_EVENT = 'wayfarer-wishlist-updated';

function readWishlist() {
  try {
    const saved = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved.map(String) : [];
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState(readWishlist);

  useEffect(() => {
    const sync = () => setWishlist(readWishlist());
    window.addEventListener('storage', sync);
    window.addEventListener(WISHLIST_EVENT, sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener(WISHLIST_EVENT, sync);
    };
  }, []);

  const toggleWishlist = useCallback((packageId) => {
    const id = String(packageId);
    const current = readWishlist();
    const next = current.includes(id)
      ? current.filter((savedId) => savedId !== id)
      : [...current, id];

    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(next));
      setWishlist(next);
      window.dispatchEvent(new Event(WISHLIST_EVENT));
      return true;
    } catch {
      return false;
    }
  }, []);

  return { wishlist, toggleWishlist, isWishlisted: (id) => wishlist.includes(String(id)) };
}
