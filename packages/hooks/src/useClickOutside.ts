import { useEffect } from "react";

/**
 * Represents a function that handles a click event.
 */
type Handler = (event: MouseEvent) => void;

/**
 * Represents the options for the useClickOutside hook.
 */
interface IUseClickOutside<T> {
  /** Reference to the DOM element or elements to detect clicks outside of. */
  reference: T | T[] | null;
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
  reference,
  handler,
  ignoredElements = [],
}: IUseClickOutside<T>): void {
  console.log("Hook");
  useEffect(() => {
    /**
     * Handler for click events outside the specified elements.
     * @param event The MouseEvent object.
     */
    const onHandleClickOutside: Handler = (event) => {
      console.log("onHandleClickOutside");
      // If click is inside ignored element, do nothing
      if (ignoredElements?.some((el) => el && el.contains(event.target as Node))) {
        return;
      }

      console.log("reference", reference);

      const isOutside = Array.isArray(reference)
        ? reference.every((ref) => ref && !ref.contains(event.target as Node))
        : reference && !reference.contains(event.target as Node);

      if (isOutside) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", onHandleClickOutside);
    return () => {
      document.removeEventListener("mousedown", onHandleClickOutside);
    };
  }, [handler, reference, ignoredElements]);
}
