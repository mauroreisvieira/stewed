import React, { useCallback, useRef, useState } from "react";

interface UseKeyboardNavigationProps {
  /** The CSS selector string that identifies the elements to navigate. */
  target: string;
  /**
   * Object that maps custom keyboard keys to their navigation directions.
   * Keys are the keyboard event key values, and values are the navigation direction (-1 for backward, 1 for forward).
   */
  keyboardKey?: Record<string, number>;
}

/**
 * Interface for keyboard navigation within a list or collection of elements.
 *
 * @template T - The type of the DOM element to be navigated (e.g., HTMLDivElement, HTMLUListElement).
 */
interface UseKeyboardNavigation<T> {
  /**
   * Reference to the DOM element used for navigation.
   * This ref should be attached to the container element that holds the navigable items.
   */
  ref: React.RefObject<T>;
  /**
   * Event handler function to navigate through keyboard interactions.
   * This function should be called within the `onKeyDown` event handler of the container element.
   *
   * @param {React.KeyboardEvent<T>} event - The keyboard event triggered by user interaction.
   */
  onNavigate: (event: React.KeyboardEvent<T>) => void;
  /**
   * Function to set the focused index of the items.
   * This is useful for programmatically changing the focus to a specific item in the list.
   *
   * @param {number} index - The index of the item to be focused.
   */
  setFocusedIndex: (index: number) => void;
  /**
   * The current focused item's index.
   * This reflects the index of the item that is currently focused within the list.
   */
  currentIndex: number;
}

/**
 * Hook for keyboard navigation within a specified target element.
 *
 * @param {UseKeyboardNavigationProps} props - The props for the hook.
 * @returns {UseKeyboardNavigation<T>} - Returns an object containing the ref and onNavigate function.
 */
export function useKeyboardNavigation<T extends HTMLDivElement>({
  target,
  keyboardKey = {
    ArrowUp: -1,
    ArrowLeft: -1,
    ArrowDown: 1,
    ArrowRight: 1,
  },
}: UseKeyboardNavigationProps): UseKeyboardNavigation<T> {
  // Create a reference to the list element, where `T` is a generic type representing the element type (e.g., HTMLUListElement, HTMLDivElement)
  const listRef = useRef<T>(null);

  // State to track the current index of the focused or selected item within the list
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onHandleKeyDown: React.KeyboardEventHandler<T> = useCallback(
    (event) => {
      // Get the current reference to the list element.
      const list = listRef.current;

      // If the list reference is not available (null or undefined), exit the function.
      if (!list) {
        return;
      }

      // Convert the NodeList of elements matching the 'target' selector into an array of HTMLElements.
      const items = Array.from<HTMLElement>(list.querySelectorAll(target));

      // Find the index of the currently focused item in the items array.
      const index = items.findIndex((item) => item === document.activeElement);

      // Determine the direction of navigation based on the pressed key using the keyboardKey mapping.
      const direction = keyboardKey?.[event.key];

      // If a valid focused item is found (index >= 0) and a direction is defined (not undefined):
      if (index >= 0 && direction !== undefined) {
        // Calculate the next index by adding the direction to the current index and wrapping around
        // using modulo to stay within bounds of the items array length.
        const nextIndex = (index + direction + items.length) % items.length;

        // Update the current index state.
        setCurrentIndex(nextIndex);

        // Focus the item at the calculated next index, if it exists.
        items[nextIndex]?.focus();
      }
    },
    [target],
  );

  const setFocusedIndex = useCallback(
    (index: number) => {
      // Get the current reference to the list element.
      const list = listRef.current;

      // If the list reference is not available (null or undefined), exit the function.
      if (!list) {
        return;
      }

      // Convert the NodeList of elements matching the 'target' selector into an array of HTMLElements.
      const items = Array.from<HTMLElement>(list.querySelectorAll(target));

      // Calculate the next index to focus. Ensure it's within bounds, otherwise, default to 0.
      const nextIndex = index >= 0 && index < items.length ? index : 0;

      // Update the current index state.
      setCurrentIndex(nextIndex);

      // Focus the item at the next index, if it exists.
      items[nextIndex]?.focus();
    },
    [target],
  );

  return {
    ref: listRef,
    onNavigate: onHandleKeyDown,
    setFocusedIndex,
    currentIndex,
  };
}
