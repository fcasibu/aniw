import type { DynamicOptions } from 'next/dynamic';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// ref: https://github.com/facebook/react/issues/14603
export function dynamicImport<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ComponentType<any>,
  I extends Record<K, T>,
  K extends keyof I,
>(
  factory: () => Promise<I>,
  modules: Record<K, DynamicOptions<I> | null>,
): Record<K, T> {
  const entries = Object.entries(modules) as [K, DynamicOptions<I>][];
  return Object.create(
    entries.reduce(
      (result, [name, options]) => ({
        ...result,
        [name]: dynamic(() => factory().then((mod) => mod[name]), {
          ...options,
        }),
      }),
      {},
    ),
  );
}
