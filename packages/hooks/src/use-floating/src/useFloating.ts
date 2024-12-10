import React, { useState, useEffect, useReducer, useCallback, useRef } from "react";

/** Defines the possible placements for the floating element relative to the reference element. */
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
  /**
   * The boundary element that will be checked for overflow relative to.
   * @default window
   */
  boundary?: HTMLElement | null;
}

interface UseFloating<T> extends FloatingOptions {
  /** The reference to attach to the floating element. */
  floating: React.RefObject<T | null>;
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
  boundary,
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
    (prev: FloatingOptions, next: Partial<FloatingOptions>) => {
      return { ...prev, ...next };
    },
    { placement, isPositioned: false }, // Initial state with placement and whether the element is positioned
  );

  // Calculate the floating element's position
  const calculateFloatingPosition = useCallback(
    ({
      position,
      referenceRect,
      floatingRect,
    }: {
      position: FloatingPlacement;
      referenceRect: DOMRect;
      floatingRect: DOMRect;
    }) => {
      // Initialize x and y position values
      let x = 0;
      let y = 0;

      // Calculate the floating element's position based on the current placement option
      switch (position) {
        case "top":
          y = referenceRect.top - floatingRect.height + window.scrollY - offset;
          x =
            referenceRect.left +
            window.scrollX -
            (floatingRect.width / 2 - referenceRect.width / 2);
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
            referenceRect.left +
            window.scrollX -
            (floatingRect.width / 2 - referenceRect.width / 2);
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

      return { x, y };
    },
    [offset],
  );

  // Function to update the position of the floating element based on the reference element's position and size
  const updatePosition = useCallback(() => {
    // Exit early if the element is not positioned, or if reference or floating element is not available
    if (!reference || !floating?.current) return;

    // Get the bounding rectangles of the reference and floating elements
    const referenceRect = reference.getBoundingClientRect();
    const floatingRect = floating.current.getBoundingClientRect();

    // Get the initial x and y coordinates
    let { x, y } = calculateFloatingPosition({
      position: options.placement,
      referenceRect,
      floatingRect,
    });

    const doesPlacementFit = (placement: FloatingPlacement): boolean => {
      // Adjust position to keep the element within the viewport or boundary
      const boundaryRect = boundary
        ? boundary.getBoundingClientRect()
        : { height: window.innerHeight, width: window.innerWidth, top: 0, left: 0 };

      const { width: floatingWidth, height: floatingHeight } = floatingRect;

      // Adjust boundaryRect to include scroll offsets
      const {
        left: boundaryLeft,
        top: boundaryTop,
        width: boundaryWidth,
        height: boundaryHeight,
      } = boundaryRect;

      const scrollTop = boundary?.scrollTop || 0;
      const scrollLeft = boundary?.scrollLeft || 0;

      const adjustedBoundaryTop = boundaryTop + scrollTop;
      const adjustedBoundaryLeft = boundaryLeft + scrollLeft;

      // Adjust referenceRect to include scroll offsets
      const {
        left: referenceLeft,
        top: referenceTop,
        width: referenceWidth,
        height: referenceHeight,
      } = referenceRect;

      const adjustedReferenceTop = referenceTop + scrollTop;
      const adjustedReferenceLeft = referenceLeft + scrollLeft;

      switch (placement) {
        case "bottom":
          return (
            adjustedReferenceTop + referenceHeight + floatingHeight <=
              adjustedBoundaryTop + boundaryHeight && // Space at the bottom
            adjustedReferenceLeft + floatingWidth / 2 <= adjustedBoundaryLeft + boundaryWidth && // Space on the right
            adjustedReferenceLeft - floatingWidth / 2 >= adjustedBoundaryLeft // Space on the left
          );

        case "bottom-start":
          return (
            adjustedReferenceTop + referenceHeight + floatingHeight <=
              adjustedBoundaryTop + boundaryHeight && // Space at the bottom
            adjustedReferenceLeft + floatingWidth <= adjustedBoundaryLeft + boundaryWidth // Space on the right
          );

        case "bottom-end":
          return (
            adjustedReferenceTop + referenceHeight + floatingHeight <=
              adjustedBoundaryTop + boundaryHeight && // Space at the bottom
            adjustedReferenceLeft + referenceWidth - floatingWidth >= adjustedBoundaryLeft // Space on the left
          );

        case "top":
          return (
            adjustedReferenceTop - floatingHeight >= adjustedBoundaryTop && // Space at the top
            adjustedReferenceLeft + floatingWidth / 2 <= adjustedBoundaryLeft + boundaryWidth && // Space on the right
            adjustedReferenceLeft - floatingWidth / 2 >= adjustedBoundaryLeft // Space on the left
          );

        case "top-start":
          return (
            adjustedReferenceTop - floatingHeight >= adjustedBoundaryTop && // Space at the top
            adjustedReferenceLeft + floatingWidth <= adjustedBoundaryLeft + boundaryWidth // Space on the right
          );

        case "top-end":
          return (
            adjustedReferenceTop - floatingHeight >= adjustedBoundaryTop && // Space at the top
            adjustedReferenceLeft + referenceWidth - floatingWidth >= adjustedBoundaryLeft // Space on the left
          );

        case "left":
          return (
            adjustedReferenceLeft - floatingWidth >= adjustedBoundaryLeft && // Space on the left
            adjustedReferenceTop + floatingHeight / 2 <= adjustedBoundaryTop + boundaryHeight && // Space at the bottom
            adjustedReferenceTop - floatingHeight / 2 >= adjustedBoundaryTop // Space at the top
          );

        case "left-start":
          return (
            adjustedReferenceLeft - floatingWidth >= adjustedBoundaryLeft && // Space on the left
            adjustedReferenceTop + floatingHeight <= adjustedBoundaryTop + boundaryHeight // Space at the bottom
          );

        case "left-end":
          return (
            adjustedReferenceLeft - floatingWidth >= adjustedBoundaryLeft && // Space on the left
            adjustedReferenceTop + referenceHeight - floatingHeight >= adjustedBoundaryTop // Space at the top
          );

        case "right":
          return (
            adjustedReferenceLeft + referenceWidth + floatingWidth <=
              adjustedBoundaryLeft + boundaryWidth && // Space on the right
            adjustedReferenceTop + floatingHeight / 2 <= adjustedBoundaryTop + boundaryHeight && // Space at the bottom
            adjustedReferenceTop - floatingHeight / 2 >= adjustedBoundaryTop // Space at the top
          );

        case "right-start":
          return (
            adjustedReferenceLeft + referenceWidth + floatingWidth <=
              adjustedBoundaryLeft + boundaryWidth && // Space on the right
            adjustedReferenceTop + floatingHeight <= adjustedBoundaryTop + boundaryHeight // Space at the bottom
          );

        case "right-end":
          return (
            adjustedReferenceLeft + referenceWidth + floatingWidth <=
              adjustedBoundaryLeft + boundaryWidth && // Space on the right
            adjustedReferenceTop + referenceHeight - floatingHeight >= adjustedBoundaryTop // Space at the top
          );

        default:
          return true; // Assume it fits if placement is unrecognized
      }
    };

    // Adjust the placement of the floating element to fit within the viewport
    const adjustPlacement = (initialPlacement: FloatingPlacement): FloatingPlacement => {
      // Define alternative placements for cases where the initial placement does not fit
      const relatedPlacements = {
        "top": [
          "top-start",
          "top-end", // Variations on top
          "bottom",
          "bottom-start",
          "bottom-end", // Opposite placements on the bottom
          "left",
          "left-start",
          "left-end", // Left variations
          "right",
          "right-start",
          "right-end", // Right variations
        ],
        "bottom": [
          "bottom-start",
          "bottom-end", // Variations on bottom
          "top",
          "top-start",
          "top-end", // Opposite placements on the top
          "left",
          "left-start",
          "left-end", // Left variations
          "right",
          "right-start",
          "right-end", // Right variations
        ],
        "left": [
          "left-start",
          "left-end", // Variations on left
          "right",
          "right-start",
          "right-end", // Opposite placements on the right
          "top",
          "top-start",
          "top-end", // Top variations
          "bottom",
          "bottom-start",
          "bottom-end", // Bottom variations
        ],
        "right": [
          "right-start",
          "right-end", // Variations on right
          "left",
          "left-start",
          "left-end", // Opposite placements on the left
          "top",
          "top-start",
          "top-end", // Top variations
          "bottom",
          "bottom-start",
          "bottom-end", // Bottom variations
        ],
        "top-start": [
          "top",
          "top-end", // Variations on top
          "bottom-start",
          "bottom",
          "bottom-end", // Opposite placements on the bottom
          "left-start",
          "left",
          "left-end", // Left variations
          "right-start",
          "right",
          "right-end", // Right variations
        ],
        "top-end": [
          "top",
          "top-start", // Variations on top
          "bottom-end",
          "bottom",
          "bottom-start", // Opposite placements on the bottom
          "left-end",
          "left",
          "left-start", // Left variations
          "right-end",
          "right",
          "right-start", // Right variations
        ],
        "bottom-start": [
          "bottom",
          "bottom-end", // Variations on bottom
          "top-start",
          "top",
          "top-end", // Opposite placements on the top
          "left-start",
          "left",
          "left-end", // Left variations
          "right-start",
          "right",
          "right-end", // Right variations
        ],
        "bottom-end": [
          "bottom",
          "bottom-start", // Variations on bottom
          "top-end",
          "top",
          "top-start", // Opposite placements on the top
          "left-end",
          "left",
          "left-start", // Left variations
          "right-end",
          "right",
          "right-start", // Right variations
        ],
        "left-start": [
          "left",
          "left-end", // Variations on left
          "right-start",
          "right",
          "right-end", // Opposite placements on the right
          "top-start",
          "top",
          "top-end", // Top variations
          "bottom-start",
          "bottom",
          "bottom-end", // Bottom variations
        ],
        "left-end": [
          "left",
          "left-start", // Variations on left
          "right-end",
          "right",
          "right-start", // Opposite placements on the right
          "top-end",
          "top",
          "top-start", // Top variations
          "bottom-end",
          "bottom",
          "bottom-start", // Bottom variations
        ],
        "right-start": [
          "right",
          "right-end", // Variations on right
          "left-start",
          "left",
          "left-end", // Opposite placements on the left
          "top-start",
          "top",
          "top-end", // Top variations
          "bottom-start",
          "bottom",
          "bottom-end", // Bottom variations
        ],
        "right-end": [
          "right",
          "right-start", // Variations on right
          "left-end",
          "left",
          "left-start", // Opposite placements on the left
          "bottom-end",
          "bottom",
          "bottom-start", // Bottom variations
          "top-end",
          "top",
          "top-start", // Top variations
        ],
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
    if (flip && !doesPlacementFit(placement)) {
      // Adjust the placement based on some criteria (e.g., screen boundaries or available space)
      const newPlacement = adjustPlacement(placement);

      // If the new placement differs from the original placement, recalculate the floating position
      if (newPlacement !== options.placement) {
        // Returned position object to directly assign new x and y coordinates
        ({ x, y } = calculateFloatingPosition({
          position: newPlacement,
          referenceRect,
          floatingRect,
        }));
      }
    }

    // Update floating element position with calculated x and y coordinates
    setFloatingPosition({ x, y, reference: referenceRect });

    // Update the options with the new placement
    setOptions({ isPositioned: true });
  }, [boundary, calculateFloatingPosition, flip, options.placement, placement, reference]);

  useEffect(() => {
    // Check if the options require positioning and if the reference element and flip behavior are defined.
    // If any of these conditions are not met, exit early to avoid unnecessary processing.
    if (!reference || !flip || !open) return;

    // Create a new AbortController to manage aborting ongoing operations if needed.
    const controller = new AbortController();

    // Function to recalculate position
    const handleResize = () => {
      updatePosition();
    };

    // Observe changes in the reference element's size
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(reference);

    // Recalculate position on window resize or scroll
    window.addEventListener("resize", handleResize, { signal: controller.signal });
    window.addEventListener("scroll", handleResize, { capture: true, signal: controller.signal });

    // Cleanup function
    return () => {
      setOptions({ placement, isPositioned: false });
      resizeObserver.disconnect();
      controller.abort();
    };
  }, [reference, updatePosition, flip, open, placement]);

  // Make sure to call updatePosition when the floating element is ready, for cases when the width of the floating element change
  useEffect(() => {
    if (options.isPositioned) {
      updatePosition();
    }
  }, [options.isPositioned, updatePosition]);

  return { floating, ...floatingPosition, ...options };
}
