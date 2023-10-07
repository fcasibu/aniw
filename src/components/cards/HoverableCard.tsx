'use client';

import { ONE_SECOND_IN_MS } from '@/constants';
import { useMatchWindowSize } from '@/hooks';
import { dateFormat, dynamicImport, present } from '@/utils';
import { Play } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  AniLink,
  HoverCard,
  HoverCardTrigger,
  Separate,
  TypographyH4,
  TypographyPara,
} from '..';
import { Card } from './Card';
import type { CardProps } from './types';

const { HoverCardContent } = dynamicImport(() => import('./HoverCard'), {
  HoverCardContent: null,
});

export function HoverableCard(props: CardProps) {
  const {
    url,
    score,
    title,
    synopsis,
    genres,
    aired,
    scored_by,
    season,
    status,
  } = props;

  const isDesktop = useMatchWindowSize('lg');

  return (
    <HoverCard
      {...(!isDesktop && { open: false })}
      openDelay={ONE_SECOND_IN_MS}
      closeDelay={200}
    >
      <HoverCardTrigger asChild>
        <AniLink href={url} variant={null} size={null} className="block">
          <Card {...props} />
        </AniLink>
      </HoverCardTrigger>
      <HoverCardContent
        side="right"
        className="flex min-w-[20rem] flex-col gap-2"
      >
        {present(title) && (
          <TypographyH4 className="text-lg">{title}</TypographyH4>
        )}
        {present(synopsis) && (
          <TypographyPara className="line-clamp-3 text-xs">
            {synopsis}
          </TypographyPara>
        )}
        {present(season) && (
          <Row title="Season">
            <span className="capitalize">{season}</span>
          </Row>
        )}
        {present(score) && (
          <Row title="Score">
            <span>
              {score.toFixed(2)}{' '}
              <span className="text-zinc-500">/ {scored_by} scored by</span>
            </span>
          </Row>
        )}
        {present(status) && (
          <Row title="Status">
            <span>{status}</span>
          </Row>
        )}
        {present(aired) && (
          <Row title="Aired">
            <p>
              <time dateTime={aired.from}>{dateFormat(aired.from)}</time> to{' '}
              {aired.to ? (
                <time dateTime={aired.to}>{dateFormat(aired.to)}</time>
              ) : (
                '?'
              )}
            </p>
          </Row>
        )}
        {present(genres) && !!genres.length && (
          <Row title="Genres">
            <Separate className="flex flex-wrap" size={10}>
              {genres.map((genre) => (
                <AniLink
                  variant="link"
                  size={null}
                  href={genre.url}
                  className="text-[0.7rem] text-purple-400"
                  key={genre.name}
                >
                  {genre.name}
                </AniLink>
              ))}
            </Separate>
          </Row>
        )}
        <AniLink
          href={url}
          className="w-full gap-1 self-start py-1 text-xs font-bold uppercase"
        >
          <Play className="fill-current" size={15} aria-hidden />
          <span>Watch</span>
        </AniLink>
      </HoverCardContent>
    </HoverCard>
  );
}

function Row({ children, title }: { children: ReactNode; title: ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="text-xs capitalize text-zinc-400">{title}:</span>
      <div className="text-xs text-zinc-300">{children}</div>
    </div>
  );
}
