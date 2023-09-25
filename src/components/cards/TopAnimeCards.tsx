'use client';

import type { AnimeFilterTypeKeys } from '@/features';
import { filterTypeKeys, useGetAnimeType } from '@/features';
import { cn } from '@/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
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

export function TopAnimeCards() {
  const searchParams = useSearchParams();
  const type = normalizeType(searchParams.get('type') as AnimeFilterTypeKeys);
  const { items, isLoading } = useGetAnimeType(type, FETCH_LIMIT);

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
                  'pointer-events-none capitalize hover:text-white motion-safe:transition-colors',
                  {
                    'pointer-events pointer-events-auto text-zinc-400':
                      title.toLowerCase() !== type,
                  },
                )}
                aria-disabled={title.toLowerCase() === type}
                {...(title.toLowerCase() === type && { tabIndex: -1 })}
              >
                {title}
              </AniLink>
            ))}
          </Separate>
          <AniLink
            href={`?type=${type}&page=${1}`}
            scroll={false}
            variant={null}
            size={null}
            aria-label="Previous Page"
          >
            <ChevronLeftIcon aria-hidden size={18} />
          </AniLink>
          <AniLink
            href={`?type=${type}&page=${2}`}
            scroll={false}
            variant={null}
            size={null}
            aria-label="Next Page"
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
