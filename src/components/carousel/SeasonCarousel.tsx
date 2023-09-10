'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { SeasonNow } from '@/features';
import { Play } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import { AniLink, Button, ImageWithFallback } from '..';

const AUTOPLAY_DELAY_IN_MS = 7000;

export type CarouselProps = {
  carouselItems: SeasonNow[];
};

export function SeasonCarousel({ carouselItems }: CarouselProps) {
  return (
    <Swiper
      modules={[A11y, Autoplay, Pagination]}
      autoplay={{
        delay: AUTOPLAY_DELAY_IN_MS,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{
        enabled: true,
        clickable: true,
        bulletClass: '!bg-white swiper-pagination-bullet',
        // clickable must be true
        clickableClass:
          'absolute !left-auto !-right-8 !w-fit !rotate-90 !bottom-8 !origin-top',
      }}
      grabCursor
      loop
      shortSwipes
      className="relative"
    >
      {carouselItems.map((item, index) => (
        <SwiperSlide key={item.title} className="relative text-white">
          <div className="relative aspect-video max-h-[35rem] min-h-[20rem] w-full">
            <div className="bg absolute z-10 h-full w-full bg-gradient-to-r from-black from-15% opacity-90" />
            <ImageWithFallback
              aria-hidden
              priority={index === 0}
              src={item.images.webp.large_image_url}
              alt=""
              fill
              className="select-none object-cover"
            />
          </div>
          <div className="absolute bottom-6 left-4 z-10 flex max-w-xs flex-col gap-3">
            <div className="select-none">
              <h2 className="line-clamp-2 text-xl font-bold">{item.title}</h2>
              <p className="line-clamp-2 text-sm">{item.synopsis}</p>
            </div>
            <Button asChild>Hi</Button>
            <AniLink
              href={item.url}
              className="gap-1 self-start py-1 font-bold uppercase"
            >
              <Play className="fill-current" aria-hidden />
              <span>Play Now</span>
            </AniLink>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
