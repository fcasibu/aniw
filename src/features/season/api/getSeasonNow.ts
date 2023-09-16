import { ONE_WEEK_IN_SECONDS } from '@/constants';
import type { Anime } from '@/features/common/types';
import { http } from '@/lib';

export const getSeasonNow = async (limit = 5) =>
  http.get<Anime[]>(`/seasons/now?limit=${limit}`, {
    next: { revalidate: ONE_WEEK_IN_SECONDS },
  });
