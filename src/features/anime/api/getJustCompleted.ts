import type { Anime } from '@/features';
import type { RequestOptions } from '@/lib';
import { http } from '@/lib';
import { createQueryString } from '@/utils';

export const getJustCompleted = async (limit = 6, options?: RequestOptions) => {
  const queryString = createQueryString('', {
    limit: `${limit}`,
    status: 'complete',
    order_by: 'end_date',
    sort: 'desc',
  });

  return http.get<Anime[]>(`/anime${queryString}`, {
    ...options,
    next: { revalidate: 3600 },
  });
};
