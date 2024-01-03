import React, { useContext, createContext } from "react";
import type { Tokens, Radius } from "../../tokens";

/**
 * Dummy function to throw an error when theme is not provided by a ThemeProvider.
 * @returns Always throws an error.
 */
const definitionError = (): null => {
  throw new Error('Please make sure "<Theme>" component is wrapping your component.');
};

// Define the properties expected in the context for client groups
export interface ThemeContextProps<T extends string> {
  /** Partial map of theme names to Tokens. */
  tokens?: Partial<Record<T, Tokens>>;
  /** Default theme to be used when no theme is set. */
  defaultTheme?: T;
  /** Current active theme. */
  theme?: T;
  /** Setter function for updating the current active theme. */
  setTheme: React.Dispatch<React.SetStateAction<T | undefined>>;
  /** Setter function for updating the theme tokens. */
  setTokens: React.Dispatch<React.SetStateAction<Partial<Record<T, Tokens>> | undefined>>;
}

function createThemeContext<T extends string>() {
  return createContext<ThemeContextProps<T>>({
    tokens: undefined,
    defaultTheme: undefined,
    theme: undefined,
    setTheme: definitionError,
    setTokens: definitionError,
  });
}

// Default context values to managing themes.
export const ThemeContext = createThemeContext<string>();

/**
 * Hook to conveniently use the theme context.
 *
 * @returns Theme context values.
 */
export function useTheme<T extends string>() {
  return useContext(ThemeContext as React.Context<ThemeContextProps<T>>);
}
