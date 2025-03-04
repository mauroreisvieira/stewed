import { useState, useEffect } from "react";

/**
 * Interface for the properties used in the `useDebouncedValue` hook.
 *
 * @template T - The type of the value being debounced.
 */
export interface IUseDebouncedValueProps<T> {
  /** The value to be debounced. */
  value: T;
  /**
   * The delay in milliseconds before updating the debounced value.
   * @default 150
   */
  delayMs?: number;
}

/**
 * Hook that debounces a value before updating it.
 *
 * @template T - The type of the value being debounced.
 *
 * @param {IUseDebouncedValueProps<T>} props - The debounce configuration object.
 * @returns The debounced value.
 *
 * @example
 * ```ts
 *  const [inputValue, setInputValue] = useState("");
 *  const debouncedValue = useDebouncedValue({ value: inputValue});
 * ```
 */
export function useDebouncedValue<T>({ value, delayMs = 150 }: IUseDebouncedValueProps<T>): T {
  // Debounce value state will be
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Update the debounced value after a delay if the value changes.
      setDebouncedValue(value);
    }, delayMs);

    // Clear timeout on cleanup to prevent memory leaks.
    return () => clearTimeout(timeoutId);
  }, [value, delayMs]);

  return debouncedValue;
}
