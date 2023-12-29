import React, { useMemo } from "react";
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

  // Merged tokens based on the current theme
  const mergedTokens = useMemo<Tokens>(() => {
    return Object.keys(defaultTokens).reduce((acc, key) => {
      acc[key as keyof Tokens] = {
        ...(defaultTokens[key as keyof Tokens] || {}),
        ...((theme && tokens?.[theme]?.[key as keyof Tokens]) || {}),
      };
      return acc;
    }, {} as Tokens);
  }, [theme, tokens]);

  // Convert merged tokens to CSS custom properties
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
    <div {...props} className={cssClasses.root} style={cssProperties}>
      {children}
    </div>
  );
}
