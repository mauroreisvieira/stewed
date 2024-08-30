import React, { useState, useEffect, useReducer, useCallback, useRef } from "react";

/**
 * Defines the possible placements for the floating element relative to the reference element.
 */
export type FloatingPlacement =
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
  /**
   * The preferred placement of the floating component relative to the reference element.
   * Can be one of the following: "top", "top-start", "top-end", "right", "right-start",
   * "right-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end".
   * @default "bottom"
   */
  placement: FloatingPlacement;
  /**
   * Specifies if the floating component is currently positioned.
   * This property can be used to toggle the positioning logic on or off.
   */
  isPositioned?: boolean;
}

interface UseFloatingProps<R extends HTMLElement> extends Pick<FloatingOptions, "placement"> {
  /**
   * The reference element used for positioning the floating component.
   * Should be a DOM element or null.
   */
  reference: R | null;
  /**
   * Indicates if the floating component is open or closed.
   * When true, the floating component is displayed.
   */
  open?: boolean;
  /**
   * Determines whether the floating element should automatically adjust its position
   * to remain within the viewport. When `true`, the component will attempt to reposition
   * itself to avoid being clipped or moved out of view.
   * @default true
   */
  flip?: boolean;
  /**
   * Adds distance (margin or spacing) between the reference and floating element.
   * @default 0
   */
  offset?: number;
}

interface UseFloating<T> extends FloatingOptions {
  /** The reference to attach to the floating element. */
  floating: React.RefObject<T>;
  /** The x-coordinate of the floating element. */
  x: number;
  /** The y-coordinate of the floating element. */
  y: number;
  /** Properties of the reference element. */
  reference: DOMRect;
}

/**
 * Hook to position a floating element relative to a reference element.
 *
 * @template R - The type of the reference element (extends HTMLElement).
 * @template F - The type of the floating element (extends HTMLElement).
 *
 * @param props - Configuration options for positioning the floating element.
 * @returns An object containing styles and references for the floating element.
 */
export function useFloating<R extends HTMLElement, F extends HTMLElement>({
  reference,
  placement = "bottom",
  offset = 0,
  flip = true,
  open,
}: UseFloatingProps<R>): UseFloating<F> {
  // Reference to the floating element, initially set to null
  const floating = useRef<F>(null);

  // State to store the position of the floating element and the dimensions of the reference element
  const [floatingPosition, setFloatingPosition] = useState({
    x: 0,
    y: 0,
    reference: {} as DOMRect,
  });

  // Reducer to update the options, merging the previous state with the new state
  const [options, setOptions] = useReducer(
    (prev: FloatingOptions, next: FloatingOptions) => {
      return { ...prev, ...next };
    },
    { placement, isPositioned: open }, // Initial state with placement and whether the element is positioned
  );

  // Function to update the position of the floating element based on the reference element's position and size
  const updatePosition = useCallback(() => {
    // Exit early if the element is not positioned, or if reference or floating element is not available
    if (!options.isPositioned || !reference || !floating?.current) return;

    // Get the bounding rectangles of the reference and floating elements
    const referenceRect = reference.getBoundingClientRect();
    const floatingRect = floating.current.getBoundingClientRect();

    // Initialize x and y position values
    let x = 0;
    let y = 0;

    // Calculate the floating element's position based on the current placement option
    switch (options.placement) {
      case "top":
        y = referenceRect.top - floatingRect.height + window.scrollY - offset;
        x =
          referenceRect.left + window.scrollX - (floatingRect.width / 2 - referenceRect.width / 2);
        break;
      case "top-start":
        y = referenceRect.top - floatingRect.height + window.scrollY - offset;
        x = referenceRect.left + window.scrollX;
        break;
      case "top-end":
        y = referenceRect.top - floatingRect.height + window.scrollY - offset;
        x = referenceRect.right + window.scrollX - floatingRect.width;
        break;
      case "right":
        y =
          referenceRect.bottom +
          window.scrollY -
          (floatingRect.height / 2 + referenceRect.height / 2);
        x = referenceRect.left + window.scrollX + referenceRect.width + offset;
        break;
      case "right-start":
        y = referenceRect.top + window.scrollY;
        x = referenceRect.left + window.scrollX + referenceRect.width + offset;
        break;
      case "right-end":
        y = referenceRect.bottom + window.scrollY - floatingRect.height;
        x = referenceRect.left + window.scrollX + referenceRect.width + offset;
        break;
      case "bottom":
        y = referenceRect.bottom + window.scrollY + offset;
        x =
          referenceRect.left + window.scrollX - (floatingRect.width / 2 - referenceRect.width / 2);
        break;
      case "bottom-start":
        y = referenceRect.bottom + window.scrollY + offset;
        x = referenceRect.left + window.scrollX;
        break;
      case "bottom-end":
        y = referenceRect.bottom + window.scrollY + offset;
        x = referenceRect.right + window.scrollX - floatingRect.width;
        break;
      case "left":
        y =
          referenceRect.bottom +
          window.scrollY -
          (floatingRect.height / 2 + referenceRect.height / 2);
        x = referenceRect.left + window.scrollX - floatingRect.width - offset;
        break;
      case "left-start":
        y = referenceRect.top + window.scrollY;
        x = referenceRect.left + window.scrollX - floatingRect.width - offset;
        break;
      case "left-end":
        y = referenceRect.bottom + window.scrollY - floatingRect.height;
        x = referenceRect.left + window.scrollX - floatingRect.width - offset;
        break;
      default:
        break;
    }

    // Adjust position to keep the element within the viewport
    const { innerHeight: windowHeight, innerWidth: windowWidth } = window;

    // Get the current scroll position of the document
    const { scrollTop, scrollLeft } = document.documentElement;

    // Check if the floating element exceeds the viewport boundaries
    const exceedsRight = x + floatingRect.width > windowWidth + scrollLeft;
    const exceedsBottom = y + floatingRect.height > windowHeight + scrollTop;
    const exceedsLeft = x < scrollLeft;
    const exceedsTop = y < scrollTop;

    // Check if a given placement fits within the viewport
    const doesPlacementFit = (placement: FloatingPlacement): boolean => {
      switch (placement) {
        case "top":
          return !exceedsTop;
        case "bottom":
          return !exceedsBottom;
        case "right":
          return !exceedsRight && !exceedsTop && !exceedsBottom;
        case "left":
          return !exceedsLeft && !exceedsTop && !exceedsBottom;
        case "top-start":
          return !exceedsTop && !exceedsRight;
        case "top-end":
          return !exceedsTop && !exceedsLeft;
        case "bottom-start":
          return !exceedsBottom && !exceedsRight;
        case "bottom-end":
          return !exceedsBottom && !exceedsLeft;
        case "right-start":
          return !exceedsRight && !exceedsBottom;
        case "right-end":
          return !exceedsRight && !exceedsTop;
        case "left-start":
          return !exceedsLeft && !exceedsBottom;
        case "left-end":
          return !exceedsLeft && !exceedsTop;
        default:
          return true; // Default case, assume it fits
      }
    };

    // Adjust the placement of the floating element to fit within the viewport
    const adjustPlacement = (initialPlacement: FloatingPlacement): FloatingPlacement => {
      // First, check if the initial placement fits
      if (doesPlacementFit(initialPlacement)) {
        return initialPlacement;
      }

      // Define alternative placements for cases where the initial placement does not fit
      const relatedPlacements = {
        "top": ["top-start", "top-end", "bottom"],
        "bottom": ["bottom-start", "bottom-end", "top"],
        "left": ["left-start", "left-end", "right"],
        "right": ["right-start", "right-end", "left"],
        "top-start": ["top-end", "bottom-start"],
        "top-end": ["top-start", "bottom-end"],
        "bottom-start": ["bottom-end", "top-start"],
        "bottom-end": ["bottom-start", "top-end"],
        "left-start": ["left-end", "right-start"],
        "left-end": ["left-start", "right-end"],
        "right-start": ["right-end", "left-start"],
        "right-end": ["right-start", "left-end"],
      } as const;

      // Try the related placements to see if they fit
      for (const placement of relatedPlacements[initialPlacement] || []) {
        if (doesPlacementFit(placement)) {
          return placement;
        }
      }

      // Fallback to the initial placement if nothing else fits
      return initialPlacement;
    };

    // If fit is enabled, adjust the position to keep the element within the viewport
    if (flip) {
      // Adjust the placement and update the options
      const newPlacement = adjustPlacement(options.placement);
      setOptions({ placement: newPlacement });
    }

    // Update floating element position with calculated x and y coordinates
    setFloatingPosition({ x, y, reference: referenceRect });
  }, [offset, options.isPositioned, options.placement, reference, flip]);

  useEffect(() => {
    if (!options.isPositioned || !reference || !flip) return;

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
  }, [options.isPositioned, reference, updatePosition, flip]);

  useEffect(() => {
    // Whenever placement changes, recalculate the position
    updatePosition();
  }, [options.placement, updatePosition]);

  // Once `open` flips to `true`, `isPositioned` will switch to `true` asynchronously.
  // We can use an effect to determine when it has been positioned.
  useEffect(() => {
    requestAnimationFrame(() => setOptions({ isPositioned: open && !!reference, placement }));
  }, [open, reference, placement]);

  return { floating, ...floatingPosition, ...options };
}
