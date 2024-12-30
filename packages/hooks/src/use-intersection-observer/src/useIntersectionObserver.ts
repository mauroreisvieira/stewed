import { useState, useEffect, useCallback, type RefObject } from "react";

/**
 * Props for the `useIntersectionObserver` hook, extending the native `IntersectionObserverInit`
 * configuration with a generic type for the observed element.
 */
interface UseIntersectionObserverProps<T> extends IntersectionObserverInit {
  /** A reference to the DOM element to observe. Typically created using `useRef`. */
  elementRef: RefObject<T | null>;
  /**
   * A boolean indicating whether the intersection observer is enabled.
   * @default `true`
   */
  enabled?: boolean;
  /**
   * When `true`, the observer will stop observing after the element becomes visible.
   * @default `false`
   */
  freezeOnceVisible?: boolean;
}

/**
 * Interface for configuring and tracking an intersection observer for an element.
 *
 * This interface is used to observe when an element enters or exits the viewport, providing information
 * like intersection state and ratio of visibility.
 */
interface UseIntersectionObserver {
  /** The latest IntersectionObserverEntry for the observed element or `undefined` if no entry is available. */
  entries: IntersectionObserverEntry | undefined;
  /** The IntersectionObserver instance. */
  observer: IntersectionObserver | undefined;
}

/**
 * Hook that uses the Intersection Observer API to observe when an element
 * enters or exits the viewport or a parent element, and returns the latest `IntersectionObserverEntry`.
 *
 * @param elementRef - A reference to the DOM element to observe.
 * @param options - Configuration options for the intersection observer.
 * @returns The latest `IntersectionObserverEntry` for the observed element or `undefined` if no entry is available.
 *
 * @example
 * const elementRef = useRef<HTMLDivElement>(null);
 * const entry = useIntersectionObserver({
 *   elementRef,
 *   freezeOnceVisible: true // Stop observing after element is visible
 * });
 */
export function useIntersectionObserver<T extends HTMLElement>({
  elementRef,
  enabled = true,
  threshold = 0,
  root = null,
  rootMargin = "0%",
  freezeOnceVisible = false
}: UseIntersectionObserverProps<T>): UseIntersectionObserver {
  const [observerEntry, setObserverEntry] = useState<UseIntersectionObserver>({
    entries: undefined,
    observer: undefined
  });

  // Determine if the observer should freeze when the element is visible
  const frozen = observerEntry?.entries?.isIntersecting && freezeOnceVisible;

  // Update the observer entry state when an intersection event occurs
  const updateEntry = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      // Set the latest observer entry to state
      setObserverEntry({ entries: entries[0], observer });
    },
    []
  );

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = "IntersectionObserver" in window;

    // If the observer is disabled, or no support is available, or the element is frozen, exit early
    if (!enabled || !hasIOSupport || frozen || !node) return;

    // Create a new IntersectionObserver instance with provided options
    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin
    });

    // Start observing the target node
    observer.observe(node);

    // Cleanup the observer when the component unmounts or when dependencies change
    return () => observer.disconnect();
  }, [enabled, elementRef, frozen, root, rootMargin, threshold, updateEntry]);

  return observerEntry;
}
