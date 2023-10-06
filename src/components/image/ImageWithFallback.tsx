'use client';

import { ImageOff } from 'lucide-react';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { useState } from 'react';

export function ImageWithFallback({ alt, ...props }: ImageProps) {
  const [error, setError] = useState(false);
  const width = Number(props.width || 100);

  return !error ? (
    <Image {...props} alt={alt} onError={() => setError(true)} />
  ) : (
    <div className="absolute h-full w-full bg-slate-800 brightness-75">
      <ImageOff
        aria-hidden
        className="inset-center opacity-25"
        size={width / 2}
      />
    </div>
  );
}
