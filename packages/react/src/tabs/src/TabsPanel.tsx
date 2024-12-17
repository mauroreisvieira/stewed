import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { flushSync } from "react-dom";
// Context
import { useTabs } from "./TabsContext";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Utilities
import { isClient } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface TabsPanelProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Sets or retrieves the value of a tab panel. */
  value: string;
}

/**
 * TabsPanel component - Renders a single tab panel with support for conditional rendering.
 *
 * @param props - The properties to configure the TabsPanel.
 * @returns The rendered tab panel or `null` if not visible and unmounted.
 */
export function TabsPanel({
  value,
  className,
  children,
  ...props
}: TabsPanelProps): React.ReactElement {
  // Get tab context value and functions.
  const {
    value: selectedValue,
    setSelectedValue,
    onValueChange,
    hiddenUntilFound,
    keepMounted
  } = useTabs();

  // Check if the "beforematch" event is supported in the current browser.
  // The "beforematch" event is used in conjunction with the `hidden="until-found"` attribute.
  // It ensures compatibility with client-side rendering.
  const supportsBeforeMatch = isClient() && "onbeforematch" in document.body;

  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Tabs}__panel`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      extraClasses: className
    })
  };
  // Ref to store the pending requestAnimationFrame (RAF) ID
  const raf = useRef<number | null>(null);

  // Ref to the DOM element where the hidden attribute will be toggled
  const ref = useRef<HTMLDivElement>(null);

  // Callback to handle the "beforematch" event.
  // Ensures that the browser's removal of the "hidden" attribute is reverted and the application state is updated synchronously.
  const onHandleBeforeMatch = useCallback(() => {
    // Wait one animation frame to reapply the "hidden" attribute
    raf.current = requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.setAttribute("hidden", "until-found");
      }
    });

    // Synchronize state updates
    flushSync(() => {
      onValueChange?.(value);
      setSelectedValue?.(value);
    });
  }, [setSelectedValue, onValueChange, value]);

  useEffect(() => {
    if (!ref.current || !hiddenUntilFound || !supportsBeforeMatch) return;

    // Ensures it can be safely aborted using AbortController if the component unmounts.
    const controller = new AbortController();

    // Attach the "beforematch" event listener
    ref.current.addEventListener("beforematch", onHandleBeforeMatch, {
      signal: controller.signal
    });

    // Cleanup the event listener when unmounting
    return () => controller.abort();
  }, [onHandleBeforeMatch, hiddenUntilFound, supportsBeforeMatch]);

  // Toggles the "hidden" attribute based on the current selected value.
  // This is a temporary workaround until React supports `hidden="until-found"` {@link https://github.com/facebook/react/pull/24741}
  useLayoutEffect(() => {
    if (!ref.current) return;

    // Cancel any pending RAF to avoid stale updates
    if (raf.current) {
      cancelAnimationFrame(raf.current);
    }

    // Conditionally toggle the "hidden" attribute
    if (supportsBeforeMatch && hiddenUntilFound) {
      if (value === selectedValue) {
        ref.current.removeAttribute("hidden");
      } else {
        ref.current.setAttribute("hidden", "until-found");
      }
    }
  }, [selectedValue, value, supportsBeforeMatch, hiddenUntilFound]);

  // Cleanup any pending RAF on component unmount.
  // Prevents memory leaks and ensures no unnecessary frame requests remain.
  useEffect(() => {
    return () => {
      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }
    };
  }, []);

  return hiddenUntilFound || keepMounted || value === selectedValue ? (
    <div
      ref={ref}
      role="tabpanel"
      className={cssClasses.root}
      aria-labelledby={value}
      hidden={hiddenUntilFound ? undefined : value !== selectedValue}
      {...props}
    >
      {children}
    </div>
  ) : (
    <React.Fragment />
  );
}
