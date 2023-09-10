import { SeasonCarousel } from '@/components';
import { getSeasonNow } from '@/features';

export default async function Home() {
  const seasonNow = await getSeasonNow();

  return <SeasonCarousel carouselItems={seasonNow ?? []} />;
}
