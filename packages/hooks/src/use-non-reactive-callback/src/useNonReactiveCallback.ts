import { useCallback, useInsertionEffect, useRef } from "react";

/**
 * A hook to create a callback function that remains referentially stable
 * across renders but always executes the most recent implementation of
 * the provided function.
 *
 * @remarks
 * This hook should be used sparingly as it bypasses React's reactivity model.
 * When the inputs to the callback change, the returned function remains the same,
 * potentially causing issues where components or hooks depending on reactivity
 * might not update as expected.
 *
 * Additionally, avoid calling the returned function during the render phase
 * as the values it captures may not reflect the most up-to-date state.
 *
 * @typeParam T - The type of the function being passed.
 *
 * @param fn - The function whose stable reference is required.
 * @returns A stable callback function that always executes the latest version of `fn`.
 */
export function useNonReactiveCallback<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T
): T {
  // Store the function in a ref to ensure we can always access the latest version.
  const ref = useRef(fn);

  // Update the ref's current value whenever the function changes.
  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);

  // Return a stable callback that always invokes the latest function stored in the ref.
  return useCallback((...args: Parameters<T>): ReturnType<T> => {
    return ref.current(...args);
  }, []) as T;
}
