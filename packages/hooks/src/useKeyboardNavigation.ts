import React, { useCallback, useRef } from "react";

interface UseKeyboardNavigationProps {
  /** The CSS selector string that identifies the elements to navigate. */
  target: string;
  /**
   * Object that maps custom keyboard keys to their navigation directions.
   * Keys are the keyboard event key values, and values are the navigation direction (-1 for backward, 1 for forward).
   */
  keyboardKey?: Record<string, number>;
}

interface UseKeyboardNavigation<T> {
  /** Reference to the DOM element to be used for navigation. */
  ref: React.RefObject<T>;
  /**
   * Event handler function to navigate through keyboard interactions.
   *
   * @param {React.KeyboardEvent<T>} event - The keyboard event.
   */
  onNavigate: (event: React.KeyboardEvent<T>) => void;
  /**
   * Function to set the focused index of the items.
   *
   * @param {number} index - The index to be focused.
   */
  setFocusedIndex: (index: number) => void;
  /**
   * Function to get the current focused item's index.
   *
   * @returns {number} The current focused item's index.
   */
  getCurrentIndex: () => number;
  /**
   * Function to get the total count of items.
   *
   * @returns {number} The total number of items.
   */
  getItemCount: () => number;
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
  const listRef = useRef<T>(null);

  const getCurrentIndex = useCallback((): number => {
    const list = listRef.current;

    if (!list) {
      return -1;
    }

    const items = Array.from<HTMLElement>(list.querySelectorAll(target));
    return items.findIndex((item) => item === document.activeElement);
  }, [target]);

  const getItemCount = useCallback((): number => {
    const list = listRef.current;

    if (!list) {
      return 0;
    }

    const items = Array.from<HTMLElement>(list.querySelectorAll(target));
    return items.length;
  }, [target]);

  const onHandleKeyDown: React.KeyboardEventHandler<T> = useCallback(
    (event) => {
      const list = listRef.current;

      if (!list) {
        return;
      }

      const items = Array.from<HTMLElement>(list.querySelectorAll(target));
      const currentIndex = items.findIndex((item) => item === document.activeElement);

      const direction = keyboardKey?.[event.key];

      if (currentIndex !== -1 && direction !== undefined) {
        const next = (currentIndex + direction + items.length) % items.length;
        items[next]?.focus();
      }
    },
    [target],
  );

  const setFocusedIndex = useCallback(
    (index: number) => {
      const list = listRef.current;

      if (!list) {
        return;
      }

      const items = Array.from<HTMLElement>(list.querySelectorAll(target));
      if (index >= 0 && index < items.length) {
        items[index]?.focus();
      }
    },
    [target],
  );

  return {
    ref: listRef,
    onNavigate: onHandleKeyDown,
    setFocusedIndex,
    getCurrentIndex,
    getItemCount,
  };
}
