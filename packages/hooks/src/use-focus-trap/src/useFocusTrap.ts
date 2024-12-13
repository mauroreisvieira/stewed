import { useEffect, useRef } from "react";
// Utilities
import { FocusTrap } from "@stewed/utilities";

/** Props for managing focus trapping within a specific element or area. */
export interface FocusTrapProps {
  /** The root element to trap focus within. */
  root: HTMLElement | null;
  /** A boolean indicating whether the focus trapping should be active. */
  enabled: boolean;
}

/**
 * Hook that manages focus trapping within a specified root element.
 *
 * @param props - The props for the focus trap hook.
 */
export const useFocusTrap = ({ enabled, root }: FocusTrapProps): void => {
  const focusTrapRef = useRef<FocusTrap | null>(null);

  useEffect(() => {
    if (!root) return;

    focusTrapRef.current = new FocusTrap(root);

    return () => {
      if (focusTrapRef.current) {
        focusTrapRef.current.removeFocusTrap();
        focusTrapRef.current = null;
      }
    };
  }, [root]);

  useEffect(() => {
    if (focusTrapRef.current) {
      if (enabled) {
        focusTrapRef.current.addFocusTrap();
      } else {
        focusTrapRef.current.removeFocusTrap();
      }
    }
  }, [enabled]);
};
