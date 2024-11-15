import { useMemo } from "react";

/**
 * Hook that merges multiple refs into a single callback ref.
 * This allows you to pass multiple refs to a single element.
 *
 * @param {Array<React.Ref<T> | undefined>} refs - An array of refs to merge.
 * @returns {React.RefCallback<T> | null} A callback ref that sets all the passed refs, or null if no refs are provided.
 *
 * @example
 * ```ts
 *   const ref1 = useRef<HTMLDivElement>(null);
 *   const ref2 = useRef<HTMLDivElement>(null);
 *
 *   const mergedRef = useMergeRefs([ref1, ref2]);
 * ```
 */
export function useMergeRefs<T>(
  refs: Array<React.Ref<T> | undefined>,
): React.RefCallback<T> | null {
  return useMemo(() => {
    // If all refs are null or undefined, return null to avoid unnecessary callbacks
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    // Return a callback ref that updates all provided refs
    return (value: T | null) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value); // Call the ref callback with the current value
        } else if (ref) {
          // Assign the value to the current property of the mutable ref object
          (ref as React.MutableRefObject<T | null>).current = value;
        }
      });
    };
  // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
  }, refs);
}
