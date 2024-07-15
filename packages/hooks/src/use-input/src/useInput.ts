import React, { useState, useEffect, useCallback } from "react";

/** The value type of the input field. */
export type UseInputValue = React.HTMLAttributes<HTMLInputElement>["defaultValue"];

interface UseInputHandler<T> {
  /**
   * Event handler to handle input changes.
   * @param event The change event object.
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** The current value of the input field. */
  value: T;
}

export interface UseInputOptions<T> {
  /**
   * Validation function to validate the new value.
   * @param newValue The new value being set.
   * @param currentValue The current value of the input field.
   * @returns A boolean indicating whether the new value is valid.
   */
  validate?: (newValue: T, currentValue: T) => boolean;
}

/**
 * Custom hook for managing input state and validation.
 *
 * @param initialValue The initial value of the input field.
 * @param options Additional options for customizing behavior.
 * @returns An object containing event handler and value for the input field.
 */
export function useInput<T extends UseInputValue>(
  initialValue: T,
  { validate }: UseInputOptions<T> = {},
): UseInputHandler<T> {
  const [value, setValue] = useState<T>(initialValue);

  /**
   * Handles input change events.
   * @param event The change event object.
   */
  const onHandleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value as T;
      let shouldUpdate = true;

      if (validate) {
        shouldUpdate = validate(newValue, value);
      }

      if (shouldUpdate) setValue(newValue);
    },
    [validate, value],
  );

  // Reset value when initialValue changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    onChange: onHandleChange,
    value,
  };
}
