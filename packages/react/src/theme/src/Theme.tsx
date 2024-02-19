import React, { useState } from "react";
// UI Components
import { Root, type RootProps } from "./Root";
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
  tokens: defaultTokens,
  ...props
}: ThemeProps<T>): React.ReactElement {
  // State for managing tokens
  const [tokens, setTokens] = useState<ThemeContextProps<T>["tokens"]>(defaultTokens);

  // State for managing the current theme
  const [theme, setTheme] = useState<T | string>(defaultTheme || "default");

  return (
    <ThemeContext.Provider
      value={{
        defaultTheme,
        theme,
        tokens,
        setTheme,
        setTokens,
      }}
    >
      {/* Root component to which the themed styles are applied */}
      <Root {...props} />
    </ThemeContext.Provider>
  );
}
