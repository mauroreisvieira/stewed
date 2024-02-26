import { useCallback, useEffect, useRef } from "react";

/**
 * Returns a function that indicates whether the component is mounted or not.
 * This hook is useful for checking the mount status of a component
 * to prevent unnecessary side effects after the component has been unmounted.
 *
 * @returns A function that returns a boolean indicating whether the component is mounted.
 */
export function useMounted(): () => boolean {
  // Ref to track the mounted state of the component
  const mounted = useRef(false);

  // Effect to update the mounted state when the component mounts or unmounts
  useEffect(() => {
    mounted.current = true;

    // Cleanup function to update mounted state on component unmount
    return (): void => {
      mounted.current = false;
    };
  }, []);

  // Returns a memoized callback function to retrieve the mounted state
  return useCallback(() => mounted.current, []);
}
