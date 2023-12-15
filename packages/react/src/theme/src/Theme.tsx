import React, { useMemo } from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Tokens
import { type Tokens, tokens as defaultTokens } from "../../tokens";
import { type ThemeProviderProps, ThemeProvider } from "./ThemeProvider";

export interface ThemeProps<T extends string> extends ThemeProviderProps<T> {
  className?: string;
}

export function Theme<T extends string>({
  className,
  children,
  theme,
  tokens,
}: ThemeProps<T>): React.ReactElement {
  const cssClasses = {
    root: classNames(className),
  };

  const mergedTokens = useMemo<Tokens>(() => {
    return Object.keys(defaultTokens).reduce((acc, key) => {
      acc[key as keyof Tokens] = {
        ...(defaultTokens[key as keyof Tokens] || {}),
        ...(tokens?.[theme]?.[key as keyof Tokens] || {}),
      };
      return acc;
    }, {} as Tokens);
  }, [theme, tokens]);

  const cssProperties = useMemo(() => {
    return Object.fromEntries(
      Object.entries(mergedTokens).flatMap(([context, data]) =>
        Object.entries(data).map(([key, value]) => [
          `--${context}-${key}`.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
          value,
        ]),
      ),
    );
  }, [mergedTokens]);

  return (
    <ThemeProvider theme={theme} tokens={tokens}>
      <div className={cssClasses.root} style={cssProperties}>
        {children}
      </div>
    </ThemeProvider>
  );
}
