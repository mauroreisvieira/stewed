import { palette } from "./Palette";

export const color = {
  // Base background color used for the application
  "background-base": "#fff",
  // Inverted background color used for the application (ex: Tooltip)
  "background-inverted": "#000",
  // Background color for UI components (ex: Card)
  "background-surface": "#fff",
  // Background color for elevated UI components. (ex: Dialog)
  "background-elevated": "#fff",
  // Colors used for backdrop effects and backdrops
  "background-backdrop": "rgba(0, 0, 0, 0.7)",
  // Text color
  "text-base": "#000",
  // Text inverted color
  "text-inverted": "#fff",
  //  Shadow for subtle depth in UI components
  "shadow": "rgba(0, 0, 0, 0.1)",
  // Pure white color, often used for backgrounds or text
  "white": "#fff",
  // Pure black color, useful for text or contrasting elements
  "black": "#000",
  // Color used to indicate focus state in interactive elements
  "focus": "var(--color-primary)",
  // Imported color set from palette configurations extending the base color scheme
  ...palette,
};

export type Color = keyof typeof color;
