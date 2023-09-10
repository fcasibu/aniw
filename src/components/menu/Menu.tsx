'use client';

import { MenuIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type {
  DropdownMenuTriggerHandle,
  DropdownState} from '..';
import {
  AniLink,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '..';

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

    const unsub = triggerHandleRef.current.subscribe((state) => {
      setState(state);
    });

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
      <DropdownMenuContent>
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
