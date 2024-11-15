import { useCallback, useMemo } from "react";

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
  refs: Array<React.Ref<T> | undefined | null>,
): React.RefCallback<T> | null {
  const setRef = useCallback((ref: React.Ref<T> | undefined | null, value: T) => {
    if (typeof ref === "function") {
      ref(value);
    } else if (ref && "current" in ref) {
      (ref as React.MutableRefObject<T>).current = value;
    }
  }, []);

  return useMemo(() => {
    if (!refs.some(Boolean)) return null;

    return (value: T) => {
      refs.forEach((ref) => setRef(ref, value));
    };
  }, [refs, setRef]);
}
