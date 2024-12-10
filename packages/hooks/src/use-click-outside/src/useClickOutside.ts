import { useEffect, useRef } from "react";
// Utilities
import { ClickOutside, type ClickOutsideOptions } from "@stewed/utilities";

export interface UseClickOutside extends ClickOutsideOptions {
  /** Whether the hook is active and listening for outside clicks. */
  enabled?: boolean;
}

/**
 * Hook that detects clicks outside of specified elements and triggers a callback.
 *
 * @param props - Configuration options for the hook.
 */
export const useClickOutside = ({
  enabled = false,
  ignoredElements,
  handler,
}: UseClickOutside): void => {
  const clickOutside = useRef<ClickOutside>(null);

  useEffect(() => {
    clickOutside.current = new ClickOutside();

    return (): void => {
      if (clickOutside.current) clickOutside.current.deactivate();
    };
  }, []);

  useEffect(() => {
    if (!clickOutside.current) return;

    clickOutside.current.update({
      ignoredElements,
      handler,
    });

    if (enabled) {
      clickOutside.current.activate({
        ignoredElements,
        handler,
      });
      return;
    }

    clickOutside.current.deactivate();
  }, [enabled, handler, ignoredElements]);
};
