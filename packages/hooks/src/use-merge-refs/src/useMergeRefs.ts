import { useCallback } from "react";

export type UseMergeRefs<T> = (
  refs: Array<React.Ref<T> | undefined | null>
) => (value: T | null) => void;

/**
 * Hook that merges multiple refs into a single callback ref.
 * This allows you to pass multiple refs to a single element.
 *
 * @param {Array<React.Ref<T> | undefined>} refs - An array of refs to merge.
 * @returns {React.RefCallback<T>} A callback ref that sets all the passed refs.
 *
 * @example
 * ```ts
 *   const ref1 = useRef<HTMLDivElement>(null);
 *   const ref2 = useRef<HTMLDivElement>(null);
 *   const mergeRefs = useMergeRefs();
 *   const mergedRef = mergeRefs([ref1, ref2]);
 *   <div ref={mergedRef}>Hello World</div>
 * ```
 */

export function useMergeRefs<T>(): UseMergeRefs<T> {
  // Helper function to set a ref's value
  const setRef = useCallback((ref: React.Ref<T> | undefined | null, value: T | null) => {
    if (typeof ref === "function") {
      ref(value); // Call the function ref with the value
    } else if (ref && "current" in ref) {
      (ref as React.MutableRefObject<T | null>).current = value; // Set the value to the ref object
    }
  }, []);

  // Returns a callback ref that synchronizes all refs with mergedRef
  const mergeRefs = (refs: Array<React.Ref<T> | undefined | null>): ((value: T | null) => void) => {
    return (value: T | null) => {
      // Sync the refs with all the passed refs
      refs.forEach((ref) => setRef(ref, value));
    };
  };

  return mergeRefs;
}
