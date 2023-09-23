import { cn } from '@/utils';
import {
  ChevronRightIcon,
  ChevronsRightIcon,
  DotIcon,
  MinusIcon,
  PlusIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

const separatorIcons = {
  dot: DotIcon,
  minus: MinusIcon,
  plus: PlusIcon,
  chevronRight: ChevronRightIcon,
  chevronDoubleRight: ChevronsRightIcon,
} as const;

type Separator = keyof typeof separatorIcons;

type SeparateProps = {
  className?: string;
  children: ReactNode[] | ReactNode;
  separator: Separator;
  size?: number;
};

export function Separate({
  className,
  children,
  separator,
  size = 12,
}: SeparateProps) {
  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {separateNodes({ children, separator, size })}
    </ul>
  );
}

function separateNodes({
  children: nodes,
  separator,
  size,
}: Omit<SeparateProps, 'className'>) {
  if (!Array.isArray(nodes)) return nodes;

  const filteredNodes = nodes.filter(Boolean);
  const SeparatorIcon = separatorIcons[separator];

  return filteredNodes.map((node, index) => (
    // TODO: index is not ideal but works for now
    <Fragment key={index}>
      <li>{node}</li>
      {index !== filteredNodes.length - 1 && (
        <li aria-hidden>
          {<SeparatorIcon className="align-middle" size={size} />}
        </li>
      )}
    </Fragment>
  ));
}
