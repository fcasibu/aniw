import { dynamicImport } from '@/utils';
import { MenuIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { DropdownMenuTriggerHandle, DropdownState } from '..';
import { AniLink, DropdownMenu, DropdownMenuTrigger } from '..';

const {
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuItem,
} = dynamicImport(() => import('../ui/dropdownMenu'), {
  DropdownMenuSeparator: { ssr: false },
  DropdownMenuItem: { ssr: false },
  DropdownMenuContent: { ssr: false },
  DropdownMenuLabel: { ssr: false },
});

const menuItems = [
  { text: 'Home', href: '/' },
  { text: 'Genre', href: '/' },
  { text: 'Types', href: '/' },
  { text: 'Newest', href: '/' },
  { text: 'Updated', href: '/' },
  { text: 'Ongoing', href: '/' },
  { text: 'Added', href: '/' },
  { text: 'Request', href: '/' },
];

export function Menu() {
  const [state, setState] = useState<DropdownState>('closed');
  const triggerHandleRef = useRef<DropdownMenuTriggerHandle>(null);
  const isClosed = state === 'closed';

  useEffect(() => {
    if (!triggerHandleRef.current) return;

    const unsub = triggerHandleRef.current.subscribe(setState);

    return () => unsub();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="group"
        ref={triggerHandleRef}
        aria-label={isClosed ? 'Open Menu' : 'Close Menu'}
      >
        {isClosed ? (
          <MenuIcon aria-hidden size={30} />
        ) : (
          <XIcon aria-hidden size={30} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map(({ text, href }) => (
          <DropdownMenuItem key={text}>
            <AniLink
              variant={null}
              size={null}
              href={href}
              className="w-full justify-start"
            >
              {text}
            </AniLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
