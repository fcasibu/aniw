'use client';

import { ImageOff } from 'lucide-react';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { useState } from 'react';

export function ImageWithFallback({ alt, ...props }: ImageProps) {
  const [error, setError] = useState(false);

  return !error ? (
    <Image {...props} alt={alt} onError={() => setError(true)} />
  ) : (
    <div className="h-full w-full bg-slate-800 brightness-75">
      <ImageOff aria-hidden className="inset-center opacity-25" size={100} />
    </div>
  );
}
