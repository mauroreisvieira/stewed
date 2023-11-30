import React, { useMemo } from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Tokens
import { type Tokens, defaultTokens } from "./tokens";

// type Spacings = {
//   "xxs": string;
//   "xs": string;
//   "sm": string;
//   "md": string;
//   "lg": string;
//   "xl": string;
//   "2xl": string;
// };

// type FontSizes = {
//   "xxs": string;
//   "xs": string;
//   "sm": string;
//   "md": string;
//   "lg": string;
//   "xl": string;
//   "2xl": string;
//   "3xl": string;
//   "4xl": string;
//   "5xl": string;
//   "6xl": string;
//   "7xl": string;
//   "8xl": string;
// };

// type LineHeight = {
//   "sm": string;
//   "md": string;
//   "lg": string;
//   "xl": string;
//   "2xl": string;
//   "3xl": string;
//   "4xl": string;
// };

// type FontWeight = {
//   "thin": string;
//   "light": string;
//   "normal": string;
//   "medium": string;
//   "semi-bold": string;
//   "bold": string;
//   "extra-bold": string;
// };

export interface ThemeProps<T extends string> extends React.HTMLAttributes<HTMLDivElement> {
  themes?: T[];
  defaultTheme?: T;
  tokens?: Record<T, Tokens>;
}

export function Theme<T extends string>({
  className,
  children,
  ...props
}: ThemeProps<T>): React.ReactElement {
  const cssClasses = {
    root: classNames(className),
  };

  const cssTokens = useMemo<React.CSSProperties>(() => {
    return Object.fromEntries(
      Object.entries(defaultTokens).flatMap(([context, data]) =>
        Object.entries(data).map(([key, value]) => [
          "--" + context.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() + "-" + key,
          value,
        ]),
      ),
    );
  }, []);

  return (
    <div className={cssClasses.root} style={cssTokens} {...props}>
      {children}
    </div>
  );
}
