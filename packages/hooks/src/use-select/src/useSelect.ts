import { useCallback, useState } from "react";

export interface UseSelect<T> {
  /** The index of the currently selected item. */
  index: number;
  /** The currently selected item from the list. */
  item: T | undefined;
  /** Sets the index of the selected item. */
  setIndex: (newIndex: number) => void;
  /**
   * Sets the selected item based on its value.
   * @param item - The item to set as selected.
   */
  setItem: (newItem: T) => void;
}

/**
 * Hook for managing selection within a list of items.
 *
 * @example
 * ```ts
 *  // Example data
 *  const items = ["Apple", "Banana", "Cherry", "Date"];
 *
 *  // Using hook to manage selection
 *  const { index, item, setIndex, setItem } = useSelect<string>(items);
 * ```
 *
 * @template T - The type of items in the list.
 *
 * @param list - The list of items to select from.
 * @param initialIndex - The initial index of the selected item (default: 0).
 * @returns An object containing selection state and functions to update it.
 */
export function useSelect<T>(list: T[], initialIndex = 0): UseSelect<T> {
  const [index, setIndex] = useState(initialIndex);

  // Sets the selected item based on its value.
  const setItem = useCallback(
    (item: T) => {
      setIndex(list.indexOf(item));
    },
    [list],
  );

  return {
    item: list[index],
    index,
    setIndex,
    setItem,
  };
}
