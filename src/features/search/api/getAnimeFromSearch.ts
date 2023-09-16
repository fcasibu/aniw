import type { Anime } from '@/features';
import { http } from '@/lib';

export const getAnimeFromSearch = async (query: string, limit = 5) =>
  http.get<Anime[]>(`/anime?q=${query}&limit=${limit}`, {
    cache: 'no-store',
  });
