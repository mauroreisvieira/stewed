import React, { useEffect, useMemo, useState } from "react";
// UI Components
import { Root, type RootProps } from "./Root";
// Tokens
import { defaultTokens, type Tokens } from "@stewed/tokens";
// Context
import { ThemeContext, type ThemeContextProps } from "./ThemeContext";
// Utilities
import { objectKeys } from "@stewed/utilities";

/**
 * Represents the properties for a theme configuration.
 *
 * This interface extends a subset of `ThemeContextProps`, picking specific properties
 * (`cssScope`, `defaultTheme`, `theme`, and `tokens`) that are necessary for defining
 * a theme. It also supports generic customization through the `T` parameter.
 *
 * @template T - Represents the theme type, defaulting to `"default"`.
 * Typically used to specify or constrain the type of theme being handled.
 */
export interface ThemeProps<T extends string = "default">
  extends Pick<ThemeContextProps<T>, "cssScope" | "defaultTheme" | "theme" | "tokens">,
    RootProps<T> {}

/**
 * A Theme component allows you to manage various objects that define your application's colors, spacing, fonts, and more in a coherent and organized manner.
 *
 * @template T - The type of theme to be used.
 * @param {ThemeProps<T>} props - Props for the Theme component.
 * @returns {React.ReactElement} - React element representing the themed application.
 */
export function Theme<T extends string>({
  cssScope,
  defaultTheme = "default",
  theme: activeTheme,
  tokens: currentTokens,
  className,
  asChild,
  children
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
        ...(tokens?.[(theme || "default") as T]?.[key] ?? {})
      };

      return acc;
    }, {} as Tokens);
  }, [theme, tokens]);

  return (
    <ThemeContext
      value={{
        cssScope,
        defaultTheme,
        activeToken,
        theme,
        setTheme,
        tokens,
        setTokens
      }}
    >
      {/* Root component to which the themed styles are applied */}
      <Root asChild={asChild} className={className}>
        {children}
      </Root>
    </ThemeContext>
  );
}
