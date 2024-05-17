import React, { useContext, createContext } from "react";
import type { Tokens } from "@stewed/tokens";

/**
 * Dummy function to throw an error when theme is not provided by a ThemeProvider.
 *
 * @returns Always throws an error.
 */
const definitionError = (): null => {
  throw new Error('Please make sure "<Theme>" component is wrapping your component.');
};

/**
 * Defines the properties expected in the context for client groups.
 *
 * @template T - The type representing theme names.
 */
export interface ThemeContextProps<T extends string> {
  /** Default theme to be used when no theme is set. */
  defaultTheme?: T | "default";
  /** Current active theme. */
  theme?: T | "default";
  /** Partial map of theme names to tokens. */
  tokens?: Partial<Record<T, Tokens>>;
  /** Currently selected token. */
  activeToken: Tokens;
  /** Setter function for updating the current active theme. */
  setTheme: React.Dispatch<React.SetStateAction<ThemeContextProps<T>["theme"]>>;
  /** Setter function for updating the theme tokens. */
  setTokens: React.Dispatch<React.SetStateAction<Partial<Record<T, Tokens>> | undefined>>;
}

/**
 * Creates a theme context with the specified generic type.
 *
 * This function initializes a context for managing themes within the application.
 * It provides default values and setters for theme-related operations.
 *
 * @template T - The type representing themes.
 * @returns A new theme context with the specified generic type.
 */
function createThemeContext<T extends string>() {
  return createContext<ThemeContextProps<T>>({
    theme: "default",
    defaultTheme: undefined,
    tokens: undefined,
    activeToken: {},
    setTheme: definitionError,
    setTokens: definitionError,
  });
}

/**
 * Default context for managing themes.
 *
 * This context provides functionalities to manage themes across the application.
 * It includes default values and setters for theme-related operations.
 */
export const ThemeContext = createThemeContext<string>();

/**
 * Hook to conveniently use the theme context.
 *
 * @returns Theme context values.
 */
export function useTheme<T extends string>() {
  return useContext(ThemeContext as React.Context<ThemeContextProps<T>>);
}
