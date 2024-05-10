import { palette } from "./Palette";

export const color = {
  // Global --------------------------------------------------------------------
  "text": "#000",
  "white": "#fff",
  "black": "#000",
  // Backdrop ------------------------------------------------------------------
  "backdrop": "rgb(0 0 0 / 70%)",
  // Focus ---------------------------------------------------------------------
  "focus": palette["primary-300"],
  // palette -------------------------------------------------------------------
  ...palette,
};

export type Color = keyof typeof color;
