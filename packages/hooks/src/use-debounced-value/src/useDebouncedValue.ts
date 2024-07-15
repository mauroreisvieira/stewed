import { useState, useEffect } from "react";

/**
 * Hook that debounces a value before updating it.
 *
 * @example
 * ```ts
 *  const [inputValue, setInputValue] = useState("");
 *  const debouncedValue = useDebouncedValue(inputValue, setInputValue);
 * ```
 *
 * @template T - The type of the value being debounced.
 *
 * @param value - The current value that needs to be debounced.
 * @param setValue - The function to update the debounced value after the delay.
 * @returns The debounced value.
 */
export function useDebouncedValue<T>(value: T, setValue: (val: T) => void): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update the debounced value after a delay if the value changes.
    if (debouncedValue !== value) {
      const timeoutId = setTimeout(() => setValue(debouncedValue), 250);
      return () => clearTimeout(timeoutId); // Clear timeout on cleanup to prevent memory leaks.
    }

    // Cleanup function for when dependency values are unchanged.
    return undefined;
  }, [debouncedValue, setValue, value]);

  // Update the debounced value whenever the original value changes.
  useEffect(() => {
    setDebouncedValue(value);
  }, [value]);

  return debouncedValue;
}
