import type { Anime } from '@/features';
import type { RequestOptions } from '@/lib';
import { http } from '@/lib';
import { createQueryString } from '@/utils';

export const getNewReleases = async (limit = 6, options?: RequestOptions) => {
  const queryString = createQueryString('', {
    limit: `${limit}`,
    status: 'airing',
    order_by: 'start_date',
    sort: 'desc',
  });

  return http.get<Anime[]>(`/anime${queryString}`, {
    ...options,
    next: { revalidate: 3600 },
  });
};
