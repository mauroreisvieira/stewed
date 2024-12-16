/**
 * Generates a tuple of numbers from 0 to `N - 1` (exclusive).
 *
 * @template N - The number up to which to generate the sequence (exclusive).
 * @template Acc - The accumulator used to build the sequence (default is an empty array).
 *
 * @returns A union of all numbers from 0 up to `N - 1`.
 */
type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

/**
 * Creates a range of numbers from `F` (inclusive) to `T` (exclusive).
 *
 * This type excludes all numbers from the sequence of `Enumerate<T>` that are also in `Enumerate<F>`,
 * effectively generating a range from `F` to `T` (excluding `F`).
 *
 * @template F - The starting number of the range (inclusive).
 * @template T - The ending number of the range (exclusive).
 *
 * @returns A union of numbers from `F` to `T - 1`.
 */
export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
