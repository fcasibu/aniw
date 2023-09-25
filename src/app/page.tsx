import { SeasonCarousel, TopAnimeCards } from '@/components';
import { getSeasonNow } from '@/features';

export default async function Home() {
  const { data: seasonNow } = await getSeasonNow();

  return (
    <>
      <section>
        <SeasonCarousel carouselItems={seasonNow ?? []} />
      </section>
      <section className="px-3">
        <TopAnimeCards />
      </section>
    </>
  );
}
