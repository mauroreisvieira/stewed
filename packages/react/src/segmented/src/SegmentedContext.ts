import { use, createContext, type Context } from "react";

/**
 * Dummy function to throw an error when segmented is not provided by a SegmentedProvider.
 *
 * @returns Always throws an error.
 */
const definitionError = (): null => {
  throw new Error('Please make sure "<Segmented>" component is wrapping your component.');
};

/**
 * Defines the properties expected in the context for segmented.
 *
 * @template T - The type representing segmented value.
 */
export interface SegmentedContextProps<T extends string> {
  /** Sets value of segmented item selected. */
  value: T | undefined;
  /** Callback fired when the value changes. */
  onValueChange?: (value: T) => void;
}

/**
 * Creates a segmented context with the specified generic type.
 *
 * This function initializes a context for managing segmented within the application.
 * It provides default values and setters for segmented-related operations.
 *
 * @template T - The type representing segmented.
 * @returns A new segmented context with the specified generic type.
 */
function createSegmentedContext<T extends string>() {
  return createContext<SegmentedContextProps<T>>({
    value: undefined,
    onValueChange: definitionError
  });
}

/**
 * Default context for managing segmented.
 *
 * This context provides functionalities to manage segmented across the application.
 * It includes default values and setters for segmented-related operations.
 */
export const SegmentedContext = createSegmentedContext();

/**
 * Hook to conveniently use the segmented context.
 *
 * @returns Segmented context values.
 */
export function useSegmented<T extends string>() {
  return use(SegmentedContext as unknown as Context<SegmentedContextProps<T>>);
}
