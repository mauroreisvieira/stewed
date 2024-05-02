import React, { useMemo, useState } from "react";
// UI Components
import { Root, type RootProps } from "./Root";
// Tokens
import { type Tokens, defaultTokens } from "@stewed/tokens";
// Context
import { ThemeContext, type ThemeContextProps } from "./ThemeContext";
// Utilities
import { objectKeys } from "@stewed/utilities";

export interface ThemeProps<T extends string = "default"> extends RootProps<T> {}

/**
 * A Theme component allows you to manage various objects that define your application's colors, spacing, fonts, and more in a coherent and organized manner.
 *
 * @template T - The type of theme to be used.
 * @param {ThemeProps<T>} props - Props for the Theme component.
 * @returns {React.ReactElement} - React element representing the themed application.
 */
export function Theme<T extends string = "default">({
  defaultTheme,
  tokens,
  ...props
}: ThemeProps<T>): React.ReactElement {
  // State for managing the current theme
  const [theme, setTheme] = useState<T | string>(defaultTheme || "default");

  // State for managing tokens
  const [currentTokens, setCurrentTokens] = useState<ThemeContextProps<T>["tokens"]>(tokens);

  // Merge default tokens with theme-specific tokens
  const activeToken = useMemo(
    () =>
      objectKeys(defaultTokens).reduce((acc, key) => {
        acc[key] = {
          ...defaultTokens[key],
          ...(tokens?.[theme as T]?.[key] ?? {}),
        };
        return acc;
      }, {} as Tokens),
    [theme, tokens],
  );

  return (
    <ThemeContext.Provider
      value={{
        defaultTheme,
        activeToken,
        theme,
        setTheme,
        tokens: currentTokens,
        setTokens: setCurrentTokens,
      }}
    >
      {/* Root component to which the themed styles are applied */}
      <Root {...props} />
    </ThemeContext.Provider>
  );
}
