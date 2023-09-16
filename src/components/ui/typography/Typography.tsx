import { cn } from '@/utils';
import type { ComponentProps } from 'react';

export const TypographyH1 = ({ className, ...props }: ComponentProps<'h1'>) => (
  <h1
    className={cn(
      'text-3xl font-extrabold tracking-tight first:mt-0',
      className,
    )}
    {...props}
  />
);

export const TypographyH2 = ({ className, ...props }: ComponentProps<'h2'>) => (
  <h2
    className={cn(
      'text-2xl font-semibold tracking-tight first:mt-0',
      className,
    )}
    {...props}
  />
);

export const TypographyH3 = ({ className, ...props }: ComponentProps<'h3'>) => (
  <h3
    className={cn('text-xl font-semibold tracking-tight first:mt-0', className)}
    {...props}
  />
);

export const TypographyH4 = ({ className, ...props }: ComponentProps<'h4'>) => (
  <h4
    className={cn('text-lg font-semibold tracking-tight first:mt-0', className)}
    {...props}
  />
);

export const TypographyPara = ({
  className,
  ...props
}: ComponentProps<'p'>) => (
  <p className={cn('text-sm leading-7', className)} {...props} />
);
