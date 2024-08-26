import { useContext, createContext } from "react";

/**
 * Dummy function to throw an error when checkbox is not provided by a CheckboxGroupProvider.
 *
 * @returns Always throws an error.
 */
const definitionError = (): null => {
  throw new Error('Please make sure "<Checkbox.Group>" component is wrapping your component.');
};

export interface CheckboxGroupContextProps {
  /** Sets values of checkbox selected. */
  checkedValues?: string[];
  /** Callback fired when the checked state changes. */
  onCheckedChange?: (value: string[]) => void;
}

/**
 * Creates a checkbox group context with the specified generic type.
 *
 * This function initializes a context for managing checkbox within the application.
 * It provides default value and setters for checkbox-related operations.
 *
 * @returns A new checkbox context with the specified generic type.
 */
function createCheckboxGroupContext() {
  return createContext<CheckboxGroupContextProps>({
    checkedValues: undefined,
    onCheckedChange: definitionError,
  });
}

/**
 * Default context for managing checkbox.
 *
 * This context provides functionalities to manage checkboxs across the application.
 * It includes default value and setters for checkbox-related operations.
 */
export const CheckboxGroupContext = createCheckboxGroupContext();

/**
 * Hook to conveniently use the checkbox context.
 *
 * @returns CheckboxGroup context value.
 */
export function useCheckboxGroup() {
  return useContext(CheckboxGroupContext);
}
