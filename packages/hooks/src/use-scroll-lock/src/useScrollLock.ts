import { useEffect } from "react";

interface UseScrollLockProps {
  /**
   * A boolean indicating whether the scroll lock should be active.
   * @default true
   */
  enabled?: boolean;
}

/**
 * A hook to manage scroll lock.
 *
 * @param {UseScrollLockProps} props - The props object containing configuration for scroll lock.
 */
export function useScrollLock({ enabled = true }: UseScrollLockProps) {
  // Adds class name to document body when an overlay is active
  useEffect(() => {
    // Save the original overflow style of the document body.
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (enabled) {
      // If `enabled` is true, prevent scrolling by setting the body's overflow style to "hidden".
      document.body.style.overflow = "hidden";
    } else {
      // If `enabled` is false, reset any paddingRight style previously applied to the body.
      document.body.style.paddingRight = "";
    }

    // Cleanup function to restore the original overflow style when the effect is cleaned up or `enabled` changes.
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [enabled]);
}
