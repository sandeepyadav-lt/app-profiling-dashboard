import { useMemo } from 'react';

export function useStaggeredEntry(index: number, delayMs = 50): React.CSSProperties {
  return useMemo(
    () => ({
      animation: `fadeInUp 0.4s var(--easing-default) both`,
      animationDelay: `${index * delayMs}ms`,
    }),
    [index, delayMs],
  );
}
