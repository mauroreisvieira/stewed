/**
 * Concatenates and returns a string of non-falsy class names.
 *
 * @param classes An array of class names or falsy values.
 * @returns A string of concatenated non-falsy class names.
 */
export function classNames(...classes: (false | null | undefined | string)[]): string {
  return classes.filter(Boolean).join(" ");
}
