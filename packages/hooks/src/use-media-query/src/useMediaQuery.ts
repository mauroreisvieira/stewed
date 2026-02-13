import { useEffect, useState, useMemo } from "react";

/** Interface declaration for UseMediaQuery */
interface UseMediaQueryProps {
  /**
   * The media query string(s) to match against.
   * @remarks Accepts a single string or an array of strings.
   */
  query: string | string[];
  /**
   * Optional default value to use for the initial state before the effect runs.
   * Useful for SSR or specific default behavior.
   */
  defaultValue?: boolean;
}

/**
 * A custom hook that listens to a CSS media query and returns a boolean indicating whether the query currently matches the viewport.
 *
 * @param {UseMediaQueryProps} props - The properties for configuring the media query.
 * @returns {boolean} - `true` if the media query matches, otherwise `false`.
 *
 * @example
 * ```ts
 * const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
 *
 * if (isLargeScreen) {
 *   // Render for large screens
 * } else {
 *   // Render for small screens
 * }
 * ```
 */
export function useMediaQuery({ query, defaultValue = false }: UseMediaQueryProps): boolean {
  const queries = useMemo(() => (Array.isArray(query) ? query : [query]), [query]);
  const [matches, setMatches] = useState(defaultValue);

  // Memoize the matchMedia objects for each query
  const mediaQueryLists = useMemo(() => {
    if (typeof window === "undefined") return [];

    return queries.map((q) => window.matchMedia(q));
  }, [queries]);

  useEffect(() => {
    if (!mediaQueryLists.length) return;

    // Create a new AbortController to manage aborting ongoing operations if needed.
    const controller = new AbortController();

    /**
     * Function to check if any query matches
     * @returns void
     */
    const updateMatchState = () => {
      const isMatching = mediaQueryLists.some((mql) => mql.matches);
      setMatches(isMatching);
    };

    // Initialize the state
    updateMatchState();

    // Set up listeners for each media query
    mediaQueryLists.forEach((mql) => {
      mql.addEventListener("change", updateMatchState, {
        signal: controller.signal
      });
    });

    // Clean up event listeners
    return () => {
      controller.abort();
    };
  }, [mediaQueryLists]);

  return matches;
}
