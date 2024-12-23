import React, { useCallback, useMemo, useState } from "react";
// Utilities
import { isTouch } from "@stewed/utilities";

export interface HoverableProps extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  /**
   * Enables hover state handling for touch devices.
   * If set to `true`, touch events will be used to simulate hover behavior.
   * @default true
   */
  enabledTouch?: boolean;
  /**
   * A function that returns a React node based on the hover state and device type.
   *
   * The function takes an object with two properties:
   * - `isHovering` (boolean): Indicates whether the hover state is currently active.
   * - `isTouch` (boolean): Indicates whether the device is a touch device.
   *
   * @param {Object} props - The parameters object.
   * @param {boolean} props.isHovering - A boolean indicating if the hover state is active.
   * @param {boolean} props.isTouch - A boolean indicating if the device is a touch device.
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
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  ...props
}: HoverableProps): React.ReactElement {
  // State to track whether the component is being hovered over.
  const [isHovering, setHovering] = useState(false);

  // Event handler for when the mouse or touch starts hovering over the component.
  const onHandleMouseEnter: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      setHovering(true);
      onMouseEnter?.(event);
    },
    [onMouseEnter]
  );

  // Event handler for when the mouse stops hovering over the component.
  const onHandleMouseLeave: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      setHovering(false);
      onMouseLeave?.(event);
    },
    [onMouseLeave]
  );

  // Event handler for when the mouse starts hovering over the component.
  const onHandleTouchStart: React.TouchEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      setHovering(true);
      onTouchStart?.(event);
    },
    [onTouchStart]
  );

  // Event handler for when the touch stops over the component.
  const onHandleTouchEnd: React.TouchEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      setHovering(false);
      onTouchEnd?.(event);
    },
    [onTouchEnd]
  );

  // Event handler for when the touch cancel over the component.
  const onHandleTouchCancel: React.TouchEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      setHovering(false);
      onTouchCancel?.(event);
    },
    [onTouchCancel]
  );

  // Check if the current device is touch.
  const touchDevice = useMemo(() => isTouch(), []);

  return (
    <div
      className={className}
      onMouseEnter={onHandleMouseEnter}
      onMouseLeave={onHandleMouseLeave}
      onTouchStart={enabledTouch ? onHandleTouchStart : undefined}
      onTouchEnd={enabledTouch ? onHandleTouchEnd : undefined}
      onTouchCancel={enabledTouch ? onHandleTouchCancel : undefined}
      {...props}
    >
      {children({ isHovering, isTouch: touchDevice })}
    </div>
  );
}
