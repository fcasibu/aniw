import { AniLink, TypographyH1, TypographyPara } from '@/components';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-3">
      <TypographyH1 className="text-neutral-200">Not Found</TypographyH1>
      <TypographyPara className="text-neutral-400">
        Could not find requested resource
      </TypographyPara>
      <AniLink href="/" className="group gap-1" size="sm">
        <ArrowLeft
          aria-hidden
          size={24}
          className="motion-safe:group-hover:animate-bounce-horizontal-left motion-safe:group-focus:animate-bounce-horizontal-left motion-reduce:group-hover:-translate-x-1 motion-reduce:group-focus-visible:-translate-x-1"
        />
        <span>Return Home</span>
      </AniLink>
    </section>
  );
}
