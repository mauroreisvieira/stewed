export const shadow = {
  "none": "none",
  "sm": "0 0 0 1px var(--color-shadow)",
  "md": "0 1px 3px 0 var(--color-shadow), 0 1px 2px -1px var(--color-shadow)",
  "lg": "0 4px 6px -1px var(--color-shadow), 0 2px 4px -2px var(--color-shadow)",
  "xl": "0 10px 15px -3px var(--color-shadow), 0 4px 6px -4px var(--color-shadow)",
  "2xl": "0 20px 25px -5px var(--color-shadow), 0 8px 10px -6px var(--color-shadow)",
  "3xl": "0 25px 50px -12px var(--color-shadow)",
};

export type Shadow = keyof typeof shadow;
