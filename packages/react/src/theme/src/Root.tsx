import React, { useEffect, useInsertionEffect, useMemo, useRef } from "react";
// Tokens
import { type Tokens, type Components } from "@stewed/tokens";
// Hooks
import { useTheme, type ThemeContextProps } from "./ThemeContext";
// Utilities
import { objectEntries } from "@stewed/utilities";

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
  const { theme = "default", cssScope, activeToken } = useTheme();

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
    if (!themeRef.current || !cssScope) return;

    // CSS scope class and added to the theme element.
    themeRef.current.classList.add(cssScope);

    // Use a Map to keep track of style tags for scoped elements
    const scopedElements = Array.from(document.querySelectorAll(`.${cssScope}`));
    const styleTag = new Map();

    // Update styles for all scoped elements
    scopedElements.forEach((element) => {
      // Avoid unnecessary DOM queries by checking the Map first
      let cssRules = styleTag.get(element);

      if (!cssRules) {
        // If no style tag exists, create a new one
        cssRules = document.createElement("style");
        cssRules.setAttribute("data-scope", cssScope);
        element.insertAdjacentElement("afterbegin", cssRules);
        styleTag.set(element, cssRules);
      }

      // Update the styles of the style tag
      cssRules.innerHTML = `@scope (.${cssScope}) { \n :scope { ${computedStyles}\n}}`;
    });

    // Cleanup by remove only the created style tags
    return () => {
      styleTag.forEach((cssRule, element) => {
        if (element.contains(cssRule)) {
          cssRule.remove();
        }
      });
      styleTag.clear();
    };
  }, [computedStyles, cssScope]);

  useInsertionEffect(() => {
    // Ensure theme is not undefined or empty before proceeding
    if (!theme || cssScope) {
      return;
    }

    // Check if the style tag for the specific theme already exists
    let cssRules = document.querySelector(`style[data-global-styles]`);

    // If the style tag doesn't exist, create a new one
    if (!cssRules) {
      cssRules = document.createElement("style");
      cssRules.setAttribute("data-global-styles", "true"); // Set a data attribute for unique identification
      document.head.appendChild(cssRules);
    }

    // Update the inner HTML of the existing or newly created <style> tag with the computed styles
    cssRules.innerHTML = `:scope {${computedStyles}\n}`;

    // Note: No need to remove the style tag, as this is managed by the component lifecycle
  }, [computedStyles, theme]);

  return (
    <div ref={themeRef} {...props}>
      {children}
    </div>
  );
}
