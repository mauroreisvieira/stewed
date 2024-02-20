import React, { useState } from "react";
// UI Components
import { Root, type RootProps } from "./Root";
// Tokens
import { defaultTokens } from "@stewed/tokens";
// Types
import { type ThemeContextProps, ThemeContext } from "./ThemeContext";

export interface ThemeProps<T extends string> extends RootProps<T> {}

/**
 * Theme component for managing themes in the application.
 *
 * @param {ThemeProps<T>} props - Props for the Theme component.
 * @returns {React.ReactElement} - React element representing the themed application.
 */
export function Theme<T extends string>({
  defaultTheme,
  tokens,
  ...props
}: ThemeProps<T>): React.ReactElement {
  // State for managing tokens
  const [currentTokens, setCurrentTokens] = useState<ThemeContextProps<T>["tokens"]>(
    tokens
      ? tokens
      : {
          default: defaultTokens,
        },
  );

  // State for managing the current theme
  const [theme, setTheme] = useState<T | "default">(defaultTheme || "default");

  return (
    <ThemeContext.Provider
      value={{
        defaultTheme,
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
