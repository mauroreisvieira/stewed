export const fontFamily = {
  base: "system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
  sans: "system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
  serif: "Georgia Cambria, Times New Roman, Times, serif",
  mono: "Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
};

/** Type representing the keys of the `fontFamily` object. */
export type FontFamily = keyof typeof fontFamily;
