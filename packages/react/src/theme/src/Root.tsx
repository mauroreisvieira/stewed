import React, { useEffect, useMemo } from "react";
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

type ThemeContextOmittedProps<T extends string> = Omit<
  ThemeContextProps<T>,
  "setTheme" | "setTokens" | "theme" | "activeToken"
>;

type OutputTokens = Exclude<Tokens, "components"> & {
  [K in keyof Components]?: {
    radius?: string;
    shadow?: string;
    blur?: string;
  };
};

type ComponentOverrides = {
  radius?: Radius;
  shadow?: Shadow;
  blur?: Blur;
};

export interface RootProps<T extends string>
  extends React.ComponentPropsWithRef<"div">,
    ThemeContextOmittedProps<T> {}

/**
 * Root component for applying themed styles to its children based on the current theme.
 *
 * @param {RootProps} props - Props for the Root component.
 * @returns {React.ReactElement} - React element representing the root component with themed styles applied.
 */
export function Root<T extends string>({ children, ...props }: RootProps<T>): React.ReactElement {
  // Theme and tokens from the context
  const { theme, setTheme, modes, tokens, activeToken } = useTheme();

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
              ...(componentObj.blur && {
                blur: activeToken.blur?.[componentObj.blur] || componentObj.blur,
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

  const computedStyles = useMemo(
    () =>
      `\n${Object.entries(cssProperties)
        .map(([property, value]) => `${property}: ${value};`)
        .join("\n")}`,
    [cssProperties],
  );

  useEffect(() => {
    if (!modes) return;

    const eventListenerCallback = (event: MediaQueryListEvent) => {
      if (modes.dark && modes.light) {
        setTheme(event.matches ? modes.dark : modes.light);
      }
    };

    if (window.matchMedia) {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches ? modes.dark : modes.light,
      );
    }

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", eventListenerCallback);

    return () => {
      mediaQueryList.removeEventListener("change", eventListenerCallback);
    };
  }, [modes, setTheme]);

  return (
    <div data-theme={theme} {...props}>
      <style>{`[data-theme="${theme}"] { ${computedStyles}`}</style>
      {children}
    </div>
  );
}
