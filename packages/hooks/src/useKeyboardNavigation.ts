import React, { useCallback, useRef } from "react";

interface UseKeyboardNavigationProps {
  /** The CSS selector string that identifies the elements to navigate. */
  target: string;
}

interface UseKeyboardNavigation<T> {
  /** Reference to the DOM element to be used for navigation. */
  ref?: React.RefObject<T>;
  /** Event handler function to navigate through keyboard interactions. */
  onNavigate?: (event: React.KeyboardEvent<T>) => void;
}

/**
 * A custom hook for keyboard navigation within a specified target element.
 *
 * @param {UseKeyboardNavigationProps} props - The props for the hook.
 * @returns {UseKeyboardNavigation<T>} - Returns an object containing the ref and onNavigate function.
 */
export function useKeyboardNavigation<T extends HTMLDivElement>({
  target,
}: UseKeyboardNavigationProps): UseKeyboardNavigation<T> {
  const listRef = useRef<T>(null);

  /**
   * Handles keyboard events for navigation.
   * @param {React.KeyboardEvent<T>} event - The keyboard event.
   */
  const onHandleKeyDown = useCallback(
    (event: React.KeyboardEvent<T>) => {
      const list = listRef.current;
      if (!list) return;

      const items = Array.from<HTMLElement>(list.querySelectorAll(target));
      const index = items.findIndex((item) => item === document.activeElement);

      if (index === -1) return;

      const direction = {
        ArrowUp: -1,
        ArrowLeft: -1,
        ArrowDown: 1,
        ArrowRight: 1,
      }[event.key];

      if (direction !== undefined) {
        const next = (index + direction + items.length) % items.length;
        items[next]?.focus();
      }
    },
    [target],
  );

  return {
    ref: listRef,
    onNavigate: onHandleKeyDown,
  };
}
