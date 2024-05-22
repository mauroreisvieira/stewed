import { useEffect, useRef } from "react";
import { ClickOutside, type ClickOutsideOptions } from "@stewed/utilities";

export interface UseClickOutside extends ClickOutsideOptions {
  /** Whether the hook is active and listening for outside clicks. */
  enabled?: boolean;
}

/**
 * Hook that detects clicks outside of specified elements and triggers a callback.
 *
 * @param props - Configuration options for the hook.
 * @param props.enabled - Determines if the hook is active. Default is false.
 * @param props.ignoredElements - Array of elements to ignore clicks on.
 * @param props.onClickOutside - Callback function to trigger on outside click.
 */
export const useClickOutside = ({
  enabled = false,
  ignoredElements,
  onClickOutside,
}: UseClickOutside): void => {
  const clickOutside = useRef<ClickOutside>();

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
      onClickOutside,
    });

    if (enabled) {
      clickOutside.current.activate({
        ignoredElements,
        onClickOutside,
      });
      return;
    }

    clickOutside.current.deactivate();
  }, [enabled, onClickOutside, ignoredElements]);
};
