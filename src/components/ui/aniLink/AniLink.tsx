import { type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/utils';
import type { LinkProps as NextLinkProps } from 'next/link';
import { default as NextLink } from 'next/link';
import { buttonVariants } from '..';

export type LinkProps = ComponentProps<'a'> &
  NextLinkProps &
  VariantProps<typeof buttonVariants>;

export const AniLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, className, variant, size, children, ...props }, ref) => {
    // TODO: refactor to a more reliable check
    const isExternal = href.startsWith('http');

    if (isExternal) {
      return (
        <a
          {...props}
          href={href}
          target="_blank"
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
        >
          {children}
        </a>
      );
    }

    return (
      <NextLink
        {...props}
        href={href}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
      >
        {children}
      </NextLink>
    );
  },
);

AniLink.displayName = 'Link';
