import { cn } from '@/utils';
import { forwardRef, type ComponentProps } from 'react';

const TypographyH1 = forwardRef<HTMLHeadingElement, ComponentProps<'h1'>>(
  ({ className, children, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        'text-3xl font-extrabold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  ),
);

TypographyH1.displayName = 'TypographyH1';

const TypographyH2 = forwardRef<HTMLHeadingElement, ComponentProps<'h2'>>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        'text-2xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  ),
);

TypographyH2.displayName = 'TypographyH2';

const TypographyH3 = forwardRef<HTMLHeadingElement, ComponentProps<'h3'>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  ),
);

TypographyH3.displayName = 'TypographyH3';

const TypographyH4 = forwardRef<HTMLHeadingElement, ComponentProps<'h4'>>(
  ({ className, children, ...props }, ref) => (
    <h4
      ref={ref}
      className={cn(
        'text-lg font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  ),
);

TypographyH4.displayName = 'TypographyH4';

const TypographyPara = forwardRef<HTMLParagraphElement, ComponentProps<'p'>>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm leading-7', className)} {...props}>
      {children}
    </p>
  ),
);

TypographyPara.displayName = 'TypographyPara';

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyPara,
};
