import { useCallback, useRef, useState, type KeyboardEventHandler } from "react";

/**
 * Props for managing keyboard navigation in a component.
 * This can be used to handle navigation through a list of items or controls using the keyboard.
 */
export interface UseKeyboardNavigationProps {
  /** The CSS selector string that identifies the elements to navigate. */
  target: string;
  /**
   * A list of CSS selectors used to determine which elements are focusable/selectable within the navigation container.
   *
   * @default [[href]", "button", "input", "select", "textarea", "[tabindex]", "[controls]"]
   */
  matchSelectors?: string[];
  /**
   * Object that maps custom keyboard keys to their navigation directions.
   * Keys are the keyboard event key values, and values are the navigation direction (-1 for backward, 1 for forward).
   */
  keys?: Record<string, number>;
  /**
   * Determines whether navigation should wrap around when reaching the start or end of the list.
   * @default true
   */
  loop?: boolean;
  /**
   * Automatically calls `scrollIntoView` on the focused item during navigation.
   * Set to `false` to manage scrolling manually or avoid layout shifts.
   * @default true
   */
  autoScroll?: boolean;
  /**
   * Specifies whether the default browser action should be prevented for the keys defined in the `key` prop.
   * When set to `true`, `preventDefault` is applied to these keys during navigation.
   * @default false
   */
  preventDefaultOnKey?: boolean;
  /**
   * Enables virtual focus management within the combobox.
   * When `true`, focus is tracked virtually (e.g., with `aria-activedescendant`) instead of moving DOM focus.
   * Useful for screen reader compatibility in custom listbox implementations.
   * @default true
   */
  virtualFocus?: boolean;
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
interface IUseKeyboardNavigation<T> {
  /**
   * Reference to the DOM element used for navigation.
   * This ref should be attached to the container element that holds the navigable items.
   */
  ref: React.RefObject<T>;
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
   * Focuses the first focusable element within the container.
   * Useful for initializing focus to the top of a list or group on mount or open.
   */
  setFirstElementFocusable: () => void;
  /**
   * Focuses the last focusable element within the container.
   * Useful for reverse navigation or setting focus to the bottom of a list or group.
   */
  setLastElementFocusable: () => void;
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
 * @returns {IUseKeyboardNavigation<T>} - Returns an object containing the ref and onNavigate function.
 */
export function useKeyboardNavigation<T extends HTMLDivElement>({
  target,
  keys = {
    ArrowUp: -1,
    ArrowLeft: -1,
    ArrowDown: 1,
    ArrowRight: 1
  },
  preventDefaultOnKey = false,
  autoScroll = true,
  loop = true,
  virtualFocus = true,
  matchSelectors = [
    "[role='option']", // Option role
    "[href]", // Links.
    "button", // Buttons.
    "input", // Inputs (e.g., text fields).
    "select", // Select.
    "textarea", // Text areas.
    "[tabindex]", // Any element with a tab-index.
    "[controls]" // Elements with `controls` attribute (e.g., video/audio players).
  ],
  condition = () => true
}: UseKeyboardNavigationProps): IUseKeyboardNavigation<T> {
  // Create a reference to the list element, where `T` is a generic type representing the element type (e.g., HTMLUListElement, HTMLDivElement)
  const listRef = useRef<T>(null);

  // State to track the current index of the focused or selected item within the list
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  /** Helper function to retrieve all selectable items within the list element using the target selector. */
  const getSelectableItems = useCallback((): HTMLElement[] => {
    // If the list is not available, return an empty array.
    return listRef.current ? Array.from<HTMLElement>(listRef.current.querySelectorAll(target)) : [];
  }, [target]);

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
      // Retrieve all selectable items using the helper function.
      const items = getSelectableItems();

      // If no items are found, exit early.
      if (items.length === 0) {
        return;
      }

      // Calculate the next index based on the provided index and looping settings.
      const nextIndex = loop
        ? (index + items.length) % items.length // Loop around if needed.
        : Math.max(0, Math.min(index, items.length - 1)); // Clamp within bounds if looping is disabled.

      // Update the current index state.
      setCurrentIndex(nextIndex);

      // Get the item at the target index
      const el = items[nextIndex];

      // Bail if item doesn't exist
      if (!el) {
        return;
      }

      if (!virtualFocus) {
        // Move actual DOM focus to the item if not using virtual focus
        el.focus();
      }

      if (autoScroll) {
        // Ensure the item is visible within the scrollable container
        el.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    },
    [getSelectableItems, loop, virtualFocus, autoScroll]
  );

  // Handles keyboard navigation to move focus based on key presses.
  const onHandleKeyDown: KeyboardEventHandler<T> = useCallback(
    (event) => {
      if (preventDefaultOnKey && Object.keys(keys).includes(event.key)) {
        event.preventDefault();
      }

      // Get the current reference to the list element.
      if (!listRef) {
        return;
      }

      // Retrieve all selectable items using the helper function.
      const items = getSelectableItems();

      // Find the index of the currently focused element in the items array.
      const index = virtualFocus
        ? (currentIndex ?? -1)
        : items.findIndex((item) => item === document.activeElement);

      // Determine the navigation direction based on the pressed key using the key mapping.
      const direction = keys?.[event.key];

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
    [
      preventDefaultOnKey,
      keys,
      getSelectableItems,
      virtualFocus,
      currentIndex,
      calculateNextIndex,
      loop,
      condition,
      setFocusedIndex
    ]
  );

  // Finds the index of the first or last focusable element within a list of items.
  const findFocusableIndex = useCallback(
    (direction: "first" | "last"): number => {
      // Retrieve all selectable items using the helper function.
      const items = getSelectableItems();

      const len = items.length;

      const isDisabled = (el: HTMLElement) =>
        el.hasAttribute("disabled") || el.getAttribute("aria-disabled") === "true";

      const isFocusable = (item: HTMLElement) =>
        !isDisabled(item) && item.matches(matchSelectors.join(", "));

      const step = direction === "first" ? 1 : -1;
      let i = direction === "first" ? 0 : len - 1;

      while (i >= 0 && i < len) {
        const item = items[i];
        if (item && isFocusable(item)) {
          return i;
        }

        i += step;
      }

      return -1;
    },
    [matchSelectors, getSelectableItems]
  );

  // Sets focus to the first focusable item within the target container.
  // Priority is given to selected/pressed/checked elements; falls back to default focusables.
  const setFirstElementFocusable = useCallback(() => {
    const index = findFocusableIndex("first");

    if (condition?.(index) && index !== -1) {
      setFocusedIndex(index);
    }
  }, [findFocusableIndex, condition, setFocusedIndex]);

  // Sets focus to the last focusable item within the target container.
  // Priority is given to selected/pressed/checked elements; falls back to default focusables.
  const setLastElementFocusable = useCallback(() => {
    const index = findFocusableIndex("last");

    if (condition?.(index) && index !== -1) {
      setFocusedIndex(index);
    }
  }, [setFocusedIndex, condition, findFocusableIndex]);

  return {
    ref: listRef,
    onNavigate: onHandleKeyDown,
    setFocusedIndex,
    currentIndex,
    setFirstElementFocusable,
    setLastElementFocusable
  };
}
