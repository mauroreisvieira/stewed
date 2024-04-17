import { useState, useEffect } from "react";

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
