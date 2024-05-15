import { palette } from "./Palette";

export const color = {
  // Schema --------------------------------------------------------------------
  shadow: "rgba(0 0 0 / 0.1)",
  background: "#fff",
  inverted: "#000",
  // Global --------------------------------------------------------------------
  text: "#000",
  white: "#fff",
  black: "#000",
  // Backdrop ------------------------------------------------------------------
  overlay: "rgb(0 0 0 / 70%)",
  // Focus ---------------------------------------------------------------------
  focus: "var(--color-primary)",
  // palette -------------------------------------------------------------------
  ...palette,
};

export type Color = keyof typeof color;
