import { useEffect } from "react";

interface UseScrollLockProps {
  /** A boolean indicating whether the scroll lock should be active. */
  enabled: boolean;
}

/**
 * A custom hook to manage scroll lock.
 *
 * @param {UseScrollLockProps} props - The props object containing configuration for scroll lock.
 */
export function useScrollLock({ enabled }: UseScrollLockProps) {
  // Adds class name to document body when an overlay is active
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (enabled) {
      // Preventing layout shifts when body becomes locked
      const paddingRight = `${String(window.innerWidth - document.documentElement.clientWidth)}px`;
      document.body.style.paddingRight = paddingRight;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [enabled]);
}
