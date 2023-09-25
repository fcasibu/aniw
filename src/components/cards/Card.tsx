'use client';

import { present } from '@/utils';
import { PlayIcon, StarIcon } from 'lucide-react';
import { ImageWithFallback, TypographyPara } from '..';
import type { CardProps } from './types';

export function Card({ title, images, score, type }: CardProps) {
  return (
    <div>
      <div className="group relative">
        <PlayIcon
          aria-hidden
          className="user-select-none inset-center pointer-events-none absolute z-10 fill-current opacity-0 group-hover:opacity-100 motion-safe:transition-opacity"
          size={50}
        />
        <div className="group relative aspect-[3/4] overflow-hidden rounded-md bg-black">
          <ImageWithFallback
            aria-hidden
            src={images.webp.image_url}
            className="group-hover:opacity-50 motion-safe:transition-opacity"
            sizes="33vw, (min-width: 48em) 25vw, (min-width: 64em) 16vw"
            fill
            alt=""
          />
          <div className="absolute bottom-0 flex w-full items-center justify-between bg-zinc-800 p-1 text-xs text-zinc-400">
            {present(score) && (
              <TypographyPara className="flex items-center gap-1 text-xs">
                <StarIcon aria-hidden className="fill-current" size={10} />
                <span>{score.toFixed(2)}</span>
              </TypographyPara>
            )}
            <span className="ml-auto font-bold">{type}</span>
          </div>
        </div>
      </div>
      {present(title) && (
        <TypographyPara
          className="truncate hover:text-purple-300 motion-safe:transition-colors"
          title={title}
        >
          {title}
        </TypographyPara>
      )}
    </div>
  );
}

export default Card;
