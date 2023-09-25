'use client';

import { ONE_SECOND_IN_MS } from '@/constants';
import { useMatchWindowSize } from '@/hooks';
import { format, present } from '@/utils';
import { Play } from 'lucide-react';
import type { ReactNode } from 'react';
import { AniLink, Separate, TypographyH4, TypographyPara } from '..';
import { Card } from './Card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './HoverCard';
import type { CardProps } from './types';

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
          <Col title="Season">
            <span className="capitalize">{season}</span>
          </Col>
        )}
        {present(score) && (
          <Col title="Score">
            <span>
              {score.toFixed(2)}{' '}
              <span className="text-zinc-500">/ {scored_by} scored by</span>
            </span>
          </Col>
        )}
        {present(status) && (
          <Col title="Status">
            <span>{status}</span>
          </Col>
        )}
        {present(aired) && (
          <Col title="Aired">
            <span>
              {format(aired.from)} to {aired.to ? format(aired.to) : '?'}
            </span>
          </Col>
        )}
        {present(genres) && genres.length && (
          <Col title="Genres">
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
          </Col>
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

function Col({ children, title }: { children: ReactNode; title: ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="text-xs capitalize text-zinc-400">{title}:</span>
      <div className="text-xs text-zinc-300">{children}</div>
    </div>
  );
}
