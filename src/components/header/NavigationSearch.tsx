import { ONE_SECOND_IN_MS } from '@/constants';
import { getAnimeFromSearch } from '@/features';
import { useLazyQuery, useMatchWindowSize } from '@/hooks';
import { cn, dynamicImport, presence } from '@/utils';
import {
  ArrowRightIcon,
  CommandIcon,
  FilterIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDebouncedValue, useKeys, useOutsideClick } from 'rooks';
import { AniLink } from '..';
import { SearchItem } from './SearchItem';

const {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandSeparator,
} = dynamicImport(
  () => import('../ui/commandMenu/CommandMenu'),
  {
    Command: null,
    CommandEmpty: null,
    CommandGroup: null,
    CommandInput: null,
    CommandItem: null,
    CommandList: null,
    CommandLoading: null,
    CommandSeparator: null,
  },
  { ssr: false },
);

export function NavigationSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [value, setValue] = useState('');
  const { data, isLoading, mutate } = useLazyQuery(getAnimeFromSearch);
  const items = presence(data?.data, []);

  const searchBarRef = useRef<HTMLDivElement>(null);
  const [query] = useDebouncedValue(value, ONE_SECOND_IN_MS);
  const isDesktop = useMatchWindowSize('lg');

  const handleOpen = () => setIsSearchOpen(true);
  const handleClose = () => setIsSearchOpen(false);

  useKeys(
    ['MetaLeft', 'KeyO'],
    (event) => {
      event.preventDefault();
      handleOpen();
    },
    { when: isDesktop && !isSearchOpen },
  );
  useKeys(['Escape'], handleClose, { when: isDesktop && isSearchOpen });
  useOutsideClick(searchBarRef, handleClose, isSearchOpen);

  useEffect(() => {
    const abortController = new AbortController();
    if (query.length >= 2) mutate({ query });

    return () => abortController.abort();
  }, [query, mutate]);

  return (
    <div className="relative flex gap-2">
      {isDesktop && (
        <div className="flex select-none items-center gap-1 text-xs text-zinc-500">
          <CommandIcon aria-hidden size={12} />+ O
        </div>
      )}
      <button
        type="button"
        aria-label="Open Search"
        className="self-center"
        onClick={handleOpen}
      >
        {isSearchOpen ? (
          <XIcon aria-hidden size={20} />
        ) : (
          <SearchIcon aria-hidden size={20} />
        )}
      </button>

      {isSearchOpen &&
        (createPortal(
          <div className="bg-zinc-900 p-4 pb-2" ref={searchBarRef}>
            <Command className="w-full shadow-md" loop shouldFilter={false}>
              <CommandInput
                value={value}
                onValueChange={setValue}
                placeholder="Search anime..."
              />
              <CommandList>
                <CommandGroup heading="Suggestions">
                  <CommandEmpty>
                    {isLoading ? <CommandLoading /> : 'No results found.'}
                  </CommandEmpty>
                  {items.map((item) => (
                    <CommandItem
                      value={item.url}
                      key={item.url}
                      className={cn('odd:bg-zinc-900/30', {
                        'opacity-40': isLoading,
                      })}
                    >
                      <SearchItem {...item} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
              <CommandSeparator />
              {!!items.length && <ViewAll />}
            </Command>
            <SearchFooter />
          </div>,
          document.getElementById('search-root')!,
        ) as ReactNode)}
    </div>
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
