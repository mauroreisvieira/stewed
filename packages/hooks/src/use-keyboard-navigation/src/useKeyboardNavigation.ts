import React, { useCallback, useRef, useState } from "react";

interface UseKeyboardNavigationProps {
  /** The CSS selector string that identifies the elements to navigate. */
  target: string;
  /**
   * Object that maps custom keyboard keys to their navigation directions.
   * Keys are the keyboard event key values, and values are the navigation direction (-1 for backward, 1 for forward).
   */
  key?: Record<string, number>;
  /** Determines whether navigation should wrap around when reaching the start or end of the list. */
  loop?: boolean;
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
   * Function to set the first focusable element within the container as focused.
   * Typically used to ensure that the first item in the list is focused when the component is initialized.
   */
  setFirstElementFocusable: () => void;
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
  key = {
    ArrowUp: -1,
    ArrowLeft: -1,
    ArrowDown: 1,
    ArrowRight: 1,
  },
  loop = true,
}: UseKeyboardNavigationProps): UseKeyboardNavigation<T> {
  // Create a reference to the list element, where `T` is a generic type representing the element type (e.g., HTMLUListElement, HTMLDivElement)
  const listRef = useRef<T>(null);

  // State to track the current index of the focused or selected item within the list
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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

      // Calculate the next index to focus.
      let nextIndex = index >= 0 && index < items.length ? index : 0;

      // If looping is enabled and we're at the end, wrap around to the start
      if (loop) {
        nextIndex = (index + items.length) % items.length;
      } else {
        // If looping is disabled, don't go beyond the bounds
        nextIndex = index >= 0 && index < items.length ? index : currentIndex;
      }

      // Update the current index state.
      setCurrentIndex(nextIndex);

      // Focus the item at the next index, if it exists.
      items[nextIndex]?.focus();
    },
    [target, loop, currentIndex],
  );

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

      // Determine the direction of navigation based on the pressed key using the key mapping.
      const direction = key?.[event.key];

      // If a valid focused item is found (index >= 0) and a direction is defined (not undefined):
      if (index >= 0 && direction !== undefined) {
        // Calculate the next index
        let nextIndex: number;

        if (loop) {
          // If looping is enabled, wrap around using modulo operation
          nextIndex = (index + direction + items.length) % items.length;
        } else {
          // If looping is disabled, stay within bounds
          nextIndex = Math.max(0, Math.min(index + direction, items.length - 1));
        }

        // Update the current index state.
        setFocusedIndex(nextIndex);
      }
    },
    [key, loop, setFocusedIndex, target],
  );

  // Sets the first element with `[aria-selected="true"]` as focusable, or the first item if none found.
  const setFirstElementFocusable = useCallback(() => {
    // Get the current reference to the list element.
    const list = listRef.current;

    // If the list reference is not available (null or undefined), exit the function.
    if (!list) {
      return;
    }

    // Convert the NodeList of elements matching the 'target' selector into an array of HTMLElements.
    const items = Array.from<HTMLElement>(list.querySelectorAll(target));

    // Try to find the first item with `aria-selected="true"`.
    const selectedIndex = items.findIndex((item) => item.getAttribute("aria-selected") === "true");

    setFocusedIndex(selectedIndex);
  }, [target, setFocusedIndex]);

  return {
    ref: listRef,
    onNavigate: onHandleKeyDown,
    setFocusedIndex,
    currentIndex,
    setFirstElementFocusable,
  };
}
