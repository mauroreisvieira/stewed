import { useContext, createContext } from "react";
import { Tokens } from "../../tokens";

// Define the properties expected in the context for client groups
export interface ThemeContextProps<T extends string> {
  tokens?: Partial<Record<T, Tokens>>;
  theme?: T;
}

// Create a context for client groups with initial values
export const ThemeContext = createContext<ThemeContextProps<string>>({
  tokens: undefined,
  theme: undefined,
});

// Create a custom hook to conveniently use the client group context
export function useTheme() {
  return useContext(ThemeContext);
}
