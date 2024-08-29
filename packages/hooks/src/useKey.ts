import { useCallback, useEffect, useState } from "react";

// A type representing the allowed keys that can be listened to.
type KeysAllowed =
  | "Enter"
  | "Tab"
  | "Space"
  | "Escape"
  | "Backspace"
  | "Delete"
  | "ShiftLeft"
  | "ShiftRight"
  | "ControlLeft"
  | "ControlRight"
  | "AltLeft"
  | "AltRight"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowUp"
  | "PageUp"
  | "PageDown";

interface UseKeyProps {
  /** A boolean to enable or disable the hook. */
  enabled: boolean;
  /** An array of keys that the hook should listen to. */
  keys: KeysAllowed[];
  /**
   * A callback function that gets called when one of the specified keys is pressed.
   * @param event - The keyboard event
   */
  callback: (event: KeyboardEvent) => void;
}

/**
 * Hook that listens for specific key presses and triggers a callback.
 *
 * @param keys - An array of keys that the hook should listen to.
 * @param enabled - A boolean to enable or disable the hook.
 * @param callback - A callback function that gets called when one of the specified keys is pressed.
 */
export function useKey({ keys, enabled, callback }: UseKeyProps): void {
  // State to manage whether the key listener is enabled
  const [isEnabled, setIsEnabled] = useState(enabled);

  // Handler that triggers the callback when a specified key is pressed
  const onHandleKeydown = useCallback(
    (event: KeyboardEvent) => {
      // Cast the event's key code to the expected `KeysAllowed` type
      const codeEvt = event.code as KeysAllowed;
      // Check if the pressed key matches any key in the `keys` array
      if (keys.includes(codeEvt)) {
        // Execute the callback function with the detected key code
        callback(event);
      }
    },
    [callback, keys],
  );

  // Update the internal `isEnabled` state whenever the `enabled` prop changes
  useEffect(() => {
    setIsEnabled(enabled);
  }, [enabled]);

  useEffect(() => {
    // If the hook is not enabled, do nothing
    if (!isEnabled) {
      return;
    }

    // Attach the keydown event listener when the component mounts
    document.addEventListener("keydown", onHandleKeydown);
    // Clean up the event listener when the component unmounts or `isEnabled` changes
    return () => {
      document.removeEventListener("keydown", onHandleKeydown);
    };
  }, [isEnabled, onHandleKeydown]);
}
