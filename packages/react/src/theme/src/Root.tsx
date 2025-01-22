import React, { useEffect, useInsertionEffect, useMemo } from "react";
// Tokens
import { defaultTokens, type Tokens, type Components } from "@stewed/tokens";
// Hooks
import { useTheme, type ThemeContextProps } from "./ThemeContext";
// Utilities
import { classNames, objectEntries } from "@stewed/utilities";

/** Interface representing the props for a child component. */
interface ChildProps {
  /** Additional class name(s) to apply to the child element. */
  className?: string;
}

/**
 * Excludes the "components" property from the `Tokens` type.
 * This creates a new type containing all properties of `Tokens` except "components".
 */
type TokensOnly = Exclude<Tokens, "components">;

/**
 * Transforms the `Components` type into a new structure where each key in `Components`
 * maps to an object. Each object allows optional keys from `TokensOnly`, with string values.
 *
 * @template K Represents each key in the `Components` type.
 * @template P Represents each key in the `TokensOnly` type.
 */
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
export interface RootProps<T extends string> extends Pick<ThemeContextProps<T>, "cssScope"> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   * @default false
   */
  asChild?: boolean;
  /** Slot for children components.  */
  children?: React.ReactNode;
}

/**
 * Root component for applying themed styles to its children based on the current theme.
 *
 * @param props - Props for the Root component.
 * @returns React element representing the root component with themed styles applied.
 *
 * @see {@link RootProps} for more details on the available props.
 */
export function Root<T extends string>({
  children,
  asChild = false
}: RootProps<T>): React.ReactElement {
  // Theme and tokens from the context
  const { cssScope, activeToken } = useTheme();

  // Transformed tokens to optimize performance
  const transformedTokens: OutputTokens = useMemo(() => {
    // access `activeToken` to extract components, color, and other tokens
    const { components, color, ...otherTokens } = activeToken;

    // If there are no components, return the other tokens directly
    if (!components) {
      return otherTokens;
    }

    // Create an object to override colors based on the color tokens
    const overrideColors = objectEntries(color).reduce((acc, [key, value]) => {
      // Map each color key to its corresponding value or fallback to the key itself
      acc[key] = color?.[value] || defaultTokens?.color?.[value] || value;

      return acc;
    }, {});

    // Transform components by mapping their properties to corresponding token values
    const transformedComponents = objectEntries(components).reduce((acc, [name, props]) => {
      // Initialize an object for each component's transformed properties
      acc[name] = objectEntries(props).reduce(
        (prop, [propName, tokenKey]) => {
          // Determine the token group to use: prefer otherTokens, fallback to defaultTokens
          const tokenGroup = Object.keys(otherTokens?.[propName] || {}).length
            ? otherTokens?.[propName] // Use otherTokens if available
            : defaultTokens?.[propName]; // Fallback to defaultTokens

          // Safely retrieve the token value; if not found, use the tokenKey as default
          const tokenValue = tokenGroup?.[tokenKey] || tokenKey;

          // Assign the resolved token value to the property
          prop[propName] = tokenValue;

          return prop; // Return the accumulated properties for the current component
        },
        {} as Record<string, string> // Initialize the accumulator as an empty object
      );

      return acc;
    }, {} as TransformedComponents);

    return {
      color: overrideColors,
      ...otherTokens,
      ...transformedComponents
    };
  }, [activeToken]);

  // Convert merged tokens to CSS custom properties
  const cssProperties = useMemo(() => {
    return Object.fromEntries(
      Object.entries(transformedTokens).flatMap(([context, data]) =>
        Object.entries(data).map(([key, value]) => [
          `--${context}-${key}`.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
          value
        ])
      )
    );
  }, [transformedTokens]);

  const computedStyles = useMemo(
    () =>
      `\n${Object.entries(cssProperties)
        .map(([property, value]) => `${property}: ${value};`)
        .join("\n")}`,
    [cssProperties]
  );

  useEffect(() => {
    if (!cssScope || !Object.keys(computedStyles).length) return;

    // Map for style tag
    const styleTag = new Map();

    // This function is called to update styles for elements with a specific CSS scope.
    // It ensures that the updates happen in the next repaint cycle for better performance.
    requestAnimationFrame(() => {
      // Use a Map to keep track of style tags for scoped elements
      const scopedElements = Array.from(document.querySelectorAll(`.${cssScope}`));

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

          // Update the styles of the style tag
          cssRules.innerHTML = `@scope (.${cssScope}) { \n :scope { ${computedStyles}\n}}`;
        }
      });
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
    if (cssScope) {
      return;
    }

    // Check if the style tag for the specific theme already exists
    let cssRules = document.querySelector(`style[data-global-styles]`);

    // If the style tag doesn't exist, create a new one
    if (!cssRules) {
      cssRules = document.createElement("style");
      cssRules.setAttribute("data-global-styles", "true"); // Set a data attribute for unique identification
      document.head.appendChild(cssRules);

      // Update the inner HTML of the existing or newly created <style> tag with the computed styles
      cssRules.innerHTML = `:scope {${computedStyles}\n}`;
    }

    // Note: No need to remove the style tag, as this is managed by the component life-cycle
  }, [computedStyles]);

  // Cloning the child element to inject className
  if (asChild && React.isValidElement<ChildProps>(children)) {
    return React.cloneElement(children, {
      className: classNames(cssScope, children.props.className)
    });
  }

  return <div className={classNames(cssScope)}>{children}</div>;
}
