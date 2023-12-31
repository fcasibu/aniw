import type { Anime } from '@/features';
import type { RequestOptions } from '@/lib';
import { http } from '@/lib';
import { createQueryString } from '@/utils';

type GetAnimeFromSearchParams = {
  query: string;
  limit?: number;
};

export const getAnimeFromSearch = async (
  { query, limit = 5 }: GetAnimeFromSearchParams,
  options?: RequestOptions,
) => {
  const queryString = createQueryString('', {
    q: query,
    limit: `${limit}`,
  });

  return http.get<Anime[]>(`/anime${queryString}`, {
    ...options,
    next: { revalidate: 3600 },
  });
};
