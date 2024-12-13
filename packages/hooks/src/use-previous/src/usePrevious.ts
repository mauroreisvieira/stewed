import { useEffect, useRef } from "react";

/**
 * Hook that returns the previous value.
 *
 * @example
 * ```ts
 * const previousCount = usePrevious(count);
 * ```
 *
 * @params value - The current value to track.
 * @returns The previous value.
 */
export function usePrevious<T>(value: T): T | null {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // eslint-disable-next-line react-compiler/react-compiler
  return ref.current;
}
