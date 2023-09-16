'use client';

import type { Anime } from '@/features';
import { useCallback, useState } from 'react';
import { getAnimeFromSearch } from '..';

export function useAnimeSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<Anime[]>([]);

  const getAnime = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      const data = (await getAnimeFromSearch(query)) ?? [];
      setItems(data);
    } catch {
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, items, getAnime };
}
