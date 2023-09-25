import type { Anime } from '@/features';
import type { RequestOptions } from '@/lib';
import { http } from '@/lib';

type TopAnimeParams = {
  filter: string;
  limit?: number;
  page?: number;
};

export const getTopAnime = async (
  { filter, limit = 9, page = 1 }: TopAnimeParams,
  options?: RequestOptions,
) =>
  http.get<Anime[]>(`/top/anime?limit=${limit}&filter=${filter}&page=${page}`, {
    ...options,
    cache: 'no-store',
  });
