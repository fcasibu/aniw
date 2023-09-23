import { breakpoints } from '@/utils';
import { useEffect, useState } from 'react';
import { useOnWindowResize } from 'rooks';

export function useMatchWindowSize(breakpoint: keyof typeof breakpoints) {
  const [isMatch, setIsMatch] = useState(false);

  const handleResize = () => {
    const matches = window.matchMedia(breakpoints[breakpoint])?.matches;
    if (matches === isMatch) return;

    setIsMatch(matches);
  };

  useEffect(() => {
    setIsMatch(window.matchMedia(breakpoints[breakpoint])?.matches);
  }, [breakpoint]);

  useOnWindowResize(handleResize);

  return isMatch;
}
