import { useEffect, useRef } from "react";

/** Hook to append a container to the DOM on mount and return the node to use for createPortal.
 * Automatically handles creating and tearing-down the root elements (no SRR
 * makes this trivial), so there is no need to ensure the parent target already exists.
 * @example
 * const target = usePortal();
 * @returns The DOM node to use as the Portal target.
 */
export const usePortal = (): HTMLElement => {
  const rootElemRef = useRef<HTMLElement>();

  useEffect(() => {
    // add the detached element to body, to work in different micro services in same app.
    if (rootElemRef.current) document.body.appendChild(rootElemRef.current);

    return () => {
      if (rootElemRef.current) rootElemRef.current.remove();
    };
  }, []);

  /**
   * It's important we evaluate this lazily:
   * - We need first render to contain the DOM element, so it shouldn't happen
   *   in useEffect.
   * - We can't do 'const rootElemRef = useRef(document.createElement('div))',
   *   since this will run every single render (that's a lot).
   * - We want the ref to consistently point to the same DOM element and only
   *   ever run once.
   * @see {@link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily}
   */
  function getRootElement(): HTMLElement {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement("div");
    }

    return rootElemRef.current;
  }

  return getRootElement();
};
