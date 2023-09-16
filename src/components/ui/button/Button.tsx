import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';
import type { ButtonHTMLAttributes} from 'react';
import { forwardRef } from 'react';

export const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-purple-950 dark:focus-visible:ring-purple-300 motion-reduce:transition-none',
  {
    variants: {
      variant: {
        default:
          'bg-purple-800 text-purple-50 focus-visible:bg-purple-800/80 hover:bg-purple-800/80 dark:bg-purple-50 dark:text-purple-900 dark:focus-visible:bg-purple-50/80 dark:hover:bg-purple-50/80',
        destructive:
          'bg-red-500 text-purple-50 focus-visible:bg-red-500/80 hover:bg-red-500/80 dark:bg-red-900 dark:text-purple-50 dark:focus-visible:bg-red-900/80 dark:hover:bg-red-900/80',
        outline:
          'border border-white focus-visible:bg-purple-100 hover:bg-purple-100 focus-visible:text-purple-900 hover:text-purple-900 dark:border-purple-800 dark:hover:bg-purple-800 dark:focus-visible:bg-purple-800 dark:focus-visible:text-purple-50 dark:hover:text-purple-50',
        secondary:
          'bg-zinc-800 text-zinc-50 focus-visible:bg-purple-800 hover:bg-purple-800 dark:bg-zinc-50 dark:text-zinc-800 dark:focus-visible:bg-purple-800/80 dark:hover:bg-purple-800/80 dark:focus-visible:text-purple-50 dark:hover:text-purple-50',
        ghost:
          'focus-visible:bg-purple-100 hover:bg-purple-100 focus-visible:text-purple-900 hover:text-purple-900 dark:focus-visible:bg-purple-800 dark:hover:bg-purple-800 dark:focus-visible:text-purple-50 dark:hover:text-purple-50',
      },
      size: {
        default: 'rounded-md px-4 py-1',
        sm: 'rounded-md px-3 py-2',
        lg: 'rounded-md px-8 py-3',
        pill: 'rounded-full px-4 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
