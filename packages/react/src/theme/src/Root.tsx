import React, { useMemo } from "react";
// Tokens
import {
  defaultTokens,
  type Tokens,
  type Components,
  type Radius,
  type Shadow,
  type Blur,
} from "@stewed/tokens";
// Utilities
import { objectKeys } from "@stewed/utilities";
// Hooks
import { type ThemeContextProps, useTheme } from "./ThemeContext";

/**
 * Converts properties of a given type to optional string properties.
 * @template T - Generic type for the object whose properties are to be converted to strings.
 */
type StringifyProperties<T> = {
  [K in keyof T]?: string;
};

/** Represents overrides that can be applied to components */
interface ComponentOverrides {
  /** Optional override for the radius property of a component. */
  radius?: Radius;
  /** Optional override for the shadow property of a component. */
  shadow?: Shadow;
  /** Override for the blur property of a component. */
  blur?: Blur;
}

/**
 * Represents the structure for tokens specifically for output purposes, combining general token properties
 * with override capabilities for component-specific properties.
 */
type OutputTokens = Exclude<Tokens, "components"> & {
  [K in keyof Components]?: StringifyProperties<ComponentOverrides>;
};

/**
 * Type definition for the root properties of a component derived from standard div properties and theme context properties.
 * This type filters out specific theme-related properties, making it suitable for the root element of a component.
 *
 * @template T - A generic string type constraint that extends to theming properties specified in ThemeContextProps.
 */
type RootProps<T extends string> = React.ComponentPropsWithRef<"div"> &
  Omit<ThemeContextProps<T>, "setTheme" | "setTokens" | "theme" | "activeToken">;

/**
 * Root component for applying themed styles to its children based on the current theme.
 *
 * @param {RootProps} props - Props for the Root component.
 * @returns {React.ReactElement} - React element representing the root component with themed styles applied.
 */
export function Root<T extends string>({ children, ...props }: RootProps<T>): React.ReactElement {
  // Theme and tokens from the context
  const { theme, tokens, activeToken } = useTheme();

  // Determine the current theme, defaulting to 'default' if not otherwise specified.
  const currentTheme = theme || "default";

  // Memoize the outputObject to prevent unnecessary recalculations
  const outputObject = useMemo(() => {
    // If the current theme has components defined, proceed to merge them
    if (tokens?.[currentTheme]?.components) {
      // Merge default and theme-specific components
      activeToken.components = objectKeys(defaultTokens.components || {}).reduce(
        (acc: Components, component) => {
          // Merge each component from the default with the theme-specific one, if exists
          acc[component] = {
            ...((defaultTokens.components || {})[component] as Record<
              keyof Components,
              Components[keyof Components]
            >),
            ...(tokens[currentTheme]?.components?.[component] || {}),
          };
          return acc;
        },
        {},
      );
    }

    // Return the modified activeToken, applying any component-specific overrides specified in 'activeToken'
    return objectKeys(activeToken).reduce((acc: OutputTokens, key) => {
      if (key === "components") {
        // Process each component specified in activeToken
        objectKeys(activeToken.components || {}).forEach((component) => {
          const componentObj: ComponentOverrides | undefined = activeToken.components?.[component];
          if (componentObj) {
            // Merge component-level overrides such as radius, shadow, and blur values
            acc[component] = {
              ...componentObj,
              ...(componentObj.radius && {
                radius: activeToken.radius?.[componentObj.radius] || componentObj.radius,
              }),
              ...(componentObj.shadow && {
                shadow: activeToken.shadow?.[componentObj.shadow] || componentObj.shadow,
              }),
              ...(componentObj.blur && {
                blur: activeToken.blur?.[componentObj.blur] || componentObj.blur,
              }),
            };
          }
        });
      } else {
        // For keys other than 'components', simply copy the values
        acc[key] = {
          ...activeToken[key],
        };
      }

      return acc;
    }, {}) as OutputTokens;
  }, [currentTheme, activeToken, tokens]);

  // Convert merged tokens to CSS custom properties
  const cssProperties = useMemo(() => {
    return Object.fromEntries(
      Object.entries(outputObject).flatMap(([context, data]) =>
        Object.entries(data).map(([key, value]) => [
          `--${context}-${key}`.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
          value,
        ]),
      ),
    );
  }, [outputObject]);

  const computedStyles = useMemo(
    () =>
      `\n${Object.entries(cssProperties)
        .map(([property, value]) => `${property}: ${value};`)
        .join("\n")}`,
    [cssProperties],
  );

  return (
    <div data-theme={currentTheme} {...props}>
      <style>{`[data-theme="${currentTheme}"] { ${computedStyles}`}</style>
      {children}
    </div>
  );
}
