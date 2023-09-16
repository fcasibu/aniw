'use client';

import { AniLink, Logo } from '..';
import { Menu } from './Menu';
import { NavigationSearch } from './NavigationSearch';

export function Header() {
  return (
    <header className="relative z-50 bg-zinc-900 p-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between ">
        <div className="flex items-center gap-3">
          <Menu />
          <Logo />
        </div>
        <div className="flex items-center gap-3">
          <NavigationSearch />
          <AniLink href="/">Sign in</AniLink>
        </div>
      </div>
      <div className="absolute -mx-2 w-full py-2" id="search-root"></div>
    </header>
  );
}
