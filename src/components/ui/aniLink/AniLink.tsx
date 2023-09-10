import { type VariantProps } from 'class-variance-authority';
import type { ComponentProps} from 'react';
import { forwardRef } from 'react';

import { cn } from '@/utils';
import type { LinkProps as NextLinkProps } from 'next/link';
import { default as NextLink } from 'next/link';
import { buttonVariants } from '..';

export type LinkProps = ComponentProps<'a'> &
  NextLinkProps &
  VariantProps<typeof buttonVariants>;

export const AniLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <NextLink
        {...props}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
      />
    );
  },
);

AniLink.displayName = 'Link';
