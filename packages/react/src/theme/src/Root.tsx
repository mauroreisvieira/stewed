import React, { useEffect, useMemo } from "react";
// Tokens
import { defaultTokens, type Tokens, type Components, Radius, Shadow } from "@stewed/tokens";
// Utilities
import { objectKeys } from "@stewed/utilities";
// Hooks
import { type ThemeContextProps, useTheme } from "./ThemeContext";

type ThemeContextOmittedProps<T extends string> = Omit<
  ThemeContextProps<T>,
  "setTheme" | "setTokens" | "theme" | "activeToken"
>;

type OutputTokens = Exclude<Tokens, "components"> & {
  [K in keyof Components]?: {
    radius?: string;
    shadow?: string;
  };
};

type ComponentOverrides = {
  radius?: Radius;
  shadow?: Shadow;
};

export interface RootProps<T extends string>
  extends React.ComponentPropsWithRef<"div">,
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
export function Root<T extends string>({ children, ...props }: RootProps<T>): React.ReactElement {
  // Theme and tokens from the context
  const { theme, tokens, activeToken } = useTheme();

  const outputObject = useMemo(() => {
    if (tokens?.[theme]?.components) {
      activeToken.components = objectKeys(defaultTokens.components || {}).reduce(
        (acc: Components, component) => {
          acc[component] = {
            ...((defaultTokens.components || {})[component] as Record<
              keyof Components,
              Components[keyof Components]
            >),
            ...(tokens[theme]?.components?.[component] || {}),
          };
          return acc;
        },
        {},
      );
    }

    return objectKeys(activeToken).reduce((acc: OutputTokens, key) => {
      if (activeToken.components && key === "components") {
        objectKeys(activeToken.components).forEach((component) => {
          const componentObj: ComponentOverrides | undefined = activeToken?.components?.[component];
          if (componentObj) {
            acc[component] = {
              ...componentObj,
              ...(componentObj.radius && {
                radius: activeToken.radius?.[componentObj.radius] || componentObj.radius,
              }),
              ...(componentObj.shadow && {
                shadow: activeToken.shadow?.[componentObj.shadow] || componentObj.shadow,
              }),
            };
          }
        });
      } else {
        acc[key] = activeToken[key];
      }

      return acc;
    }, {}) as OutputTokens;
  }, [theme, activeToken, tokens]);

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
    styleTag.setAttribute("data-theme", theme);

    styleTag.innerHTML = `[data-theme="${theme}"] { \n${Object.entries(cssProperties)
      .map(([property, value]) => `${property}: ${value};`)
      .join("\n")}\n}`;

    document.head.appendChild(styleTag);

    return () => {
      styleTag.remove();
    };
  }, [cssProperties, theme]);

  return (
    <div {...props} data-theme={theme}>
      {children}
    </div>
  );
}
