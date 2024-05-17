import { useEffect } from "react";

/**
 * The callback function invoked by the ResizeObserver when a resize event occurs.
 *
 * @param entries - An array of ResizeObserverEntry objects containing information about the resize event.
 * @param observer - The ResizeObserver instance that triggered the callback.
 */
export type ResizeObserverCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver,
) => void;


interface ResizeObserverProps<T extends HTMLElement> {
  /** The element to observe for resize events. */
  element: T | null;
  /** A boolean indicating whether the resize observer is enabled. */
  enabled: boolean;
  /** The callback function to be invoked when a resize event occurs. */
  callback: ResizeObserverCallback | null;
}

/**
 * A React hook that observes changes in the size of a specified element.
 *
 * @template T - The type of the element being observed (extends HTMLElement).
 *
 * @param props - The props for the useResizeObserver hook.
 * @param props.element - The element to observe for resize events.
 * @param props.enabled - A boolean indicating whether the resize observer is enabled.
 * @param props.callback - The callback function to be invoked when a resize event occurs.
 */
export const useResizeObserver = <T extends HTMLElement>({
  element,
  enabled,
  callback,
}: ResizeObserverProps<T>) => {
  useEffect(() => {
    if (!element || !enabled || callback === null) return;

    const cb = (entries: ResizeObserverEntry[], observer: ResizeObserver) => {
      callback(entries, observer);
    };

    const resizeObserver = new ResizeObserver(cb);
    resizeObserver.observe(element);

    // Clean up the observer when the component unmounts or when dependencies change
    return () => resizeObserver.disconnect();
  }, [element, callback, enabled]);
};
