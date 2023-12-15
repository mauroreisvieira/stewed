import React from "react";
// Types
import { type ThemeContextProps, ThemeContext } from "./ThemeContext";

export interface ThemeProviderProps<T extends string> extends ThemeContextProps<T> {
  children: React.ReactNode;
}

export function ThemeProvider<T extends string>({
  theme,
  tokens,
  children,
}: ThemeProviderProps<T>): React.ReactElement {
  return <ThemeContext.Provider value={{ theme, tokens }}>{children}</ThemeContext.Provider>;
}
