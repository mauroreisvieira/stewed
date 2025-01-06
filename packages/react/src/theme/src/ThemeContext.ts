import { use, createContext, type Dispatch, type Context, type SetStateAction } from "react";
// Types
import type { Tokens } from "@stewed/tokens";

/**
 * Dummy function to throw an error when theme is not provided by a ThemeProvider.
 *
 * @returns Always throws an error.
 */
const definitionError = (): null => {
  throw new Error('Please make sure "<Theme>" component is wrapping your component.');
};

/**
 * Defines the properties expected in the context for theme.
 *
 * @template T - The type representing theme names.
 */
export interface ThemeContextProps<T extends string> {
  /**
   * A string that represents the scope or unique class name used to target specific CSS styles.
   * This class name will be applied to the root element (e.g., the `themeRef` element) to scope
   * styles to a particular section of the UI, preventing conflicts with other parts of the page.
   */
  cssScope?: string;
  /**
   * Set the default theme to be used when no theme is set.
   * @remarks This prop is uncontrolled, meaning the component will manage its own internal state for the default theme.
   * If you provide a value, it will be used as the initial default theme.
   *
   * @default default
   */
  defaultTheme?: T | "default";
  /**
   * Set the current active theme.
   * @remarks This prop is controlled, meaning the parent component manages the theme state by providing the 'theme' value.
   * If this prop is provided, the component will reflect the current theme specified by the parent.
   */
  theme?: T | "default";
  /**
   * Map of theme names to tokens.
   * This property allows you to define custom tokens for different themes in the application.
   * Each theme can have its own set of `Tokens` which represent a collection of values such as colors, fonts, or other design properties.
   */
  tokens?: Partial<
    {
      /**
       * It supports a default theme as well as other themes that are specified by their respective names.
       * The `default` theme will be used when no specific theme is provided.
       */
      default: Tokens;
    } & Record<T, Tokens>
  >;
  /** Currently selected token. */
  activeToken: Tokens;
  /** Setter function for updating the current active theme. */
  setTheme: Dispatch<SetStateAction<ThemeContextProps<T>["theme"]>>;
  /** Setter function for updating the theme tokens. */
  setTokens: Dispatch<SetStateAction<ThemeContextProps<T>["tokens"] | undefined>>;
}

/**
 * Creates a theme context with the specified generic type.
 *
 * This function initializes a context for managing themes within the application.
 * It provides default values and setters for theme-related operations.
 *
 * @template T - The type representing themes.
 * @returns A new theme context with the specified generic type.
 */
function createThemeContext<T extends string>() {
  return createContext<ThemeContextProps<T>>({
    theme: "default",
    defaultTheme: undefined,
    tokens: undefined,
    activeToken: {},
    setTheme: definitionError,
    setTokens: definitionError
  });
}

/**
 * Default context for managing themes.
 *
 * This context provides functionalities to manage themes across the application.
 * It includes default values and setters for theme-related operations.
 */
export const ThemeContext = createThemeContext<string>();

/**
 * Hook to conveniently use the theme context.
 *
 * @returns Theme context values.
 */
export function useTheme<T extends string>() {
  return use(ThemeContext as Context<ThemeContextProps<T>>);
}
