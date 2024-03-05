import { useState, useEffect, useReducer, useCallback, useRef } from "react";

export type Placement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";

interface UseFloatingProps<R> {
  placement?: Placement;
  reference: R | null;
}

export function useFloating<R extends HTMLElement, F extends HTMLElement>({
  placement = "bottom",
  reference,
}: UseFloatingProps<R>) {
  const floating = useRef<F>(null);
  const [floatingPosition, setFloatingPosition] = useState({ x: 0, y: 0 });

  const [options, setOptions] = useReducer(
    (prev: UseFloatingProps<R>, next: Partial<UseFloatingProps<R>>) => {
      return { ...prev, ...next };
    },
    { placement, reference },
  );

  const updatePosition = useCallback(() => {
    if (!options.reference || !floating?.current) return;

    const referenceRect = options.reference.getBoundingClientRect();
    const floatingRect = floating.current.getBoundingClientRect();

    let x = 0;
    let y = 0;

    switch (options.placement) {
      case "top":
        y = referenceRect.top - floatingRect.height + window.scrollY;
        x = referenceRect.left + window.scrollX - ((floatingRect.width / 2) - referenceRect.width / 2);
        break;
      case "top-start":
        y = referenceRect.top - floatingRect.height + window.scrollY;
        x = referenceRect.left + window.scrollX;
        break;
      case "top-end":
        y = referenceRect.top - floatingRect.height + window.scrollY;
        x = referenceRect.right + window.scrollX - floatingRect.width;
        break;
      case "right":
        x = referenceRect.right + window.scrollX;
        break;
      case "right-start":
        y = referenceRect.top + window.scrollY;
        x = referenceRect.right + window.scrollX;
        break;
      case "right-end":
        y = referenceRect.bottom + window.scrollY;
        x = referenceRect.right + window.scrollX;
        break;
      case "bottom":
        y = referenceRect.bottom + window.scrollY;
        x = referenceRect.left + window.scrollX - ((floatingRect.width / 2) - referenceRect.width / 2);
        break;
      case "bottom-start":
        y = referenceRect.bottom + window.scrollY;
        x = referenceRect.left + window.scrollX;
        break;
      case "bottom-end":
        y = referenceRect.bottom + window.scrollY;
        x = referenceRect.right + window.scrollX - floatingRect.width;
        break;
      case "left":
        x = referenceRect.left + window.scrollX;
        break;
      case "left-start":
        y = referenceRect.top + window.scrollY;
        x = referenceRect.left + window.scrollX;
        break;
      case "left-end":
        y = referenceRect.bottom + window.scrollY;
        x = referenceRect.left + window.scrollX;
        break;
      default:
        break;
    }

    // Adjust position to keep the element within the viewport
    const { innerHeight: windowHeight, innerWidth: windowWidth } = window;
    const { scrollTop, scrollLeft } = document.documentElement;

    // Check if the element exceeds the viewport boundaries
    const exceedsRight = x + floatingRect.width > windowWidth + scrollLeft;
    const exceedsBottom = y + floatingRect.height > windowHeight + scrollTop;

    // If the element exceeds the viewport boundaries, adjust the position
    if (options.placement === "right" && exceedsRight) {
      setOptions({ placement: "left" });
    }

    if (options.placement === "bottom" && exceedsBottom) {
      setOptions({ placement: "top" });
    }

    setFloatingPosition({ x, y });
  }, [options]);

  useEffect(() => {
    if (!reference) return;

    // Function to recalculate position
    const handleResize = () => {
      updatePosition();
    };

    // Observe changes in the reference element's size
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(reference);

    // Recalculate position on window resize or scroll
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize, { capture: true });

    // Cleanup function
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize, { capture: true });
    };
  }, [reference, updatePosition]);

  useEffect(() => {
    if (options.reference !== reference) {
      // If the reference element changes, update the options
      setOptions({ reference });
    }
  }, [options.reference, reference]);

  useEffect(() => {
    // Whenever placement changes, recalculate the position
    updatePosition();
  }, [options.placement, updatePosition]);

  return { ...floatingPosition, floating };
}
