'use client';

import type { AnimeFilterTypeKeys } from '@/features';
import { filterTypeKeys, useGetAnimeType } from '@/features';
import { cn, createQueryString } from '@/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { AniLink, Separate, TypographyH3 } from '..';
import { HoverableCard } from './HoverableCard';

const types = filterTypeKeys.map((filterType) => ({
  href: `?type=${filterType}`,
  title: filterType,
}));

const DEFAULT_TYPE = 'all';
const FETCH_LIMIT = 12;

const normalizeType = (type: AnimeFilterTypeKeys | null) => {
  if (!type) return DEFAULT_TYPE;

  return (
    filterTypeKeys.includes(type) ? type.toLowerCase() : DEFAULT_TYPE
  ) as AnimeFilterTypeKeys;
};

const normalizePagination = (page?: string | number | null) => {
  const pageNum = Number(page);
  if (pageNum <= 0 || Number.isNaN(pageNum)) return 1;

  return pageNum;
};

export function TopAnimeCards() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const type = normalizeType(searchParams.get('type') as AnimeFilterTypeKeys);
  const currentPage = normalizePagination(searchParams.get('page'));
  const { items, isLoading, pagination } = useGetAnimeType({
    type,
    limit: FETCH_LIMIT,
    page: currentPage,
  });

  useEffect(() => {
    const lastPage = pagination?.last_visible_page;
    if (!lastPage) return;

    const params = { page: `${Math.min(currentPage, lastPage)}` };

    if (currentPage > lastPage) {
      router.push(`${pathname}?${createQueryString(searchParams, params)}`);
    }
  }, [
    currentPage,
    pagination?.last_visible_page,
    pathname,
    searchParams,
    router,
  ]);

  const isFirstPage = currentPage === 1;
  const isLastPage = !pagination?.has_next_page;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <TypographyH3>Top Anime</TypographyH3>
        <div className="flex gap-2">
          <Separate>
            {types.map(({ href, title }) => (
              <AniLink
                href={href}
                variant={null}
                size={null}
                key={title}
                scroll={false}
                className={cn(
                  "capitalize hover:text-white aria-disabled:pointer-events-none aria-[disabled='false']:text-zinc-400 motion-safe:transition-colors",
                  {
                    'opacity-50': title.toLowerCase() !== type,
                  },
                )}
              >
                {title}
              </AniLink>
            ))}
          </Separate>
          <AniLink
            href={`?type=${type}&page=${currentPage - 1}`}
            scroll={false}
            variant={null}
            size={null}
            aria-label="Previous Page"
            className="capitalize hover:text-white aria-disabled:pointer-events-none aria-disabled:opacity-40 motion-safe:transition-colors"
            aria-disabled={isFirstPage}
            {...(isFirstPage && { tabIndex: -1 })}
          >
            <ChevronLeftIcon aria-hidden size={18} />
          </AniLink>
          <AniLink
            href={`?type=${type}&page=${currentPage + 1}`}
            scroll={false}
            variant={null}
            size={null}
            aria-label="Next Page"
            className="capitalize hover:text-white aria-disabled:pointer-events-none aria-disabled:opacity-40 motion-safe:transition-colors"
            aria-disabled={isLastPage}
            {...(isLastPage && { tabIndex: -1 })}
          >
            <ChevronRightIcon aria-hidden size={18} />
          </AniLink>
        </div>
      </div>
      <ul className="lg: grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-6">
        {!items.length &&
          Array.from({ length: FETCH_LIMIT }).map((_, i) => (
            <li
              key={i}
              className="aspect-[3/4] w-full animate-pulse rounded-md bg-zinc-900"
            />
          ))}
        {items.map((item, i) => (
          <li
            key={`${item.title}-${i}`}
            className={cn({
              'opacity-40': isLoading,
            })}
          >
            <HoverableCard {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
