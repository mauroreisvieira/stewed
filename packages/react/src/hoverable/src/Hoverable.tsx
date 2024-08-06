import React, { useState } from "react";

export interface HoverableProps {
  /** Additional class name(s) for the element. */
  className?: string;
  /**
   * A function that takes an object with the `isHovering` boolean property and returns a React node.
   * The `isHovering` property indicates whether the hover state is active or not.
   *
   * @param isHovering - A boolean indicating the current hover state.
   * @returns {React.ReactNode} - The React node to render.
   */
  children: ({ isHovering }: { isHovering: boolean }) => React.ReactNode;
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
export function Hoverable({ className, children }: HoverableProps): React.ReactElement {
  // State to track whether the component is being hovered over.
  const [isHovering, setHovering] = useState(false);

  // Event handler for when the mouse or touch starts hovering over the component.
  const onHandleHover = () => setHovering(true);

  // Event handler for when the mouse or touch stops hovering over the component.
  const onHandleLeave = () => setHovering(false);

  return (
    <div
      className={className}
      onMouseEnter={onHandleHover}
      onMouseLeave={onHandleLeave}
      onTouchStart={onHandleHover}
      onTouchEnd={onHandleLeave}
      onTouchCancel={onHandleLeave}>
      {children({ isHovering })}
    </div>
  );
}
