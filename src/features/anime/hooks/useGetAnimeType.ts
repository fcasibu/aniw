'use client';

import type { Anime } from '@/features';
import type { RequestOptions } from '@/lib';
import { useCallback, useEffect, useState } from 'react';
import { getTopAnime } from '..';

export const AnimeFilterType = {
  all: 'airing',
  popular: 'bypopularity',
  favorite: 'favorite',
  upcoming: 'upcoming',
} as const;

export type AnimeFilterTypeKeys = keyof typeof AnimeFilterType;

export const filterTypeKeys = Object.keys(
  AnimeFilterType,
) as AnimeFilterTypeKeys[];

// TODO: use a query library
export function useGetAnimeType(type: AnimeFilterTypeKeys, limit = 12) {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<Anime[]>([]);

  const getAnime = useCallback(
    async (filter: string, options?: RequestOptions) => {
      try {
        setIsLoading(true);
        const { data } = await getTopAnime({ filter, limit }, options);
        setItems(data ?? []);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setItems([]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [limit],
  );

  useEffect(() => {
    const abortController = new AbortController();

    (async () =>
      await getAnime(AnimeFilterType[type], {
        signal: abortController.signal,
      }))();

    return () => abortController.abort();
  }, [type, getAnime]);

  return { isLoading, items };
}
