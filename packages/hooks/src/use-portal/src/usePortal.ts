import { useEffect, useRef, type RefObject } from "react";

/** Properties for the `usePortal` hook, used to manage portal rendering and attachment. */
export interface UsePortalProps {
  /**
   * The root element where the portal content should be rendered.
   * If not provided, the portal will default to appending content to the `document.body`.
   */
  root?: HTMLElement | null | RefObject<HTMLElement | null>;
}

/** Hook to append a container to the DOM on mount and return the node to use for createPortal.
 * Automatically handles creating and tearing-down the root elements (no SRR
 * makes this trivial), so there is no need to ensure the parent target already exists.
 *
 * @returns The DOM node to use as the Portal target.
 *
 * @example
 * ```ts
 * const target = usePortal();
 * ```
 */
export function usePortal(props?: UsePortalProps): HTMLElement {
  // Determine the root element for the portal.
  // If a `root` prop is provided, use it. Otherwise, fallback to `document.body`.
  const root = props?.root || document.body;

  // Create a reference to the root element. This ref will be used to manage the DOM element for the portal.
  const mountNodeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if the `mountNodeRef` is set (i.e., it references a DOM element).
    // If it's not set, exit the function early.
    if (!mountNodeRef.current) {
      return;
    }

    // If the `root` is a React ref (i.e., it has a `current` property),
    // append the `mountNodeRef` element to the root's current DOM element.
    if (root && "current" in root) {
      root.current?.appendChild(mountNodeRef.current);
    } else {
      // If `root` is a direct DOM element (not a ref), append the `mountNodeRef` element to it.
      root?.appendChild(mountNodeRef.current);
    }

    return () => {
      mountNodeRef?.current?.remove();
    };
  }, [root]);

  /**
   * It's important we evaluate this lazily:
   * - We need first render to contain the DOM element, so it shouldn't happen
   *   in useEffect.
   * - We can't do `const mountNodeRef = useRef(document.createElement('div))`, since this will run every single render (that's a lot).
   * - We want the ref to consistently point to the same DOM element and only ever run once.
   *
   * @see {@link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily}
   */
  function getRootElement(): HTMLElement {
    if (!mountNodeRef.current) {
      mountNodeRef.current = document.createElement("div");
    }

    return mountNodeRef.current;
  }

  // eslint-disable-next-line react-compiler/react-compiler
  return getRootElement();
}
