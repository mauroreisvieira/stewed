import React, { useEffect, useMemo, useState } from "react";
// UI Components
import { Root } from "./Root";
// Tokens
import { type Tokens, defaultTokens } from "@stewed/tokens";
// Context
import { ThemeContext, type ThemeContextProps } from "./ThemeContext";
// Utilities
import { objectKeys } from "@stewed/utilities";

export interface ThemeProps<T extends string = "default">
  extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Set the default theme to be used when no theme is set.
   * @remarks This prop is uncontrolled, meaning the component will manage its own internal state for the default theme.
   * If you provide a value, it will be used as the initial default theme.
   */
  defaultTheme?: ThemeContextProps<T>["defaultTheme"];
  /**
   * Set the current active theme.
   * @remarks This prop is controlled, meaning the parent component manages the theme state by providing the 'theme' value.
   * If this prop is provided, the component will reflect the current theme specified by the parent.
   */
  theme?: ThemeContextProps<T>["theme"];
  /** Map of theme names to tokens. */
  tokens?: ThemeContextProps<T>["tokens"];
}

/**
 * A Theme component allows you to manage various objects that define your application's colors, spacing, fonts, and more in a coherent and organized manner.
 *
 * @template T - The type of theme to be used.
 * @param {ThemeProps<T>} props - Props for the Theme component.
 * @returns {React.ReactElement} - React element representing the themed application.
 */
export function Theme<T extends string>({
  defaultTheme,
  theme: activeTheme,
  tokens: currentTokens,
  ...props
}: ThemeProps<T>): React.ReactElement {
  // State for managing the current theme
  const [theme, setTheme] = useState<string | undefined>(activeTheme || defaultTheme);

  // State for managing tokens
  const [tokens, setTokens] = useState<ThemeContextProps<T>["tokens"]>(currentTokens);

  // Updates the theme state to the currently active theme.
  useEffect(() => {
    // If `activeTheme` is null or undefined, the code inside the if block will not execute.
    if (!activeTheme) return;

    // If `activeTheme` is present, then the `setTheme` function is called with `activeTheme`.
    setTheme(activeTheme);
  }, [activeTheme]);

  // Merge default tokens with theme-specific tokens
  const activeToken = useMemo(() => {
    return objectKeys(defaultTokens).reduce((acc, key) => {
      acc[key] = {
        ...defaultTokens[key],
        ...(tokens?.[theme as T]?.[key] ?? {}),
      };
      return acc;
    }, {} as Tokens);
  }, [theme, tokens]);

  return (
    <ThemeContext.Provider
      value={{
        defaultTheme,
        activeToken,
        theme,
        setTheme,
        tokens,
        setTokens,
      }}>
      {/* Root component to which the themed styles are applied */}
      <Root {...props} />
    </ThemeContext.Provider>
  );
}
