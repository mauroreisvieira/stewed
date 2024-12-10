import React, { useEffect, useCallback } from "react";

interface UseResizeObserverProps<T> {
  /** A reference to the DOM element to observe. */
  elementRef: React.RefObject<T | null>;
  /**
   * A boolean indicating whether the resize observer is enabled.
   * When set to `false`, the observer will not track size changes for the element.
   * @default `true`
   */
  enabled?: boolean;
  /**
   * The callback function to be invoked when a resize event occurs on the observed element.
   * This function will receive the `ResizeObserverEntry[]` and the `ResizeObserver` instance.
   */
  handler: ResizeObserverCallback | null;
}

/**
 * Hook that observes changes in the size of an element and triggers a callback whenever the size changes.
 * It uses the `ResizeObserver` API to monitor changes to the observed element's dimensions.
 *
 * @param params - Configuration options for the resize observer.
 * @returns This hook does not return any value but invokes the provided callback when resizing occurs.
 *
 * @example
 * ```ts
 * const elementRef = useRef<HTMLDivElement>(null);
 * useResizeObserver({
 *   elementRef,
 *   onChange: (entries) => {
 *     entries.forEach(entry => {
 *       console.log(entry.contentRect.width, entry.contentRect.height);
 *     });
 *   }
 * });
 * ```
 */
export function useResizeObserver<T extends HTMLElement>({
  elementRef,
  enabled = true,
  handler,
}: UseResizeObserverProps<T>): void {
  // Callback function to handle resize events and call the provided onChange handler
  const updateEntry = useCallback(
    (entries: ResizeObserverEntry[], observer: ResizeObserver): void => {
      // Invoke the callback function with the entries when a resize occurs
      handler?.(entries, observer);
    },
    [handler], // Dependency array: only recreate the callback if onChange changes
  );

  useEffect(() => {
    // Get the current DOM node from the ref
    const node = elementRef?.current;

    // Check for ResizeObserver support and ensure the observer is enabled and the element exists
    const hasResizeObserverSupport = !!window.ResizeObserver;

    // If the ResizeObserver is not supported, the observer is disabled, or the element is missing, exit early
    if (!enabled || !hasResizeObserverSupport || !node) return;

    // Create a new ResizeObserver instance and start observing the referenced element
    const observer = new ResizeObserver(updateEntry);
    observer.observe(node);

    // Cleanup function: disconnect the observer when the component unmounts or dependencies change
    return () => {
      observer.disconnect();
    };
  }, [enabled, elementRef, updateEntry]);
}
