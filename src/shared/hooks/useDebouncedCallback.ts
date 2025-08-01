import { useRef, useCallback } from 'react';

export const useDebouncedCallback = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay = 200,
): T => {
  const timer = useRef<number>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedFn as T;
};
