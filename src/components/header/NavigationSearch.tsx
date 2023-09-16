'use client';

import { ONE_SECOND_IN_MS } from '@/constants';
import type { Anime } from '@/features';
import { useAnimeSearch } from '@/features';
import { ArrowRightIcon, FilterIcon, SearchIcon, StarIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDebouncedValue, useOutsideClick } from 'rooks';
import {
  AniLink,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandSeparator,
  DotSeparator,
  ImageWithFallback,
  TypographyPara,
} from '..';

export function NavigationSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [value, setValue] = useState('');
  const { isLoading, items, getAnime } = useAnimeSearch();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [query] = useDebouncedValue(value, ONE_SECOND_IN_MS);

  useEffect(() => {
    (async () => {
      if (query.length >= 2) await getAnime(query);
    })();
  }, [query, getAnime]);

  const handleClick = () => setIsSearchOpen(true);

  useOutsideClick(searchBarRef, () => setIsSearchOpen(false), isSearchOpen);

  return (
    <div className="relative flex">
      <button
        type="button"
        aria-label="Open Search"
        className="self-center"
        onClick={handleClick}
      >
        <SearchIcon aria-hidden size={20} />
      </button>

      {isSearchOpen &&
        createPortal(
          <div className="bg-zinc-900 p-4 pb-2" ref={searchBarRef}>
            <Command className="w-full shadow-md" loop shouldFilter={false}>
              <CommandInput
                value={value}
                onValueChange={setValue}
                placeholder="Search anime..."
              />
              <CommandList>
                <CommandGroup heading="Suggestions">
                  {!isLoading && !items.length && (
                    <CommandEmpty>No results found.</CommandEmpty>
                  )}
                  {isLoading && <CommandLoading />}
                  {items.map((item) => (
                    <CommandItem value={item.url} key={item.url}>
                      <SearchItem {...item} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
              <CommandSeparator />
              {items.length > 0 && <ViewAll />}
            </Command>
            <SearchFooter />
          </div>,
          document.getElementById('search-root')!,
        )}
    </div>
  );
}

function SearchItem({ title, year, images, score, type, url }: Anime) {
  return (
    <AniLink
      href={url}
      variant={null}
      size={null}
      target="_blank"
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
          {score && (
            <span className="flex gap-1">
              <StarIcon aria-hidden size={14} className="fill-current" />
              {score.toFixed(2)}
            </span>
          )}
          {type && score && <DotSeparator size={15} />}
          {type && <span>{type.toUpperCase()}</span>}
          {year && (score || type) && <DotSeparator size={15} />}
          {year && <span>{year}</span>}
        </div>
      </div>
    </AniLink>
  );
}

function SearchFooter() {
  return (
    <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
      <span>Anime</span>
      <AniLink
        href="/"
        variant={null}
        size={null}
        className="flex gap-1 hover:text-zinc-300 focus-visible:text-zinc-300 motion-safe:transition-colors "
      >
        <FilterIcon aria-hidden size={15} />
        <span>Filter</span>
      </AniLink>
    </div>
  );
}

function ViewAll() {
  return (
    <div className="p-2">
      <AniLink
        href="/"
        variant={null}
        size={null}
        className="group flex w-max gap-1 text-zinc-400 hover:text-zinc-300 focus-visible:text-zinc-300 motion-safe:transition-colors"
      >
        <span>View all</span>
        <ArrowRightIcon
          aria-hidden
          size={20}
          className="motion-safe:group-hover:animate-bounce-horizontal-right motion-safe:group-focus:animate-bounce-horizontal-right motion-reduce:group-hover:translate-x-1 motion-reduce:group-focus-visible:translate-x-1"
        />
      </AniLink>
    </div>
  );
}