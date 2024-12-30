export const duration = {
  quickly: "200ms",
  normal: "300ms",
  slowly: "400ms"
};

export const timing = {
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  "ease-out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)"
};

/** Type representing the keys of the `duration` object. */
export type Duration = keyof typeof duration;

/** Type representing the keys of the `timing` object. */
export type Timing = keyof typeof timing;
