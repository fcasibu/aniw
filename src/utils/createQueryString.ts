import type { ReadonlyURLSearchParams } from 'next/navigation';

export function createQueryString(
  search: string | ReadonlyURLSearchParams | URLSearchParams,
  params: Record<string, string>,
) {
  const searchParams = new URLSearchParams(search);
  Object.entries(params).forEach(([key, val]) => searchParams.set(key, val));

  return `?${searchParams.toString()}`;
}
