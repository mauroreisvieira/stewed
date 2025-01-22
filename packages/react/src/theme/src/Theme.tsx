import React, { useEffect, useMemo, useState } from "react";
// UI Components
import { Root, type RootProps } from "./Root";
// Tokens
import { defaultTokens, type Tokens } from "@stewed/tokens";
// Context
import { ThemeContext, useTheme, type ThemeContextProps } from "./ThemeContext";
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
    RootProps<T> {
  /**
   * Determines whether to extend the parent theme's tokens.
   *
   * - When `extendsParentTokens` is `true`, all parent/default tokens are duplicated
   *   into the new theme scope, making all tokens readily available.
   *
   * - When `extendsParentTokens` is `false`, only tokens explicitly defined in the new theme scope are written.
   *   Parent tokens are used as fallback, reducing redundancy and potentially enhancing performance in cases where only partial overrides are needed.
   *
   * @default true
   */
  extendsParentTokens?: boolean;
}

/**
 * A Theme component allows you to manage various objects that define your application's colors, spacing, fonts, and more in a coherent and organized manner.
 *
 * @template T - The type of theme to be used.
 *
 * @param props - Props for the Theme component.
 * @returns React element representing the themed application.
 *
 * @see {@link ThemeProps} for more details on the available props.
 */
export function Theme<T extends string>({
  cssScope,
  defaultTheme = "default",
  theme: activeTheme,
  tokens: currentTokens,
  className,
  extendsParentTokens = true,
  asChild,
  children
}: ThemeProps<T>): React.ReactElement {
  // State for managing the current theme
  const [theme, setTheme] = useState<string | undefined>(activeTheme || defaultTheme);

  // State for managing tokens
  const [tokens, setTokens] = useState<ThemeContextProps<T>["tokens"]>(currentTokens);

  const { activeToken: parentToken } = useTheme();

  // Updates the theme state to the currently active theme.
  useEffect(() => {
    // If `activeTheme` is null or undefined, the code inside the if block will not execute.
    if (!activeTheme) return;

    // If `activeTheme` is present, then the `setTheme` function is called with `activeTheme`.
    setTheme(activeTheme);
  }, [activeTheme]);

  // Merge default tokens with theme-specific tokens
  // which combines default tokens with any overrides from the provided tokens.
  const activeToken = useMemo(() => {
    // Reduce the keys of defaultTokens into a new object
    return objectKeys(defaultTokens).reduce((acc, key) => {
      // Merge the default token with any overrides from the tokens object
      acc[key] = {
        ...(extendsParentTokens ? parentToken?.[key] || defaultTokens[key] : {}),
        ...(tokens?.["default" as T]?.[key] ?? {}), // Merge default overrides
        ...(tokens?.[theme as T]?.[key] ?? {}) // Merge theme-specific overrides
      };

      return acc;
    }, {} as Tokens);
  }, [theme, tokens, extendsParentTokens, parentToken]);

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
