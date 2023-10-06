import { cn } from '@/utils';
import { Slot } from '@radix-ui/react-slot';
import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

type SkeletonProps = Partial<{
  asChild: boolean;
  count: number;
  rounded: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  isLoading: boolean;
  aspectRatio: string;
  skeletonWidth: number;
  skeletonHeight: number;
}> &
  ComponentPropsWithoutRef<'div'>;

const roundedStyling = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (inProps, ref) => {
    const {
      count = 1,
      rounded = 'md',
      isLoading,
      aspectRatio,
      skeletonWidth: width,
      skeletonHeight: height,
      className,
      children,
      asChild = false,
      ...props
    } = inProps;

    const Component = asChild ? Slot : 'div';
    return (
      <>
        {Array.from({ length: count }, (_, i) => (
          <Component
            key={i}
            ref={ref}
            {...(!isLoading && { ...props })}
            {...(isLoading && {
              'aria-hidden': 'true',
              'data-loading': isLoading,
              tabIndex: -1,
              style: {
                aspectRatio,
                width: width && `${width}px`,
                height: height && `${height}px`,
              },
            })}
            className={cn(className, {
              [`animate-pulse cursor-wait select-none !bg-zinc-900 [&>*]:invisible ${roundedStyling[rounded]}`]:
                isLoading,
            })}
          >
            {children}
          </Component>
        ))}
      </>
    );
  },
);

Skeleton.displayName = 'Skeleton';
