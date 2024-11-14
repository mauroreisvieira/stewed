import { palette } from "./Palette";

export const skin = {
  // Primary -------------------------------------------------------------------
  "primary-background": "var(--color-indigo-500)",
  "primary-background-faded": palette["indigo-100"],
  "primary-background-hovered": palette["indigo-600"],
  "primary-background-pressed": palette["indigo-700"],
  "primary-border": "var(--color-indigo-500)",
  "primary-border-faded": palette["indigo-300"],
  "primary-border-hovered": palette["indigo-600"],
  "primary-foreground": "var(--color-indigo-500)",
  "primary-foreground-on-background": "#fff",
  // Secondary -----------------------------------------------------------------
  "secondary-background": palette["teal-500"],
  "secondary-background-faded": palette["teal-100"],
  "secondary-background-hovered": palette["teal-600"],
  "secondary-background-pressed": palette["teal-700"],
  "secondary-border": palette["teal-500"],
  "secondary-border-faded": palette["teal-300"],
  "secondary-border-hovered": palette["teal-600"],
  "secondary-foreground": palette["teal-500"],
  "secondary-foreground-on-background": "#fff",
  // Neutral -------------------------------------------------------------------
  "neutral-background": "var(--color-slate-500)",
  "neutral-background-faded": palette["slate-100"],
  "neutral-background-hovered": palette["slate-600"],
  "neutral-background-pressed": palette["slate-700"],
  "neutral-border": "var(--color-slate-500)",
  "neutral-border-faded": palette["slate-300"],
  "neutral-foreground": "var(--color-slate-600)",
  "neutral-foreground-faded": palette["slate-400"],
  "neutral-foreground-on-background": "#fff",
  // Critical ------------------------------------------------------------------
  "critical-background": "var(--color-red-500)",
  "critical-background-faded": palette["red-100"],
  "critical-background-hovered": palette["red-600"],
  "critical-background-pressed": palette["red-700"],
  "critical-border": "var(--color-red-500)",
  "critical-border-faded": palette["red-300"],
  "critical-border-hovered": palette["red-600"],
  "critical-foreground": "var(--color-red-500)",
  "critical-foreground-on-background": "#fff",
  // Success -------------------------------------------------------------------
  "success-background": "var(--color-green-500)",
  "success-background-faded": palette["green-100"],
  "success-background-hovered": palette["green-600"],
  "success-background-pressed": palette["green-700"],
  "success-border": "var(--color-green-500)",
  "success-border-faded": palette["green-300"],
  "success-border-hovered": palette["green-600"],
  "success-foreground": "var(--color-green-500)",
  "success-foreground-on-background": "#fff",
  // Info ----------------------------------------------------------------------
  "info-background": "var(--color-blue-500)",
  "info-background-faded": palette["blue-100"],
  "info-background-hovered": palette["blue-600"],
  "info-background-pressed": palette["blue-700"],
  "info-border": "var(--color-blue-500)",
  "info-border-faded": palette["blue-300"],
  "info-border-hovered": palette["blue-600"],
  "info-foreground": "var(--color-blue-500)",
  "info-foreground-on-background": "#fff",
  // Warning -------------------------------------------------------------------
  "warning-background": "var(--color-yellow-500)",
  "warning-background-faded": palette["yellow-100"],
  "warning-background-hovered": palette["yellow-600"],
  "warning-background-pressed": palette["yellow-700"],
  "warning-border": "var(--color-yellow-500)",
  "warning-border-faded": palette["yellow-300"],
  "warning-border-hovered": palette["yellow-600"],
  "warning-foreground": "var(--color-yellow-500)",
  "warning-foreground-on-background": "#fff",
};

export const color = {
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
  "foreground-default": palette["gray-900"],
  // Text inverted color
  "foreground-inverted": "#fff",
  // Shadow for subtle depth in UI components
  "shadow": "rgba(0 0 0 / 0.1)",
  // Color used to indicate focus state in interactive elements
  "focus": "var(--color-indigo-500)",
};

export type Skin = keyof typeof skin;
export type Color = keyof typeof color;
