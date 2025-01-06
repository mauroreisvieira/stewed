/**
 * Retrieves the entries of an object and returns them as an array of key-value pairs.
 *
 * @typeParam T - The type of the input object.
 *
 * @param obj - The object whose entries to retrieve.
 * @returns An array containing the key-value pairs of the input object.
 *
 * @remarks
 * This function takes an object as input and returns an array containing
 * the key-value pairs of the object.
 *
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * const entries = objectEntries(obj); // entries is [['a', 1], ['b', 2], ['c', 3]]
 * ```
 */
export const objectEntries = Object.entries as <T>(obj: T) => Array<[keyof T, T[keyof T]]>;

/**
 * Retrieves the keys of an object and returns them as an array.
 *
 * @typeParam T - The type of the input object.
 *
 * @param obj - The object whose keys to retrieve.
 * @returns An array containing the keys of the input object.
 *
 * @remarks
 * This function takes an object as input and returns an array containing
 * the keys of the object.
 *
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * const keys = objectKeys(obj); // keys is ['a', 'b', 'c']
 * ```
 */
export const objectKeys = Object.keys as <T>(obj: T) => Array<keyof T>;

/**
 * Retrieves the values of an object and returns them as an array.
 *
 * @typeParam T - The type of the input object.
 *
 * @param obj - The object whose values to retrieve.
 * @returns An array containing the values of the input object.
 *
 * @remarks
 * This function takes an object as input and returns an array containing
 * the values of the object.
 *
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * const values = objectValues(obj); // values is [1, 2, 3]
 * ```
 */
export const objectValues = Object.values as <T>(obj: T) => Array<T[keyof T]>;
