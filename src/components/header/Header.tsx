import { AniLink, Logo, Menu } from '..';

export function Header() {
  return (
    <header className="bg-neutral-800 p-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between ">
        <div className="flex items-center gap-3">
          <Menu />
          <Logo />
        </div>
        <AniLink href="/">Sign in</AniLink>
      </div>
    </header>
  );
}
