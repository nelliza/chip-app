import { RefObject, useCallback, useEffect, useState } from 'react';

import { useDebouncedCallback } from 'shared/hooks';
import { ChipData } from 'types';

interface Props {
  chips: ChipData[];
  chipRefs: RefObject<(HTMLDivElement | null)[]>;
  containerRef: RefObject<HTMLDivElement | null>;
  moreButtonWidth: number;
}

export const useVisibleCount = ({
  chips,
  chipRefs,
  containerRef,
  moreButtonWidth,
}: Props) => {
  const [visibleCount, setVisibleCount] = useState(chips.length);

  const updateVisibleCount = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;

    let usedWidth = 0;
    let count = 0;

    for (let i = 0; i < chips.length; i++) {
      const chipEl = chipRefs.current[i];

      if (!chipEl) continue;

      const chipGap =
        parseInt(getComputedStyle(containerRef.current).gap, 10) || 0;
      const chipWidth = chipEl.offsetWidth + chipGap;

      if (usedWidth + chipWidth + moreButtonWidth <= containerWidth) {
        usedWidth += chipWidth;
        count++;
      } else {
        break;
      }
    }

    setVisibleCount(count);
  }, [chips.length, chipRefs, containerRef, moreButtonWidth]);

  const debouncedUpdateVisibleCount = useDebouncedCallback(updateVisibleCount);

  useEffect(() => {
    updateVisibleCount();
  }, [updateVisibleCount]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(debouncedUpdateVisibleCount);
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [containerRef, debouncedUpdateVisibleCount]);

  return visibleCount;
};
