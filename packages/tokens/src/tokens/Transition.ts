export const duration = {
  quickly: "200ms",
  normal: "300ms",
  slowly: "400ms",
};

export const timing = {
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
};

export type Duration = keyof typeof duration;
export type Timing = keyof typeof timing;
