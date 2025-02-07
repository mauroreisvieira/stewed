import { useEffect, useLayoutEffect } from "react";
// Utilities
import { isClient } from "@stewed/utilities";

/**
 * A safe version of `useLayoutEffect` that avoids React warnings when rendering on the server.
 *
 * This hook behaves like `useLayoutEffect` in the browser but falls back to `useEffect` during server-side rendering.
 * It is useful for effects that should only run on the client, preventing hydration mismatches.
 *
 * **Important:** Before using this hook, review [this explanation](https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85)
 * to ensure that `useLayoutEffect` is appropriate for your use case.
 */
export const useEnhancedEffect = isClient() ? useLayoutEffect : useEffect;
