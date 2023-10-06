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
  names: K[],
  options: DynamicOptions<I> = {},
): Record<K, T> {
  return Object.create(
    names.reduce(
      (modules, name) => ({
        ...modules,
        [name]: dynamic(() => factory().then((mod) => mod[name]), {
          ...options,
        }),
      }),
      {},
    ),
  );
}
