import { useState, useCallback, type HTMLAttributes, type ChangeEvent } from "react";

/** The value type of the input field. */
export type UseInputValue = HTMLAttributes<HTMLInputElement>["defaultValue"];

/** A hook for handling input values with type safety, including change handling, validation, and formatting. */
interface UseInputHandler<T> {
  /**
   * Event handler to handle input changes.
   * @param event - The change event object.
   */
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** The current value of the input field. */
  value: T;
  /**
   * Function to set a new value.
   * @param newValue - The new value.
   */
  setValue: (newValue: T) => void;
  /** Indicates whether the current value is valid. */
  isValid: boolean;
}

/** Props for the `useInput` hook, managing input value, change handling, validation, and formatting. */
export interface UseInputProps<T> {
  /**
   * Validation function to validate the new value.
   *
   * @param newValue - The new value being set.
   * @param currentValue - The current value of the input field.
   * @returns A boolean indicating whether the new value is valid.
   */
  validate?: (newValue: T, currentValue: T) => boolean;
}

/**
 * Hook for managing input state and validation.
 *
 * @param initialValue - The initial value of the input field.
 * @param options - Additional options for customizing behavior.
 * @returns An object containing event handler and value for the input field.
 */
export function useInput<T extends UseInputValue>(
  initialValue: T,
  { validate = () => true }: UseInputProps<T> = {}
): UseInputHandler<T> {
  // State for the current value of the input field
  const [currentValue, setCurrentValue] = useState<T>(initialValue);

  // State to track the validity of the current value
  const [isValid, setValid] = useState<boolean>(true);

  // Function to set a new value for the input field.
  const onUpdateValue = useCallback(
    (newValue: T) => {
      // Validate the value if a validation function is provided
      const valid = validate?.(newValue, currentValue);

      if (valid) {
        // Update the current value if the new value is valid
        setCurrentValue(newValue);
      }

      // Update valid state
      setValid(!!valid);
    },
    [currentValue, validate]
  );

  // Handles input change events.
  const onHandleChange: UseInputHandler<T>["onChange"] = useCallback(
    (event) => {
      const newValue = event.target.value as T;
      // Validated and update value
      onUpdateValue(newValue);
    },
    [onUpdateValue]
  );

  return {
    onChange: onHandleChange,
    setValue: onUpdateValue,
    value: currentValue,
    isValid
  };
}
