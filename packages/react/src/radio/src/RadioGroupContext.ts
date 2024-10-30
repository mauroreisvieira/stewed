import { useContext, createContext } from "react";

/**
 * Dummy function to throw an error when radio is not provided by a RadioGroupProvider.
 *
 * @returns Always throws an error.
 */
const definitionError = (): null => {
  throw new Error('Please make sure "<Radio.Group>" component is wrapping your component.');
};

export interface RadioGroupContextProps {
  /** The name used to reference the value of the control. */
  name: string;
  /**
   * Sets values of radio selected.
   *
   * @remarks If `checkedValues` is undefined, this component will act as an uncontrolled input.
   * To avoid this, ensure `checkedValues` is either consistently controlled (always defined) or managed properly to handle potential undefined cases.
   */
  checkedValue?: string;
  /**
   * Callback fired when the checked state changes.
   *
   * @param value The new array of selected radio values.
   */
  onCheckedChange?: (value: string) => void;
}

/**
 * Creates a radio group context with the specified generic type.
 *
 * This function initializes a context for managing radio within the application.
 * It provides default value and setters for radio-related operations.
 *
 * @returns A new radio context with the specified generic type.
 */
function createRadioGroupContext() {
  return createContext<RadioGroupContextProps>({
    name: "",
    checkedValue: undefined,
    onCheckedChange: definitionError,
  });
}

/**
 * Default context for managing radio.
 *
 * This context provides functionalities to manage radios across the application.
 * It includes default value and setters for radio-related operations.
 */
export const RadioGroupContext = createRadioGroupContext();

/**
 * Hook to conveniently use the radio context.
 *
 * @returns RadioGroup context value.
 */
export function useRadioGroup() {
  return useContext(RadioGroupContext);
}
