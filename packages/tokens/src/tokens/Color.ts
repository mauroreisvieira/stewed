import { palette } from "./Palette";

export const skin = {
  // Primary -------------------------------------------------------------------
  "primary": palette["indigo-500"],
  "background-primary": palette["indigo-500"],
  "background-primary-faded": palette["indigo-100"],
  "border-primary": palette["indigo-200"],
  "border-primary-faded": palette["indigo-300"],
  "foreground-faded": palette["indigo-500"],
  "foreground-primary-faded": palette["indigo-400"],
  // Neutral -------------------------------------------------------------------
  "neutral": palette["gray-500"],
  "background-neutral": palette["gray-500"],
  "background-neutral-faded": palette["gray-100"],
  "border-neutral": palette["gray-500"],
  "border-neutral-faded": palette["gray-300"],
  "foreground-neutral": palette["gray-500"],
  "foreground-neutral-faded": palette["gray-400"],
  // Secondary -----------------------------------------------------------------
  "secondary": palette["pink-500"],
  "background-secondary": palette["pink-500"],
  "background-secondary-faded": palette["pink-100"],
  "border-secondary": palette["pink-500"],
  "border-secondary-faded": palette["pink-300"],
  "foreground-secondary": palette["pink-500"],
  "foreground-secondary-faded": palette["pink-400"],
  // Critical ------------------------------------------------------------------
  "critical": palette["red-500"],
  "background-critical": palette["red-500"],
  "background-critical-faded": palette["red-100"],
  "border-critical": palette["red-500"],
  "border-critical-faded": palette["red-300"],
  "foreground-critical": palette["red-500"],
  "foreground-critical-faded": palette["red-400"],
  // Success -------------------------------------------------------------------
  "success": palette["green-500"],
  "background-success": palette["green-500"],
  "background-success-faded": palette["green-100"],
  "border-success": palette["green-500"],
  "border-success-faded": palette["green-300"],
  "foreground-success": palette["green-500"],
  "foreground-success-faded": palette["green-400"],
  // Info ----------------------------------------------------------------------
  "info": palette["blue-500"],
  "background-info": palette["blue-500"],
  "background-info-faded": palette["blue-100"],
  "border-info": palette["blue-500"],
  "border-info-faded": palette["blue-300"],
  "foreground-info": palette["blue-500"],
  "foreground-info-faded": palette["blue-400"],
  // Warning -------------------------------------------------------------------
  "warning": palette["yellow-500"],
  "background-warning": palette["yellow-500"],
  "background-warning-faded": palette["yellow-100"],
  "border-warning": palette["yellow-500"],
  "border-warning-faded": palette["yellow-300"],
  "foreground-warning": palette["yellow-500"],
  "foreground-warning-faded": palette["yellow-400"],
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
  "background-backdrop": "rgba(#000, 0.7)",
  // Text color
  "foreground-default": "#000",
  // Text inverted color
  "foreground-inverted": "#fff",
  //  Shadow for subtle depth in UI components
  "shadow": "rgba(#000, 0.1)",
  // Color used to indicate focus state in interactive elements
  "focus": "var(--border-primary)",
};

export type Skin = keyof typeof skin;
export type Color = keyof typeof color;
