/**
 * Utility type to make all properties of a given type optional.
 *
 * @template T - The type for which properties should be made optional.
 */
export type Optional<T> = {
  [K in keyof T]?: T[K];
};
