'use client';

import { useLazyQuery } from '@/hooks';
import { useEffect } from 'react';
import { CARDS_FETCH_LIMIT, getTopAnime } from '..';

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

export function useGetTopAnime({
  type,
  limit = CARDS_FETCH_LIMIT,
  page = 1,
}: GetAnimeTypeParams) {
  const { data, mutate, ...rest } = useLazyQuery(getTopAnime);

  useEffect(() => {
    const abortController = new AbortController();

    const filter = AnimeFilterType[type];
    mutate({ filter, limit, page }, { signal: abortController.signal });

    return () => abortController.abort();
  }, [type, page, limit, mutate]);

  return { ...data, ...rest };
}
