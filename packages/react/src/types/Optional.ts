/**
 * Utility type to make all properties of a given type optional.
 *
 * @template T - The type for which properties should be made optional.
 */
export type Optional<T> = {
  [K in keyof T]?: T[K];
};

/**
 * Utility type to make all properties of a deeply nested object optional.
 * @template T - The type for which properties should be made optional.
 */
export type DeepOptional<T> = {
  [K in keyof T]?: T[K] extends object ? MakeDeepOptional<T[K]> : T[K];
};
