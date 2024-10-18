import React, { useEffect, useMemo, useRef } from "react";
// Tokens
import { type Tokens, type Components } from "@stewed/tokens";
// Utilities
import { objectEntries } from "@stewed/utilities";
// Hooks
import { type ThemeContextProps, useTheme } from "./ThemeContext";

type TokensOnly = Exclude<Tokens, "components">;

type TransformedComponents = {
  [K in keyof Components]: {
    [P in keyof TokensOnly]?: string;
  };
};

/**
 * Represents the structure for tokens specifically for output purposes, combining general token properties
 * with override capabilities for component-specific properties.
 */
type OutputTokens = TokensOnly & TransformedComponents;

/**
 * Type definition for the root properties of a component derived from standard div properties and theme context properties.
 * This type filters out specific theme-related properties, making it suitable for the root element of a component.
 *
 * @template T - A generic string type constraint that extends to theming properties specified in ThemeContextProps.
 */
type RootProps<T extends string> = React.ComponentPropsWithoutRef<"div"> &
  Omit<ThemeContextProps<T>, "setTheme" | "setTokens" | "theme" | "activeToken">;

/**
 * Root component for applying themed styles to its children based on the current theme.
 *
 * @param {RootProps} props - Props for the Root component.
 * @returns {React.ReactElement} - React element representing the root component with themed styles applied.
 */
export function Root<T extends string>({ children, ...props }: RootProps<T>): React.ReactElement {
  const themeRef = useRef<HTMLDivElement>(null);

  // Theme and tokens from the context
  const { theme, activeToken } = useTheme();

  // Determine the current theme, defaulting to 'default' if not otherwise specified.
  const currentTheme = theme || "default";

  const transformedTokens: OutputTokens = useMemo(() => {
    const { components, color, ...otherTokens } = activeToken;

    if (!components) {
      return otherTokens;
    }

    const overrideColors = objectEntries(color).reduce((acc, [key, value]) => {
      acc[key] = color?.[value] || value;
      return acc;
    }, {});

    const transformedComponents = objectEntries(components).reduce((acc, [name, props]) => {
      acc[name] = objectEntries(props).reduce(
        (prop, [propName, tokenKey]) => {
          // Cache the token group to avoid repeated lookups
          const tokenGroup = otherTokens?.[propName];

          // Safely retrieve the token value, defaulting to tokenKey if not found
          const tokenValue = tokenGroup?.[tokenKey] ?? tokenKey;
          prop[propName] = tokenValue;
          return prop;
        },
        {} as Record<string, string>,
      );
      return acc;
    }, {} as TransformedComponents);

    return {
      color: overrideColors,
      ...otherTokens,
      ...transformedComponents,
    };
  }, [activeToken]);

  // Convert merged tokens to CSS custom properties
  const cssProperties = useMemo(() => {
    return Object.fromEntries(
      Object.entries(transformedTokens).flatMap(([context, data]) =>
        Object.entries(data).map(([key, value]) => [
          `--${context}-${key}`.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
          value,
        ]),
      ),
    );
  }, [transformedTokens]);

  const computedStyles = useMemo(
    () =>
      `\n${Object.entries(cssProperties)
        .map(([property, value]) => `${property}: ${value};`)
        .join("\n")}`,
    [cssProperties],
  );

  useEffect(() => {
    if (!themeRef.current) {
      return;
    }

    const styleTag = document.createElement("style");
    styleTag.innerHTML = `[data-theme="${currentTheme}"] {${computedStyles}\n}`;

    themeRef.current.insertAdjacentElement("afterbegin", styleTag);

    return () => {
      styleTag.remove();
    };
  }, [computedStyles, cssProperties, currentTheme]);

  return (
    <div ref={themeRef} data-theme={currentTheme} {...props}>
      {children}
    </div>
  );
}
