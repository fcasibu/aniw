import type { Anime } from '@/features';
import { SearchItem } from '../header/SearchItem';

type SmallCardsProps = {
  newReleases: Anime[];
};

export async function SmallCards({ newReleases }: SmallCardsProps) {
  return (
    <ul className="grid gap-2 md:grid-cols-2">
      {newReleases.map((newRelease) => (
        <li
          key={newRelease.title}
          className="bg-zinc-900 p-2 hover:bg-zinc-800 motion-safe:transition-colors"
        >
          <SearchItem {...newRelease} />
        </li>
      ))}
    </ul>
  );
}
