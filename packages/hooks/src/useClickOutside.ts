import { useEffect, useRef } from "react";
import { ClickOutside, type ClickOutsideOptions } from "@stewed/utilities";

export interface UseClickOutside extends ClickOutsideOptions {
  /** Activate/Deactivate the hook. */
  enabled?: boolean;
}

/**
 * Hook to detects clicks outside elements and triggers a callback.
 * @param props - OutsideClickProps
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
