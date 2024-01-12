import React, { useEffect, useMemo } from "react";
// Tokens
import { type Tokens, tokens as defaultTokens, Components } from "@stewed/tokens";
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

  const currentTheme = theme || "default";

  const objectKeys: <Obj>(o: Obj) => (keyof Obj)[] = Object.keys;

  const outputObject = useMemo(() => {
    const mergeTokens = (defaultTokens: Tokens, themeTokens: Tokens | undefined): Tokens => {
      return objectKeys(defaultTokens).reduce((acc: Tokens, key) => {
        acc[key] = {
          ...defaultTokens[key],
          ...(themeTokens?.[key] || {}),
        };
        return acc;
      }, {});
    };

    const mergeComponentTokens = (
      defaultComponents: Components,
      themeComponents: Components | undefined,
    ): Components => {
      return objectKeys(defaultComponents).reduce((acc, component) => {
        acc[component] = {
          ...defaultComponents[component] as Record<keyof Components, Components[keyof Components]>,
          ...(themeComponents?.[component] || {}),
        };
        return acc;
      }, {});
    };

    const mergedTokens: Tokens = mergeTokens(defaultTokens, tokens?.[currentTheme]);

    if (tokens?.[currentTheme]?.components) {
      mergedTokens.components = mergeComponentTokens(
        defaultTokens.components || {},
        tokens[currentTheme]?.components,
      );
    }

    return Object.keys(mergedTokens).reduce((acc, key) => {
      if (key === "components") {
        objectKeys(mergedTokens.components).forEach((component) => {
          const componentObj = mergedTokens?.components?.[component] || {};
          acc[component] = {
            ...componentObj,
            radius: mergedTokens.radius?.[componentObj?.radius] || componentObj?.radius,
          };
        });
      } else {
        acc[key] = mergedTokens[key];
      }
      return acc;
    }, {}) as Tokens;
  }, [currentTheme, objectKeys, tokens]);

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

  useEffect(() => {
    const $style = document.createElement("style");
    $style.setAttribute("data-theme", currentTheme);
    $style.innerHTML = `[data-theme="${currentTheme}"] { \n${Object.entries(cssProperties)
      .map(([property, value]) => `${property}: ${value};`)
      .join("\n")}\n}`;
    document.head.appendChild($style);

    return () => {
      $style.remove();
    };
  }, [cssProperties, currentTheme]);

  return (
    <>
      <div data-theme={currentTheme} {...props} className={cssClasses.root}>
        {children}
      </div>
    </>
  );
}
