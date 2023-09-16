import { cn } from '@/utils';
import { DotIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

export const DotSeparator = forwardRef<
  SVGSVGElement,
  ComponentProps<'svg'> & { size?: number }
>(({ className, size, ...props }, ref) => (
  <DotIcon
    aria-hidden
    size={size}
    {...props}
    ref={ref}
    className={cn('align-middle', className)}
  />
));

DotSeparator.displayName = 'DotSeparator';
