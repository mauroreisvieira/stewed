import React, { useEffect } from "react";

/**
 * Represents a function that handles a click event.
 */
type Handler = (event: MouseEvent) => void;

/**
 * Represents the options for the useClickOutside hook.
 */
interface IUseClickOutside<T> {
  /** Reference to the DOM element or elements to detect clicks outside of. */
  ref: React.RefObject<T> | React.RefObject<T>[];
  /** The handler function to be executed when a click outside occurs. */
  handler: Handler;
  /** Array of elements that will be ignored on click. */
  ignoredElements?: Element[] | null[];
}

/**
 * A hook that detects clicks outside specified elements.
 *
 * @param {IUseClickOutside<T>} props - Options for the hook.
 * @returns void
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>({
  ref,
  handler,
  ignoredElements = [],
}: IUseClickOutside<T>): void {
  useEffect(() => {
    /**
     * Handler for click events outside the specified elements.
     * @param event The MouseEvent object.
     */
    const onHandleClickOutside: Handler = (event) => {
      if (ignoredElements?.some((el) => el && el.contains(event.target as Node))) {
        return; // If click is inside ignored element, do nothing
      }

      const isOutside = Array.isArray(ref)
        ? ref.every((r) => r.current && !r.current.contains(event.target as Node))
        : ref.current && !ref.current.contains(event.target as Node);

      if (isOutside) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", onHandleClickOutside);
    return () => {
      document.removeEventListener("mousedown", onHandleClickOutside);
    };
  }, [handler, ref, ignoredElements]);
}
