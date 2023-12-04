import React, { useMemo } from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Tokens
import { type Tokens, tokens as defaultTokens } from "../../tokens";

export interface ThemeProps<T extends string> extends React.HTMLAttributes<HTMLDivElement> {
  tokens?: Partial<Record<T, Tokens>>;
  theme?: T;
}

export function Theme<T extends string>({
  className,
  children,
  theme,
  tokens,
  ...props
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
    <div className={cssClasses.root} data-theme={theme} style={cssProperties} {...props}>
      {children}
    </div>
  );
}
