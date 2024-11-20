import { useState, useCallback, useEffect } from "react";
import { useMounted } from "../../use-mounted";

const MASKED_NUMBER = "XMDY";
const MASKED_LETTER = "_";

interface UseInputMaskProps {
  /** Regular expression pattern used to validate the input. */
  pattern: RegExp;
  /**
   * Default value for the input field.
   * @default ""
   */
  defaultValue?: string;
  /** Mask pattern for formatting the input value. */
  mask?: string;
  /** Whether the input field is required. */
  required?: boolean;
  /**
   * Indicates whether a custom data charset should be used for formatting.
   * If `true`, allows alphabetic characters as well as numbers.
   */
  charset?: boolean;
}

interface UseInputMask {
  /** Formatted value of the input based on the mask. */
  value: string;
  /** Indicates whether the input value is valid according to the `pattern`. */
  isValid: boolean;
  setValue: (value: string) => void;
  /** Handler for the `onChange` event to update the input value. */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /** Handler for the `onBlur` event to validate the input on blur. */
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}

/**
 * A utility hook for managing masked input fields with validation.
 *
 * @param {UseInputMaskProps} props - Properties for configuring the input mask behavior.
 * @returns {UseInputMask} - Object containing input management properties and handlers.
 *
 * @example
 * ```ts
 * const { value, value, isValid, onChange, onBlur } = useInputMask({
 *   pattern: /^\d{3}-\d{2}-\d{4}$/,
 *   mask: "XXX-XX-XXXX",
 *   defaultValue: "",
 *   required: true,
 * });
 * ```
 */
export function useInputMask({
  pattern,
  mask,
  defaultValue = "",
  required,
  charset,
}: UseInputMaskProps): UseInputMask {
  const [mounted, setMounted] = useState(false);
  const [maskValue, setMaskValue] = useState<string>("");
  const [isValid, setValid] = useState<boolean>(true);

  const formatValue = useCallback(
    (value: string) => {
      let newValue = "";
      let j = 0; // Pointer to track the position in the stripped value

      // Stripping unwanted characters from the input value based on charset preference
      const strippedValue = charset ? value.replace(/\W/g, "") : value.replace(/\D/g, "");

      // If no mask is provided, return the value as-is
      if (!mask || !strippedValue) {
        return value;
      }

      // Loop through each character in the mask
      for (let i = 0; i < mask.length; i++) {
        // Check if the current character in the stripped value is a number
        const isInt = !isNaN(parseInt(strippedValue[j] as string));

        // Check if the current character in the stripped value is a letter
        const isLetter = strippedValue[j] ? (strippedValue[j] as string).match(/[A-Z]/i) : false;

        // Check if the current mask character is a placeholder for a number or a letter
        const matchesNumber = MASKED_NUMBER.indexOf(mask[i] as string) >= 0;
        const matchesLetter = MASKED_LETTER.indexOf(mask[i] as string) >= 0;

        // If the mask expects a number and the current stripped value character is a number, or
        // the mask expects a letter and the current stripped value character is a letter (with charset)
        if ((matchesNumber && isInt) || (charset && matchesLetter && isLetter)) {
          newValue += strippedValue[j++]; // Add the current stripped value character to the result and move the pointer
        }
        // If the mask expects a specific type and the stripped value character doesn't match, stop formatting
        else if (
          (!charset && !isInt && matchesNumber) ||
          (charset && ((matchesLetter && !isLetter) || (matchesNumber && !isInt)))
        ) {
          return newValue; // Return the partially formatted value if there's a mismatch
        }
        // If the mask doesn't expect a number or letter, add the mask character itself
        else {
          newValue += mask[i];
        }

        // If there are no more characters in the stripped value to process, stop the loop
        if (!strippedValue[j]) {
          break;
        }
      }

      return newValue;
    },
    [charset, mask],
  );

  useEffect(() => {
    // If `maskValue` already exists or there is no `defaultValue`, exit early.
    // This prevents unnecessary processing during initialization or when no default value is provided.
    if (mounted || maskValue || !defaultValue) {
      return;
    }

    // Will ensure if clean input value, will not store the default value again
    setMounted(true);

    // Validate the `defaultValue` against the provided pattern and update the `isValid` state.
    // This ensures that the default value is immediately checked for validity.
    setValid(pattern.test(defaultValue));

    // Format the `defaultValue` using the mask if a mask is provided,
    // or directly set it as the masked value if no mask is applied.
    setMaskValue(mask ? formatValue(defaultValue) : defaultValue);
  }, [mounted, defaultValue, formatValue, mask, maskValue, pattern]);

  const onHandleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const newValue = event.target.value;

      // Format the value using the mask, as formatValue strips unwanted characters
      const formattedValue = mask ? formatValue(newValue) : newValue;

      // Check if the formatted value exceeds the mask length
      if (mask && formattedValue.length > mask.length) {
        return;
      }

      // Check if the formatted value matches the pattern and if it meets the mask length requirement
      const isPatternValid = pattern.test(formattedValue);
      const isLengthValid = mask ? formattedValue.length === mask.length : true;

      // Combine the two validation checks
      const isValid = isPatternValid && isLengthValid;

      // Set validity based on the combined checks
      setValid(isValid);

      // If a mask is defined, set the formatted value; otherwise, keep it unformatted
      setMaskValue(formattedValue);
    },
    [formatValue, mask, pattern],
  );

  const onHandleBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const { value } = event.target;

      // If the value is empty, check if the field is required
      if (value.length === 0) {
        setValid(!required);
      } else {
        // If a pattern is provided, validate the value against the pattern
        setValid(pattern ? pattern.test(value) : true);
      }
    },
    [pattern, required],
  );

  return {
    value: maskValue,
    setValue: (value) => setMaskValue(formatValue(value)),
    onChange: onHandleChange,
    onBlur: onHandleBlur,
    isValid,
  };
}
