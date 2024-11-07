import React, { useMemo, useState } from "react";
// Utilities
import { isTouch } from "@stewed/utilities";

export interface HoverableProps {
  /**
   * Enables hover state handling for touch devices.
   * If set to `true`, touch events will be used to simulate hover behavior.
   * @default true
   */
  enabledTouch?: boolean;
  /** Additional class name(s) for the element. */
  className?: string;
  /**
   * A function that returns a React node based on the hover state and device type.
   *
   * The function takes an object with two properties:
   * - `isHovering` (boolean): Indicates whether the hover state is currently active.
   * - `isTouch` (boolean): Indicates whether the device is a touch device.
   *
   * @param {Object} params - The parameters object.
   * @param {boolean} params.isHovering - A boolean indicating if the hover state is active.
   * @param {boolean} params.isTouch - A boolean indicating if the device is a touch device.
   * @returns {React.ReactNode} - The React node to render based on the hover state and device type.
   */
  children: ({ isHovering, isTouch }: { isHovering: boolean; isTouch: boolean }) => React.ReactNode;
}

/**
 * Hoverable component provides a simple interface for handling hover states for any component.
 * It supports both mouse and touch events to accommodate a wide range of devices.
 *
 * @example
 * ```tsx
 * <Hoverable>
 *   {({ isHovering }) => (
 *     <div>{isHovering ? "Hovering" : "Not Hovering"}</div>
 *   )}
 * </Hoverable>
 * ```
 *
 * @param {HoverableProps} props - The props for the `Hoverable` component.
 * @returns {React.ReactElement} - The rendered `Hoverable` component.
 */
export function Hoverable({
  enabledTouch = true,
  className,
  children,
}: HoverableProps): React.ReactElement {
  // State to track whether the component is being hovered over.
  const [isHovering, setHovering] = useState(false);

  // Event handler for when the mouse or touch starts hovering over the component.
  const onHandleHover = () => setHovering(true);

  // Event handler for when the mouse or touch stops hovering over the component.
  const onHandleLeave = () => setHovering(false);

  // Check if the current device is touch.
  const touchDevice = useMemo(() => isTouch(), []);

  return (
    <div
      className={className}
      onMouseEnter={onHandleHover}
      onMouseLeave={onHandleLeave}
      onTouchStart={enabledTouch ? onHandleHover : undefined}
      onTouchEnd={enabledTouch ? onHandleLeave : undefined}
      onTouchCancel={enabledTouch ? onHandleLeave : undefined}
    >
      {children({ isHovering, isTouch: touchDevice })}
    </div>
  );
}
