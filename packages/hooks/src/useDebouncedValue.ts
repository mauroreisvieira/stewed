import { useState, useEffect } from "react";

/**
 * Hook that debounces a value before updating it.
 *
 * @template T - The type of the value being debounced.
 *
 * @param value - The current value that needs to be debounced.
 * @param setValue - The function to update the debounced value after the delay.
 * @returns A tuple containing the debounced value and a function to set the debounced value.
 */
export function useDebouncedValue<T>(value: T, setValue: (val: T) => void): [T, (val: T) => void] {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    if (debounceValue !== value) {
      const timeout = setTimeout(() => setValue(debounceValue), 250);
      return () => clearTimeout(timeout);
    }
    return void 0;
  }, [debounceValue, setValue, value]);

  useEffect(() => {
    setDebounceValue(value);
  }, [value]);

  return [debounceValue, setDebounceValue];
}
