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
 * const { item, index, setItem } = useSelect(["Apple", "Banana", "Cherry"]);
 * setItem("Cherry"); // Selects "Cherry"
 * console.log(item); // Outputs: "Cherry"
 * ```
 *
 * @example
 * ```ts
 * const fruits = [{ name: "Apple" }, { name: "Banana" }, { name: "Cherry" }];
 * const { item, index, setItem } = useSelect(fruits, 0, (a, b) => a.name === b.name);
 * setItem({ name: "Cherry" }); // Selects the object with name "Cherry"
 * console.log(item); // Outputs: { name: "Cherry" }
 * ```
 *
 * @template T - The type of items in the list.
 *
 * @param list - The array of items to select from.
 * @param initialIndex - The initial index of the selected item. Defaults to 0.
 * @param condition - A function to compare two items for equality. Defaults to strict equality (`a === b`).
 * @returns An object containing the current selected item, its index, and functions to update the selection.
 */
export function useSelect<T>(
  list: T[],
  initialIndex = 0,
  condition: (a: T, b: T) => boolean = (a, b) => a === b,
): UseSelect<T> {
  const [index, setIndex] = useState(initialIndex);

  const setItem = useCallback(
    (item: T) => {
      const newIndex = list.findIndex((listItem) => condition(listItem, item));
      if (newIndex !== -1) {
        setIndex(newIndex);
      }
    },
    [list, condition],
  );

  return {
    item: list[index],
    index,
    setIndex,
    setItem,
  };
}
