import { useRef, useEffect } from 'react';

/**
 * A custom React hook that returns the previous value of the input value.
 *
 * @param value The current value to track.
 * @returns The previous value.
 *
 * @example
 * ```typescript
 * const previousCount = usePrevious(count);
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
