import React, { useEffect, useMemo } from "react";
// Tokens
import { tokens as defaultTokens, type Tokens, type Components } from "@stewed/tokens";
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

    const mergedTokens: Tokens = mergeTokens(defaultTokens, tokens?.[currentTheme]);

    if (tokens?.[currentTheme]?.components) {
      mergedTokens.components = objectKeys(defaultTokens.components || {}).reduce(
        (acc: Components, component) => {
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

    return objectKeys(mergedTokens).reduce((acc: Partial<Tokens>, key) => {
      if (key === "components") {
        objectKeys(mergedTokens.components).forEach((component: Components) => {
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


console.log("outputObject >", outputObject);
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
    const styleTag = document.createElement("style");
    styleTag.setAttribute("data-theme", currentTheme);

    styleTag.innerHTML = `[data-theme="${currentTheme}"] { \n${Object.entries(cssProperties)
      .map(([property, value]) => `${property}: ${value};`)
      .join("\n")}\n}`;

    document.head.appendChild(styleTag);

    return () => {
      styleTag.remove();
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
