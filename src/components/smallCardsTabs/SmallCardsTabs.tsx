import type { Anime } from '@/features';
import type { Maybe } from '@/types';
import { presence, transformToId } from '@/utils';
import { ArrowRightIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  AniLink,
  SmallCards,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TypographyH3,
} from '..';

type Tab = {
  title: string;
  data: Maybe<Anime[]>;
};

type SmallCardsTabsProps = {
  tabs: Tab[];
};

export function SmallCardsTabs({ tabs }: SmallCardsTabsProps) {
  return (
    <Tabs defaultValue={transformToId(tabs[0].title)}>
      <TabsList className="w-full [&>*]:w-full">
        {tabs.map(({ title }) => (
          <TabsTrigger key={transformToId(title)} value={transformToId(title)}>
            {title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(({ title, data }) => (
        <TabsContent key={transformToId(title)} value={transformToId(title)}>
          <HeadingText>{title}</HeadingText>
          <SmallCards newReleases={presence(data, [])} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function HeadingText({ children }: { children: ReactNode }) {
  return (
    <TypographyH3>
      <AniLink
        href="/"
        variant="link"
        className="mb-2 text-xl font-semibold text-white"
        size={null}
      >
        {children}
        <ArrowRightIcon aria-hidden size={20} />
      </AniLink>
    </TypographyH3>
  );
}
