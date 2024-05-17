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
import { objectKeys, invertColor } from "@stewed/utilities";
// Hooks
import { type ThemeContextProps, useTheme } from "./ThemeContext";

type OutputTokens = Exclude<Tokens, "components"> & {
  [K in keyof Components]?: {
    radius?: string;
    shadow?: string;
    blur?: string;
  };
};

interface ComponentOverrides {
  radius?: Radius;
  shadow?: Shadow;
  blur?: Blur;
}

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

  const currentTheme = theme || "default";

  const outputObject = useMemo(() => {
    if (tokens?.[currentTheme]?.components) {
      activeToken.components = objectKeys(defaultTokens.components || {}).reduce(
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
              ...(componentObj.blur && {
                blur: activeToken.blur?.[componentObj.blur] || componentObj.blur,
              }),
            };
          }
        });
      } else {
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
