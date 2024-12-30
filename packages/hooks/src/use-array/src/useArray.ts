import { useState } from "react";

export interface UseArrayProps<T> {
  /** The initial array value. */
  defaultValue: T[];
  /** A function to compare elements for equality. */
  comparator?: (a: T, b: T) => boolean;
}

export interface UseArray<T> {
  /** The current state of the array. */
  array: T[];
  /**
   * Function to set the entire array state.
   * @param newArray - The new array to set as the state.
   */
  set: (newArray: T[]) => void;
  /**
   * Adds a new element to the array.
   * @param element - The element to add.
   */
  push: (element: T) => void;
  /**
   * Checks if the array contains a specific element.
   * If the element is an object, the provided comparison function will be used.
   *
   * @param element - The element to check for.
   * @returns True if the element exists in the array; otherwise, false.
   */
  contains: (element: T) => boolean;
  /**
   * Filters the array based on a callback function.
   * @param callback - A function to test each element of the array.
   */
  filter: (callback: (value: T, index: number, array: T[]) => boolean) => void;
  /**
   * Updates an element in the array at a specific index.
   * @param index - The index of the element to update.
   * @param newElement - The new element to replace the old one.
   */
  update: (index: number, newElement: T) => void;
  /**
   * Removes an element from the array at a specific index.
   * @param index - The index of the element to remove.
   */
  remove: (index: number) => void;
  /**
   * Push an element in the array, if the element exists, it will be removed.
   * Otherwise, it will be added.
   *
   * @param element - The element to push or remove.
   */
  pushOrRemove: (element: T) => void;
  /** Clears all elements from the array. */
  clear: () => void;
}

/**
 * Hook created to simplify array management in React components.
 * It provides a set of functions and state management specifically designed for working with arrays, making your code cleaner and more organized.
 *
 * @template T - The type of the array elements.
 *
 * @param defaultValue - The initial value of the array.
 * @returns An object with the current array and utility functions to manage it.
 */
export function useArray<T>({ defaultValue, comparator }: UseArrayProps<T>): UseArray<T> {
  // State to hold the array
  const [array, setArray] = useState<T[]>(defaultValue);

  /**
   * Adds a new element to the array.
   * @param element - The element to add.
   */
  function push(element: T): void {
    setArray((a) => [...a, element]);
  }

  /**
   * Checks if the array contains a specific element.
   * If the element is an object, the provided comparator will be used.
   *
   * @param element - The element to check for.
   * @returns True if the element exists in the array; otherwise, false.
   */
  function contains(element: T): boolean {
    if (comparator) {
      return array.some((item) => comparator(item, element));
    }

    return array.includes(element);
  }

  /**
   * Filters the array based on a callback function.
   * @param callback - A function to test each element of the array.
   */
  function filter(callback: (value: T, index: number, array: T[]) => boolean): void {
    setArray((a) => a.filter(callback));
  }

  /**
   * Updates an element in the array at a specific index.
   * @param index - The index of the element to update.
   * @param newElement - The new element to replace the old one.
   */
  function update(index: number, newElement: T): void {
    setArray((a) => [...a.slice(0, index), newElement, ...a.slice(index + 1, a.length)]);
  }

  /**
   * Removes an element from the array at a specific index.
   * @param index - The index of the element to remove.
   */
  function remove(index: number): void {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }

  /**
   * Toggles the presence of an element in the array.
   * If the element exists, it will be removed.
   * Otherwise, it will be added.
   *
   * @param element - The element to push or remove.
   */
  function pushOrRemove(element: T): void {
    setArray((a) => {
      if (contains(element)) {
        return comparator
          ? a.filter((item) => !comparator(item, element))
          : a.filter((e) => e !== element);
      }

      return [...a, element];
    });
  }

  /**
   * Clears all elements from the array.
   */
  function clear(): void {
    setArray([]);
  }

  // Return the array and utility functions
  return {
    array,
    set: setArray,
    push,
    contains,
    filter,
    update,
    remove,
    pushOrRemove,
    clear
  };
}
