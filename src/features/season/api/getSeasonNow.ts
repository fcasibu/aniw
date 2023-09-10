import { ONE_WEEK_IN_SECONDS } from '@/constants';
import { http } from '@/lib';
import type { SeasonNow } from '../types';

export const getSeasonNow = async (limit = 5) =>
  http.get<SeasonNow[]>(`/seasons/now?limit=${limit}`, {
    next: { revalidate: ONE_WEEK_IN_SECONDS },
  });
