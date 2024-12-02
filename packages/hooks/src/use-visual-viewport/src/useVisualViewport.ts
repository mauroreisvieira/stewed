import { useEffect, useState } from "react";
// Utilities
import { isIOS } from "@stewed/utilities";

interface UseVisualViewport {
  /** The height of the visual viewport. */
  height: number;
  /** The horizontal offset from the left of the viewport. */
  offsetLeft: number;
  /** The vertical offset from the top of the viewport. */
  offsetTop: number;
  /** The horizontal position of the viewport in relation to the page. */
  pageLeft: number;
  /** The vertical position of the viewport in relation to the page. */
  pageTop: number;
  /** The scale factor of the visual viewport. */
  scale: number;
  /** The width of the visual viewport. */
  width: number;
}

// Declare the window object to include the visualViewport property.
declare const window: Window & {
  visualViewport: VisualViewport;
};

interface UseVisualViewportProps {
  /**  Flag to enable or disable the visual viewport tracking. */
  enabled: boolean;
}

/**
 * Custom hook to track the visual viewport properties.
 *
 * @param props - The properties for the hook.
 * @param props.enabled - A flag indicating if the viewport tracking is enabled.
 * @returns An object with the current visual viewport dimensions and position, or undefined if not enabled.
 */
export const useVisualViewport = ({
  enabled,
}: UseVisualViewportProps): UseVisualViewport | undefined => {
  // State to hold the current viewport value.
  const [value, setValue] = useState<UseVisualViewport>();

  useEffect(() => {
    // Exit early if not enabled or if the device is not iOS.
    if (!enabled || !isIOS()) return;

    // Create a new AbortController to manage aborting ongoing operations if needed.
    const controller = new AbortController();

    // Access the visualViewport from the window object.
    const { visualViewport } = window;

    // Event handler for resizing the visual viewport.
    const handleResize = (): void => {
      const { height, offsetLeft, offsetTop, pageLeft, pageTop, scale, width } = visualViewport;

      // Update state with the current viewport values.
      setValue({
        offsetLeft,
        offsetTop,
        pageLeft,
        pageTop,
        scale,
        width,
        height,
      });
    };

    // Attach the resize event listener to the visual viewport.
    visualViewport.addEventListener("resize", handleResize, { signal: controller.signal });

    // Cleanup function to remove the event listener on component unmount.
    return () => {
      controller.abort();
    };
  }, [enabled]);

  // Return the current viewport value.
  return value;
};
