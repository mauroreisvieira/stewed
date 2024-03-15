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

interface FloatingOptions {
  placement?: Placement;
  isPositioned?: boolean;
}

interface UseFloatingProps<R> extends Pick<FloatingOptions, "placement"> {
  open?: boolean;
  reference: R | null;
}

export function useFloating<R extends HTMLElement, F extends HTMLElement>({
  reference,
  placement = "bottom",
  open,
}: UseFloatingProps<R>) {
  const floating = useRef<F>(null);
  const [floatingPosition, setFloatingPosition] = useState({ x: 0, y: 0 });

  const [options, setOptions] = useReducer(
    (prev: FloatingOptions, next: Partial<FloatingOptions>) => {
      return { ...prev, ...next };
    },
    { placement, isPositioned: open },
  );

  const updatePosition = useCallback(() => {
    if (!options.isPositioned || !reference || !floating?.current) return;

    const referenceRect = reference.getBoundingClientRect();
    const floatingRect = floating.current.getBoundingClientRect();

    let x = 0;
    let y = 0;

    switch (options.placement) {
      case "top":
        y = referenceRect.top - floatingRect.height + window.scrollY;
        x =
          referenceRect.left + window.scrollX - (floatingRect.width / 2 - referenceRect.width / 2);
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
        y =
          referenceRect.bottom + window.scrollY - (floatingRect.height - referenceRect.height / 2);
        x = referenceRect.left + window.scrollX + referenceRect.width;
        break;
      case "right-start":
        y = referenceRect.top + window.scrollY;
        x = referenceRect.left + window.scrollX + referenceRect.width;
        break;
      case "right-end":
        y = referenceRect.bottom + window.scrollY - floatingRect.height;
        x = referenceRect.left + window.scrollX + referenceRect.width;
        break;
      case "bottom":
        y = referenceRect.bottom + window.scrollY;
        x =
          referenceRect.left + window.scrollX - (floatingRect.width / 2 - referenceRect.width / 2);
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
        y =
          referenceRect.bottom + window.scrollY - (floatingRect.height - referenceRect.height / 2);
        x = referenceRect.left + window.scrollX - floatingRect.width;
        break;
      case "left-start":
        y = referenceRect.top + window.scrollY;
        x = referenceRect.left + window.scrollX - floatingRect.width;
        break;
      case "left-end":
        y = referenceRect.bottom + window.scrollY - floatingRect.height;
        x = referenceRect.left + window.scrollX - floatingRect.width;
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
    if (options.placement === "bottom-start" && exceedsRight) {
      setOptions({ placement: "bottom-end" });
    }

    if (options.placement === "bottom" && exceedsBottom) {
      setOptions({ placement: "top" });
    }

    setFloatingPosition({ x, y });
  }, [options.isPositioned, options.placement, reference]);

  useEffect(() => {
    if (!options.isPositioned || !reference) return;

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
  }, [options.isPositioned, reference, updatePosition]);

  useEffect(() => {
    // Whenever placement changes, recalculate the position
    updatePosition();
  }, [options.placement, updatePosition]);

  // Once `open` flips to `true`, `isPositioned` will switch to `true` asynchronously.
  // We can use an effect to determine when it has been positioned.
  useEffect(() => {
    setOptions({ isPositioned: open && !!reference, placement }); // TODO placement should be the initial if have space available
  }, [open, reference, placement]);

  return { floating, ...floatingPosition, ...options };
}
