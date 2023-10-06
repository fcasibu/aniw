import type { Anime } from '@/features';
import { CARDS_FETCH_LIMIT } from '@/features';
import { cn } from '@/utils';
import { Card, HoverableCard } from '.';
import { AniLink, Skeleton } from '..';

export type AnimeCardsProps = {
  items: Anime[];
  isLoading: boolean;
  isHoverable?: boolean;
};

export function AnimeCards({
  items,
  isLoading,
  isHoverable = false,
}: AnimeCardsProps) {
  return (
    <ul className="lg: grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-6">
      {!items.length && (
        <Skeleton
          isLoading={!items.length}
          aspectRatio="2/3"
          count={CARDS_FETCH_LIMIT}
        />
      )}
      {items.map((item, i) => (
        <li
          key={`${item.title}-${i}`}
          className={cn({
            'opacity-40': isLoading,
          })}
        >
          {isHoverable ? (
            <HoverableCard {...item} />
          ) : (
            <AniLink
              href={item.url}
              variant={null}
              size={null}
              className="block"
            >
              <Card {...item} />
            </AniLink>
          )}
        </li>
      ))}
    </ul>
  );
}
