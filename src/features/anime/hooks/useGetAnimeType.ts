'use client';

import type { Anime } from '@/features';
import type { Pagination } from '@/lib';
import { useEffect, useState } from 'react';
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

export type GetAnimeTypeParams = {
  type: AnimeFilterTypeKeys;
  limit?: number;
  page?: number;
};

// TODO: use a query library
export function useGetAnimeType({
  type,
  limit = 12,
  page = 1,
}: GetAnimeTypeParams) {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<Anime[]>([]);
  const [pagination, setPagination] = useState<Pagination>();

  useEffect(() => {
    const abortController = new AbortController();

    async function getAnimeType() {
      const filter = AnimeFilterType[type];
      try {
        setIsLoading(true);
        const { data, pagination: paginationData } = await getTopAnime(
          {
            filter,
            limit,
            page,
          },
          { signal: abortController.signal },
        );
        setPagination(paginationData);
        setItems(data ?? []);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setItems([]);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getAnimeType();

    return () => abortController.abort();
  }, [type, page, limit]);

  return { isLoading, items, pagination };
}
