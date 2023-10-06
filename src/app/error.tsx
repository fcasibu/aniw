'use client';

import { TypographyH1 } from '@/components';

export default function Error() {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-3">
      <TypographyH1 className="text-zinc-200">
        Something went wrong on our end
      </TypographyH1>
    </section>
  );
}
