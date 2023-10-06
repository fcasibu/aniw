import type { Anime } from '@/features';
import { present } from '@/utils';
import { StarIcon } from 'lucide-react';
import { AniLink, ImageWithFallback, Separate, TypographyPara } from '..';

export function SearchItem({ title, year, images, score, type, url }: Anime) {
  return (
    <AniLink
      href={url}
      variant={null}
      size={null}
      className="relative flex w-full items-start justify-start gap-3"
    >
      <ImageWithFallback
        aria-hidden
        src={images.webp.image_url}
        alt=""
        width={50}
        height={50}
        className="pointer-events-none aspect-square select-none"
      />
      <div className="flex flex-col gap-1 text-zinc-200">
        <TypographyPara className="line-clamp-1">{title}</TypographyPara>
        <div className="flex items-center gap-1 text-xs text-zinc-400">
          <Separate separator="minus" className="text-xs text-zinc-400">
            {present(score) && (
              <span className="flex gap-1">
                <StarIcon aria-hidden size={14} className="fill-current" />
                <span className="sr-only">Score: </span>
                {score.toFixed(2)}
              </span>
            )}
            {present(type) && (
              <span>
                <span className="sr-only">Type: </span>
                {type.toUpperCase()}
              </span>
            )}
            {present(year) && (
              <time dateTime={year.toString()}>
                <span className="sr-only">Year: </span>
                {year}
              </time>
            )}
          </Separate>
        </div>
      </div>
    </AniLink>
  );
}
