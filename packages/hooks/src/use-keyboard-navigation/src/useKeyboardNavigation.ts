import { useCallback, useRef, useState, type RefObject, type KeyboardEventHandler } from "react";

/**
 * Props for managing keyboard navigation in a component.
 * This can be used to handle navigation through a list of items or controls using the keyboard.
 */
export interface UseKeyboardNavigationProps {
  /** The CSS selector string that identifies the elements to navigate. */
  target: string;
  /**
   * Object that maps custom keyboard keys to their navigation directions.
   * Keys are the keyboard event key values, and values are the navigation direction (-1 for backward, 1 for forward).
   */
  key?: Record<string, number>;
  /**
   * Determines whether navigation should wrap around when reaching the start or end of the list.
   * @default true
   */
  loop?: boolean;
  /**
   * A function defining the condition for the navigation.
   * @param nextIndex - Index of next focused item.
   */
  condition?: (nextIndex: number) => boolean;
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
  ref: RefObject<T | null>;
  /**
   * Event handler function to navigate through keyboard interactions.
   * This function should be called within the `onKeyDown` event handler of the container element.
   *
   * @param event - The keyboard event triggered by user interaction.
   */
  onNavigate: KeyboardEventHandler<T>;
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
    ArrowRight: 1
  },
  loop = true,
  condition = () => true
}: UseKeyboardNavigationProps): UseKeyboardNavigation<T> {
  // Create a reference to the list element, where `T` is a generic type representing the element type (e.g., HTMLUListElement, HTMLDivElement)
  const listRef = useRef<T>(null);

  // State to track the current index of the focused or selected item within the list
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  /** Helper function to retrieve all selectable items within the list element using the target selector. */
  const getSelectableItems = (list: HTMLElement | null, target: string): HTMLElement[] => {
    // If the list is not available, return an empty array.
    return list ? Array.from<HTMLElement>(list.querySelectorAll(target)) : [];
  };

  // Helper function to calculate the next index for focus navigation.
  // Handles looping (wrapping around) or clamping within bounds if looping is disabled.
  const calculateNextIndex = useCallback(
    (currentIndex: number, direction: number, itemCount: number, loop: boolean): number => {
      if (loop) {
        // If looping is enabled, wrap around using modulo arithmetic.
        return (currentIndex + direction + itemCount) % itemCount;
      }

      // If looping is disabled, ensure the index stays within the valid range.
      return Math.max(0, Math.min(currentIndex + direction, itemCount - 1));
    },
    []
  );

  // Sets focus on the item at the specified index, updating the state and handling looping if enabled.
  const setFocusedIndex = useCallback(
    (index: number) => {
      // Get the current reference to the list element.
      const list = listRef.current;

      // Retrieve all selectable items using the helper function.
      const items = getSelectableItems(list, target);

      // If no items are found, exit early.
      if (items.length === 0) return;

      // Calculate the next index based on the provided index and looping settings.
      const nextIndex = loop
        ? (index + items.length) % items.length // Loop around if needed.
        : Math.max(0, Math.min(index, items.length - 1)); // Clamp within bounds if looping is disabled.

      // Update the current index state.
      setCurrentIndex(nextIndex);

      // Focus the item at the calculated index, if it exists.
      items[nextIndex]?.focus();
    },
    [target, loop]
  );

  // Handles keyboard navigation to move focus based on key presses.
  const onHandleKeyDown: KeyboardEventHandler<T> = useCallback(
    (event) => {
      // Get the current reference to the list element.
      const list = listRef.current;

      // Retrieve all selectable items using the helper function.
      const items = getSelectableItems(list, target);

      // Find the index of the currently focused element in the items array.
      const index = items.findIndex((item) => item === document.activeElement);

      // Determine the navigation direction based on the pressed key using the key mapping.
      const direction = key?.[event.key];

      // Proceed only if a valid index and direction are found.
      if (index >= 0 && direction !== undefined) {
        // Calculate the next index for focus navigation.
        const nextIndex = calculateNextIndex(index, direction, items.length, loop);

        // Check any additional conditions for focusing the next element.
        if (condition?.(nextIndex)) {
          // Update the focused index if the condition is met.
          setFocusedIndex(nextIndex);
        }
      }
    },
    [calculateNextIndex, condition, key, loop, setFocusedIndex, target]
  );

  // Sets the first focusable element based on custom criteria or defaults to the first selectable item.
  const setFirstElementFocusable = useCallback(() => {
    // Get the current reference to the list element.
    const list = listRef.current;

    // Retrieve all selectable items using the helper function.
    const items = getSelectableItems(list, target);

    // Find the index of the first item with `aria-selected="true"` or `aria-checked="true"`.
    let selectedIndex = items.findIndex(
      (item) =>
        item.getAttribute("aria-selected") === "true" ||
        item.getAttribute("aria-pressed") === "true" ||
        item.getAttribute("aria-checked") === "true"
    );

    // If no such item is found, default to the first selectable item using predefined selectors.
    if (selectedIndex === -1) {
      const selectableSelectors = [
        "[href]", // Links.
        "button", // Buttons.
        "input", // Inputs (e.g., text fields).
        "select", // Dropdowns.
        "textarea", // Text areas.
        "[tabindex]", // Any element with a tabindex.
        "[controls]" // Elements with `controls` attribute (e.g., video/audio players).
      ].join(", ");

      // Find the index of the first element matching the selectable selectors.
      selectedIndex = items.findIndex((item) => item.matches(selectableSelectors));
    }

    // If a valid item is found, set its index as the focused index.
    if (selectedIndex !== -1) {
      setFocusedIndex(selectedIndex);
    }
  }, [target, setFocusedIndex]);

  return {
    ref: listRef,
    onNavigate: onHandleKeyDown,
    setFocusedIndex,
    currentIndex,
    setFirstElementFocusable
  };
}
