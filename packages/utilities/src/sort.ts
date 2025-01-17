// Define sorting directions as a constant object
export const SortDirection = {
  ASC: "ASC",
  DESC: "DESC"
} as const;

/** Define a type alias for the sorting directions, allowing only 'asc' or 'desc' */
export type TSortDirection = (typeof SortDirection)[keyof typeof SortDirection];

/**
 * Represents the properties required to sort a collection of items based on a specific column and direction.
 *
 * @template T - The type of the items in the collection.
 */
export interface SortDataProps<T> {
  /** The array of items to be sorted. */
  items: T[];
  /**
   * The key of the column in the items to sort by.
   * This key must exist in the type `T`.
   */
  column: keyof T;
  /** The direction to sort the items, either ascending or descending. */
  direction: TSortDirection;
}

/**
 * Sorts an array of items based on a specified column and direction.
 *
 * @template T - The type of the items being sorted.
 *
 * @param {T[]} params.items - The array of items to be sorted.
 * @param {keyof T} params.column - The key of the column to sort by.
 * @param {TSortDirection} params.direction - The direction to sort ('asc' or 'desc').
 * @returns {T[]} - The sorted array of items.
 */
export function sortData<T>({ items, column, direction }: SortDataProps<T>): T[] {
  return [...items].sort((a, b) => {
    // Extract the values of the sorted column for the current items
    const aValue = a[column];
    const bValue = b[column];

    // If both values are undefined or null, treat them as equal
    if (aValue === null && bValue === null) {
      return 0;
    }

    // If only aValue is undefined or null, place it after bValue based on sort direction
    if (aValue === null) {
      return direction === SortDirection.ASC ? 1 : -1;
    }

    // If only bValue is undefined or null, place it after aValue based on sort direction
    if (bValue === null) {
      return direction === SortDirection.ASC ? -1 : 1;
    }

    // Compare strings
    if (typeof aValue === "string" && typeof bValue === "string") {
      const compareResult = aValue.localeCompare(bValue);

      return direction === SortDirection.ASC ? compareResult : -compareResult;
    }

    // Compare numbers
    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === SortDirection.ASC ? aValue - bValue : bValue - aValue;
    }

    // Compare dates
    if (aValue instanceof Date && bValue instanceof Date) {
      return direction === SortDirection.ASC
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    // If values are of different types or not directly comparable, treat them as equal
    return 0;
  });
}
