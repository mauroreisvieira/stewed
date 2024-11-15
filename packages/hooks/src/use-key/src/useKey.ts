import { useCallback, useEffect } from "react";

export interface UseKeyProps {
  /**
   * A boolean flag to enable or disable the hook's functionality.
   * @default true
   */
  enabled?: boolean;
  /**
   * An array of key combinations that the hook should listen for.
   * Each item in the array corresponds to a key combination string (e.g., `alt+b`, `cmd+alt+b`).
   * The handler will be triggered when any of these key combinations is pressed.
   * @example ["alt+b", "ctrl+s"]
   */
  keys: string[];
  /**
   * A callback function that is triggered when a specified key (or key combination) is pressed.
   * @param event - The `KeyboardEvent` triggered when one of the specified keys is pressed.
   */
  handler: (event: KeyboardEvent) => void;
}

/**
 * Hook that listens for specific key presses and triggers a callback.
 *
 * @param keys - An array of key combinations that the hook should listen to.
 * @param enabled - A boolean to enable or disable the hook.
 * @param handler - A callback function that gets called when one of the specified keys is pressed.
 */
export function useKey({ keys, enabled = true, handler }: UseKeyProps): void {
  // Handle keydown events and check for modifier key combinations
  const onHandleKeydown = useCallback(
    (event: KeyboardEvent) => {
      // Loop through all key combinations provided
      for (const keyCombination of keys) {
        // Split key combination into modifiers and main key
        const parts = keyCombination.split("+");

        // Extract the main key (the last part in the split array)
        const mainKey = parts.pop();

        // Check if the key matches and if the correct modifiers are pressed
        const isCtrl = parts.includes("ctrl") ? event.ctrlKey : true;
        // `metaKey` for cmd (Mac) or Win key (Windows)
        const isCmd = parts.includes("cmd") || parts.includes("win") ? event.metaKey : true;
        const isShift = parts.includes("shift") ? event.shiftKey : true;
        const isAlt = parts.includes("alt") ? event.altKey : true;

        // If no modifiers are present, allow for simple key press (ArrowUp, Enter, etc.)
        if (parts.length === 0) {
          if (event.code === mainKey || event.key === mainKey) {
            handler(event);
            // Exit loop once handler is called for the matching key
            break;
          }
        } else {
          // Check if all specified modifiers are pressed and the main key matches
          if (
            isCtrl &&
            isCmd &&
            isShift &&
            isAlt &&
            (event.code === mainKey || event.key === mainKey)
          ) {
            handler(event);
            // Exit loop once handler is called for the first matching key
            break;
          }
        }
      }
    },
    [handler, keys],
  );

  useEffect(() => {
    if (!enabled) return;

    // Attach the keydown event listener
    document.addEventListener("keydown", onHandleKeydown);

    // Clean up the event listener when the component unmounts or `enabled` changes
    return () => {
      document.removeEventListener("keydown", onHandleKeydown);
    };
  }, [enabled, onHandleKeydown]);
}
