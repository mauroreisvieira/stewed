import React, { useContext, createContext } from "react";

/**
 * Dummy function to throw an error when tab is not provided by a TabsProvider.
 *
 * @returns Always throws an error.
 */
const definitionError = (): null => {
  throw new Error('Please make sure "<Tabs>" component is wrapping your component.');
};

/**
 * Defines the properties expected in the context for tabs.
 *
 * @template T - The type representing tab value.
 */
export interface TabsContextProps<T extends string> {
  /** Sets value of tab item selected. */
  value: T | undefined;
  /** Callback fired when the value changes. */
  onValueChange?: (value: T) => void;
}

/**
 * Creates a tab context with the specified generic type.
 *
 * This function initializes a context for managing tabs within the application.
 * It provides default values and setters for tab-related operations.
 *
 * @template T - The type representing tabs.
 * @returns A new tab context with the specified generic type.
 */
function createTabsContext<T extends string>() {
  return createContext<TabsContextProps<T>>({
    value: undefined,
    onValueChange: definitionError,
  });
}

/**
 * Default context for managing tabs.
 *
 * This context provides functionalities to manage tabs across the application.
 * It includes default values and setters for tab-related operations.
 */
export const TabsContext = createTabsContext();

/**
 * Hook to conveniently use the tab context.
 *
 * @returns Tabs context values.
 */
export function useTabs<T extends string>() {
  return useContext(TabsContext as unknown as React.Context<TabsContextProps<T>>);
}
