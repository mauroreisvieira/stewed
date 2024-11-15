import { useCallback, useEffect } from "react";

/**
 * A type representing the valid modifier keys that can be used in combination with
 * other keys to trigger specific actions.
 */
type ModifierKeys = "ctrl" | "cmd" | "shift" | "alt";

export interface UseKeyProps {
  /**
   * A boolean flag to enable or disable the hook's functionality.
   * When `false`, the hook will not listen for key events.
   * @default true
   */
  enabled?: boolean;
  /**
   * An array of keys that the hook should listen for.
   * Each item in the array corresponds to a specific key code (e.g., `ArrowUp`, `Enter`, `KeyA`).
   * The handler will be triggered when any of these keys is pressed.
   * @example ["ArrowUp", "Enter"]
   */
  keys: string[];
  /**
   * An optional array of modifier keys that must be pressed in combination with the specified keys.
   * Valid modifier keys include `ctrl`, `cmd`, `shift`, and `alt`.
   * If no modifiers are provided, the handler will be triggered by the specified keys alone.
   * @example ["ctrl", "shift"]
   */
  modifiers?: Array<ModifierKeys>;
  /**
   * A callback function that is triggered when a specified key (or key combination) is pressed.
   * @param event - The `KeyboardEvent` triggered when one of the specified keys is pressed.
   */
  handler: (event: KeyboardEvent) => void;
}
/**
 * Hook that listens for specific key presses and triggers a callback.
 *
 * @param keys - An array of keys that the hook should listen to.
 * @param enabled - A boolean to enable or disable the hook.
 * @param handler - A callback function that gets called when one of the specified keys is pressed.
 */
export function useKey({ keys, enabled = true, handler, modifiers = [] }: UseKeyProps): void {
  // Handle keydown events and check for modifier key combinations
  const onHandleKeydown = useCallback(
    (event: KeyboardEvent) => {
      // Check if the modifier keys are pressed
      const isCtrl = modifiers.includes("ctrl") ? event.ctrlKey : true;
      const isCmd = modifiers.includes("cmd") ? event.metaKey : true; // `metaKey` for cmd (Mac) or Win key (Windows)
      const isShift = modifiers.includes("shift") ? event.shiftKey : true;
      const isAlt = modifiers.includes("alt") ? event.altKey : true;

      // Check if all specified modifiers are pressed
      const isCombinationValid = modifiers.length === 0 || (isCtrl && isCmd && isShift && isAlt);

      // If the key combination is valid and the key matches, invoke the handler
      if (isCombinationValid && keys.includes(event.code)) {
        handler(event);
      }
    },
    [handler, keys, modifiers],
  );

  useEffect(() => {
    if (!enabled) return;

    // Attach the keydown event listener
    document.addEventListener("keydown", onHandleKeydown);
    // Clean up the event listener when the component unmounts or `isEnabled` changes
    return () => {
      document.removeEventListener("keydown", onHandleKeydown);
    };
  }, [enabled, onHandleKeydown]);
}
