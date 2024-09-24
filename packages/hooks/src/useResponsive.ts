import { useCallback, useEffect, useState } from "react";
// Tokens
import { defaultTokens, type Breakpoints } from "@stewed/tokens";
// Hooks
import { useMounted } from "./useMounted";

/**
 * Represents the props for the useResponsive hook.
 * @template I The type of the original component props.
 */
export type UseResponsiveProps<I> = I & {
  /**
   * Optional responsive configuration for different breakpoints sizes.
   * It is a dictionary where the key is the breakpoints size and the value is a partial set of props for that breakpoints size.
   */
  responsive?: { [key in Breakpoints]?: Partial<I> };
};

interface UseBreakpointData<T> {
  /** Media query list associated with the breakpoint. */
  mq: MediaQueryList;
  /** The numeric value associated with the breakpoint. */
  bpValue: number;
  /** The name of the breakpoint. */
  bpName: Breakpoints;
  /** Partial properties specific to the breakpoint. */
  mqProps: Partial<T>;
  /** Callback function to handle changes in the breakpoint. */
  onChange: () => void;
}

/**
 * A hook to manage responsive props based on breakpoints.
 *
 * @param props The props including responsive configurations.
 * @param breakpoints Breakpoints configuration.
 * @returns Computed responsive props based on the current viewport.
 */
export function useResponsive<T>(
  props: UseResponsiveProps<T>,
  breakpoints?: typeof defaultTokens.breakpoints,
): T {
  const isMounted = useMounted();
  const [memorized, setMemorized] = useState(props);
  const [computedProps, setComputedProps] = useState<T>(props);

  useEffect(() => {
    // condition required to avoid calling the hook infinitely.
    if (JSON.stringify(props) !== JSON.stringify(memorized)) {
      setMemorized(props);
    }
  }, [memorized, props]);

  const bpList: UseBreakpointData<T>[] = Object.entries(breakpoints || {})
    .map(([name, value]) => {
      const bpProps = (props.responsive || {})[name as Breakpoints] || {};
      return {
        mq: window.matchMedia(`(min-width: ${value})`),
        bpValue: parseInt(value),
        bpName: name as Breakpoints,
        mqProps: bpProps,
        onChange: onBreakpointChange,
      };
    })
    .sort((a, b) => a.bpValue - b.bpValue);

  /**
   * Handler for breakpoints changes.
   * Updates the computedProps based on the current view-port.
   */
  const onBreakpointChange = useCallback((): void => {
    if (!isMounted) return;

    let result: T = memorized;
    const activeBps: Breakpoints[] = [];
    bpList.forEach((bp) => {
      if (!bp.mq.matches) return;

      result = {
        ...result,
        ...bp.mqProps,
      };
      activeBps.push(bp.bpName);
    });

    setComputedProps(result);
  }, [bpList, isMounted, memorized]);

  useEffect(() => {
    // callback required to be executed on mount, since window size will not be triggered.
    onBreakpointChange();

    bpList.forEach((bp) => {
      bp.mq.addEventListener("change", bp.onChange);
    });

    return (): void => {
      bpList.forEach((bp) => {
        bp.mq.removeEventListener("change", bp.onChange);
      });
    };
  }, [bpList, onBreakpointChange]);

  return computedProps;
}
