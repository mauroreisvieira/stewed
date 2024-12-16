/**
 * Merges two types, `T` and `U`, by excluding properties from `T` that are present in `U` and then combining them with `U`.
 * This ensures that properties from `U` override those from `T` if they share the same key.
 *
 * @template T - The first type to merge.
 * @template U - The second type to merge.
 * @returns A new type that combines `T` and `U`, with `U`'s properties overriding `T`'s.
 */
export type Merge<T, U> = Omit<T, keyof U> & U;
