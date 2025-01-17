import React, { useCallback, useMemo, useState } from "react";
// Utilities
import { isTouch } from "@stewed/utilities";

/**
 * Represents the hover status of the component.
 *
 * - `"enter"`: Indicates the hover state has been activated (e.g., mouse enters the component or touch starts).
 * - `"leave"`: Indicates the hover state has been deactivated (e.g., mouse leaves the component or touch ends).
 * - `undefined`: Represents the default or idle state when there is no active interaction.
 */
export type HoverableStatus = "enter" | "leave" | undefined;

/**
 * Props for the `Hoverable` component, which handles hover interactions for both
 * mouse and touch devices. It provides a callback for rendering children based on
 * the hover status (`"enter"`, `"leave"`, or `undefined`) and device type.
 */
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
   * @param {Object} props - The parameters object.
   * @returns {React.ReactNode} - The React node to render based on the hover state and device type.
   */
  children: ({
    status,
    isHovering,
    isTouch
  }: {
    /** The current hover status. */
    status: HoverableStatus;
    /** A boolean indicating if the hover state is active. */
    isHovering: boolean;
    /** Indicates whether the device is a touch device. */
    isTouch: boolean;
  }) => React.ReactNode;
}

/**
 * Hoverable component provides a simple interface for handling hover transitions.
 * It supports both mouse and touch events to accommodate a wide range of devices.
 *
 * @param props - The props for the `Hoverable` component.
 * @returns The rendered `Hoverable` component.
 *
 * @see {@link HoverableProps} for the complete list of props.
 *
 * @example
 * ```tsx
 * <Hoverable>
 *   {({ status }) => (
 *     <div>{status === "enter" ? "Hovering" : "Not Hovering"}</div>
 *   )}
 * </Hoverable>
 * ```
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
  // State to track the hover status: "enter", "leave", or undefined.
  const [status, setStatus] = useState<HoverableStatus>(undefined);

  // Event handler for when the mouse enters the component.
  const onHandleMouseEnter: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      setStatus("enter");
      onMouseEnter?.(event);
    },
    [onMouseEnter]
  );

  // Event handler for when the mouse leaves the component.
  const onHandleMouseLeave: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      setStatus("leave");
      onMouseLeave?.(event);
    },
    [onMouseLeave]
  );

  // Event handler for when touch starts on the component.
  const onHandleTouchStart: React.TouchEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      setStatus("enter");
      onTouchStart?.(event);
    },
    [onTouchStart]
  );

  // Event handler for when touch ends on the component.
  const onHandleTouchEnd: React.TouchEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      setStatus("leave");
      onTouchEnd?.(event);
    },
    [onTouchEnd]
  );

  // Event handler for when touch is canceled on the component.
  const onHandleTouchCancel: React.TouchEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      setStatus("leave");
      onTouchCancel?.(event);
    },
    [onTouchCancel]
  );

  // Check if the current device is touch-enabled.
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
      {children({ status, isHovering: status === "enter", isTouch: touchDevice })}
    </div>
  );
}
