import { CARDS_FETCH_LIMIT, type Anime } from '@/features';
import type { RequestOptions } from '@/lib';
import { http } from '@/lib';
import { createQueryString } from '@/utils';

type TopAnimeParams = {
  filter: string;
  limit?: number;
  page?: number;
};

export const getTopAnime = async (
  { filter, limit = CARDS_FETCH_LIMIT, page = 1 }: TopAnimeParams,
  options?: RequestOptions,
) => {
  const queryString = createQueryString('', {
    filter,
    limit: `${limit}`,
    page: `${page}`,
  });

  return http.get<Anime[]>(`/top/anime${queryString}`, {
    ...options,
    next: { revalidate: 3600 },
  });
};
