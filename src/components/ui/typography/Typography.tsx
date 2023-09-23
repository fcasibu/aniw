import { cn } from '@/utils';
import type { ComponentProps } from 'react';

export const TypographyH1 = ({
  className,
  children,
  ...props
}: ComponentProps<'h1'>) => (
  <h1
    className={cn(
      'text-3xl font-extrabold tracking-tight first:mt-0',
      className,
    )}
    {...props}
  >
    {children}
  </h1>
);

export const TypographyH2 = ({
  className,
  children,
  ...props
}: ComponentProps<'h2'>) => (
  <h2
    className={cn(
      'text-2xl font-semibold tracking-tight first:mt-0',
      className,
    )}
    {...props}
  >
    {children}
  </h2>
);

export const TypographyH3 = ({
  className,
  children,
  ...props
}: ComponentProps<'h3'>) => (
  <h3
    className={cn('text-xl font-semibold tracking-tight first:mt-0', className)}
    {...props}
  >
    {children}
  </h3>
);

export const TypographyH4 = ({
  className,
  children,
  ...props
}: ComponentProps<'h4'>) => (
  <h4
    className={cn('text-lg font-semibold tracking-tight first:mt-0', className)}
    {...props}
  >
    {children}
  </h4>
);

export const TypographyPara = ({
  className,
  children,
  ...props
}: ComponentProps<'p'>) => (
  <p className={cn('text-sm leading-7', className)} {...props}>
    {children}
  </p>
);
