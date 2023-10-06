import { SeasonCarousel, SmallCardsTabs, TopAnimeCards } from '@/components';
import { getJustCompleted, getNewReleases, getSeasonNow } from '@/features';
import { presence } from '@/utils';

export default async function Home() {
  const [seasonNow, newReleases, justCompleted] = await Promise.all([
    getSeasonNow(),
    getNewReleases(),
    getJustCompleted(),
  ]);

  return (
    <>
      <section>
        <SeasonCarousel carouselItems={presence(seasonNow.data, [])} />
      </section>

      <section className="px-3">
        <TopAnimeCards />
      </section>

      <section className="px-3">
        <SmallCardsTabs
          tabs={[
            { title: 'New Releases', data: newReleases.data },
            { title: 'Just Completed', data: justCompleted.data },
          ]}
        />
      </section>
    </>
  );
}
