import { useRef, useEffect } from "react";
import { flushSync } from "react-dom";
// Hooks
import { useNonReactiveCallback } from "../../use-non-reactive-callback";

/**
 * Executes a callback once all animations on the provided element have finished.
 *
 * This hook listens for animations on the given element and ensures that the callback
 * is triggered only after all animations (including transitions) have completed.
 *
 * If the element does not support the `getAnimations` API, the callback is executed immediately.
 *
 * @param element - The element to watch for animations.
 * @param waitForNextTick - If `true`, waits for the next event loop tick before checking animations.
 */
export function useAnimationsFinished(element: HTMLElement | null, waitForNextTick = false) {
  // Stores the requestAnimationFrame ID for cancellation.
  const frameRef = useRef(-1);

  // Stores the timeout ID if `waitForNextTick` is enabled.
  const timeoutRef = useRef(-1);

  // Cancels any pending animation frame or timeout.
  const cancelTasks = useNonReactiveCallback(() => {
    cancelAnimationFrame(frameRef.current);
    clearTimeout(timeoutRef.current);
  });

  // Cleanup on un-mount or ref changes.
  useEffect(() => cancelTasks, [cancelTasks]);

  return useNonReactiveCallback((callback: () => void) => {
    cancelTasks();

    if (!element) {
      return;
    }

    // If the element does not support `getAnimations`, execute the callback immediately.
    if (typeof element.getAnimations !== "function") {
      callback();
    } else {
      // Schedule an animation frame to ensure animations are detected correctly.
      frameRef.current = requestAnimationFrame(() => {
        /**
         * Executes the callback after all animations on the element have finished.
         */
        function exec(): void {
          if (!element) {
            return;
          }

          // Wait for all animations on the element to finish before calling the callback.
          Promise.allSettled(element.getAnimations().map((anim) => anim.finished)).then(() => {
            flushSync(callback); // Ensure the callback runs synchronously to avoid layout shifts.
          });
        }

        // If `waitForNextTick` is enabled, wait for the next event loop tick before executing.
        if (waitForNextTick) {
          timeoutRef.current = window.setTimeout(exec);
        } else {
          exec();
        }
      });
    }
  });
}
