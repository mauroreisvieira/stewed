import React, { useEffect, useMemo } from "react";
// Tokens
import { type Tokens, tokens as defaultTokens } from "../../tokens";
// Hooks
import { type ThemeContextProps, useTheme } from "./ThemeContext";
// Utilities
import { classNames } from "@stewed/utilities";

type ThemeContextOmittedProps<T extends string> = Omit<
  ThemeContextProps<T>,
  "setTheme" | "setTokens" | "theme"
>;

export interface RootProps<T extends string>
  extends React.HTMLAttributes<HTMLDivElement>,
    ThemeContextOmittedProps<T> {
  /** Additional class name for styling. */
  className?: string;
  /** React components to be rendered within the Root component. */
  children?: React.ReactNode;
}

/**
 * Root component for applying themed styles to its children based on the current theme.
 *
 * @param {RootProps} props - Props for the Root component.
 * @returns {React.ReactElement} - React element representing the root component with themed styles applied.
 */
export function Root<T extends string>({
  className,
  children,
  ...props
}: RootProps<T>): React.ReactElement {
  // CSS classes for styling
  const cssClasses = {
    root: classNames(className),
  };

  // Theme and tokens from the context
  const { theme, tokens } = useTheme();

  const outputObject = useMemo(() => {
    const mergedTokens: Tokens = Object.keys(defaultTokens).reduce(
      (acc, key) => {
        acc[key] = {
          ...defaultTokens[key],
          ...(tokens?.[theme]?.[key] || {}),
        };
        return acc;
      },
      { components: {} },
    );

    if (tokens?.[theme]?.components) {
      mergedTokens.components = Object.keys(defaultTokens.components).reduce((acc, component) => {
        acc[component] = {
          ...defaultTokens.components[component],
          ...(tokens?.[theme]?.components[component] || {}),
        };
        return acc;
      }, {});
    }

    return Object.keys(mergedTokens).reduce((acc, key) => {
      if (key === "components") {
        Object.keys(mergedTokens.components).forEach((component) => {
          const componentObj = mergedTokens.components[component];
          acc[component] = {
            ...componentObj,
            radius: mergedTokens.radius[componentObj.radius] || componentObj.radius,
          };
        });
      } else {
        acc[key] = mergedTokens[key];
      }
      return acc;
    }, {});
  }, [defaultTokens, tokens, theme]);

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

  const aux = theme || "default";

  useEffect(() => {
    const $style = document.createElement("style");
    $style.setAttribute("data-theme", aux);
    $style.innerHTML = `[data-theme="${aux}"] { \n${Object.entries(cssProperties)
      .map(([property, value]) => `${property}: ${value};`)
      .join("\n")}\n}`;
    document.head.appendChild($style);

    return () => {
      $style.remove();
    }
  }, [cssProperties]);

  return (
    <>
      <div data-theme={aux} {...props} className={cssClasses.root}>
        {children}
      </div>
    </>
  );
}
