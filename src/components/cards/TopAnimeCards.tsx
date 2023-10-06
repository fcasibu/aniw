'use client';

import type { AnimeFilterTypeKeys } from '@/features';
import { CARDS_FETCH_LIMIT, filterTypeKeys, useGetTopAnime } from '@/features';
import type { Pagination } from '@/lib';
import { cn, createQueryString, presence } from '@/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { AniLink, Separate, TypographyH3 } from '..';
import { AnimeCards } from './AnimeCards';

const DEFAULT_TYPE = 'all';

const normalizeType = (type: AnimeFilterTypeKeys | null) => {
  if (!type) return DEFAULT_TYPE;

  return (
    filterTypeKeys.includes(type) ? type.toLowerCase() : DEFAULT_TYPE
  ) as AnimeFilterTypeKeys;
};

const normalizePagination = (
  page?: string | number | null,
  maxPage?: number,
) => {
  const pageNum = Number(page);
  if (pageNum <= 0 || Number.isNaN(pageNum)) return 1;

  if (maxPage) return Math.min(pageNum, maxPage);

  return pageNum;
};

export function TopAnimeCards() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = normalizeType(searchParams.get('type') as AnimeFilterTypeKeys);
  const currentPage = normalizePagination(searchParams.get('page'));
  const {
    data: items,
    pagination,
    isLoading,
  } = useGetTopAnime({
    type,
    limit: CARDS_FETCH_LIMIT,
    page: currentPage,
  });

  useEffect(() => {
    const lastPage = pagination?.last_visible_page;
    if (!lastPage || !currentPage) return;

    const dirtyPage = Number(searchParams.get('page'));
    if (currentPage > lastPage || dirtyPage !== currentPage) {
      const params = { page: `${normalizePagination(currentPage, lastPage)}` };
      router.push(`${createQueryString(searchParams, params)}`, {
        scroll: false,
      });
    }
  }, [currentPage, pagination?.last_visible_page, searchParams, router]);

  useEffect(() => {
    const dirtyType = searchParams.get('type');
    if (dirtyType !== type) {
      router.push(`${createQueryString(searchParams, { type })}`, {
        scroll: false,
      });
    }
  }, [router, type, searchParams]);

  const types = useMemo(
    () =>
      filterTypeKeys.map((type) => ({
        href: `${createQueryString(searchParams, {
          type,
          page: '1',
        })}`,
        title: type,
      })),
    [searchParams],
  );

  return (
    <div className="flex flex-col gap-3">
      <TopAnimeCardsHeader
        type={type}
        pagination={pagination}
        currentPage={currentPage}
        types={types}
      />
      <AnimeCards
        isHoverable
        items={presence(items, [])}
        isLoading={isLoading}
      />
    </div>
  );
}

type TopAnimeCardsHeaderProps = {
  type: string;
  pagination?: Pagination;
  currentPage: number;
  types: {
    href: string;
    title: 'all' | 'favorite' | 'upcoming' | 'popular';
  }[];
};

function TopAnimeCardsHeader({
  type,
  pagination,
  currentPage,
  types,
}: TopAnimeCardsHeaderProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = !pagination?.has_next_page;

  return (
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
              prefetch={false}
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
          href={createQueryString('', { type, page: `${currentPage - 1}` })}
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
          href={createQueryString('', { type, page: `${currentPage + 1}` })}
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
  );
}
