import { palette } from "./Palette";

export const skin = {
  // Primary -------------------------------------------------------------------
  "primary": palette["indigo-500"],
  "primary-background": palette["indigo-500"],
  "primary-background-faded": palette["indigo-100"],
  "primary-border": palette["indigo-200"],
  "primary-border-faded": palette["indigo-300"],
  "primary-foreground": palette["indigo-500"],
  "primary-foreground-faded": palette["indigo-400"],
  // Secondary -----------------------------------------------------------------
  "secondary": palette["pink-500"],
  "secondary-background": palette["pink-500"],
  "secondary-background-faded": palette["pink-100"],
  "secondary-border": palette["pink-200"],
  "secondary-border-faded": palette["pink-300"],
  "secondary-foreground": palette["pink-500"],
  "secondary-foreground-faded": palette["pink-400"],
  // Neutral -------------------------------------------------------------------
  "neutral": palette["gray-500"],
  "neutral-background": palette["gray-500"],
  "neutral-background-faded": palette["gray-100"],
  "neutral-border": palette["gray-200"],
  "neutral-border-faded": palette["gray-300"],
  "neutral-foreground": palette["gray-500"],
  "neutral-foreground-faded": palette["gray-400"],
  // Critical ------------------------------------------------------------------
  "critical": palette["red-500"],
  "critical-background": palette["red-500"],
  "critical-background-faded": palette["red-100"],
  "critical-border": palette["red-200"],
  "critical-border-faded": palette["red-300"],
  "critical-foreground": palette["red-500"],
  "critical-foreground-faded": palette["red-400"],
  // Success -------------------------------------------------------------------
  "success": palette["green-500"],
  "success-background": palette["green-500"],
  "success-background-faded": palette["green-100"],
  "success-border": palette["green-200"],
  "success-border-faded": palette["green-300"],
  "success-foreground": palette["green-500"],
  "success-foreground-faded": palette["green-400"],
  // Info ----------------------------------------------------------------------
  "info": palette["blue-500"],
  "info-background": palette["blue-500"],
  "info-background-faded": palette["blue-100"],
  "info-border": palette["blue-200"],
  "info-border-faded": palette["blue-300"],
  "info-foreground": palette["blue-500"],
  "info-foreground-faded": palette["blue-400"],
  // Warning -------------------------------------------------------------------
  "warning": palette["yellow-500"],
  "warning-background": palette["yellow-500"],
  "warning-background-faded": palette["yellow-100"],
  "warning-border": palette["yellow-200"],
  "warning-border-faded": palette["yellow-300"],
  "warning-foreground": palette["yellow-500"],
  "warning-foreground-faded": palette["yellow-400"],
};

export const color = {
  // Pure white color, often used for backgrounds or text
  "white": "#fff",
  // Pure black color, useful for text or contrasting elements
  "black": "#000",
  // Base background color used for the application
  "background-default": "#fff",
  // Inverted background color used for the application (ex: Tooltip)
  "background-inverted": "#000",
  // Background color for UI components (ex: Card)
  "background-surface": "#fff",
  // Background color for elevated UI components. (ex: Dialog)
  "background-elevated": "#fff",
  // Colors used for backdrop effects and backdrops
  "background-backdrop": "rgb(0 0 0 / 70%)",
  // Text color
  "foreground-default": "#000",
  // Text inverted color
  "foreground-inverted": "#fff",
  // Shadow for subtle depth in UI components
  "shadow": "rgba(0 0 0 / 0.1)",
  // Color used to indicate focus state in interactive elements
  "focus": "var(--border-primary)",
};

export type Skin = keyof typeof skin;
export type Color = keyof typeof color;
