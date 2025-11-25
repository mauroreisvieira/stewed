import React, { useState, useEffect, useRef, useCallback } from "react";

export interface CollapseProps {
  /** Controls whether the collapse is open or closed */
  isOpened: boolean;
  /** Additional class names for styling */
  className?: string;
  /**
   * Duration of the collapse transition in milliseconds
   * @default 400ms
   */
  transitionDuration?: number;
  /** Id applied to `data-testid` attribute, used to identify a DOM node for testing purposes. */
  testId?: string;
  /** Callback triggered when the collapse starts expanding */
  onExpand?: () => void;
  /**
   * Callback triggered when the expand animation finishes
   *
   * @remarks
   * If `transitionDuration` is set to `0`, the callbacks `onExpandEnd`  will **never** be executed.
   */
  onExpandEnd?: () => void;
  /** Callback triggered when the collapse starts collapsing */
  onCollapse?: () => void;
  /**
   * Callback triggered when the collapse animation finishes
   *
   * @remarks
   * If `transitionDuration` is set to `0`, the callbacks `onCollapseEnd`  will **never** be executed.
   */
  onCollapseEnd?: () => void;
  /** Child elements to render inside the collapse */
  children: React.ReactNode;
}

/**
 * Collapse component that animates the opening and closing of its content.
 * It adjusts the height of the content, allowing it to expand and collapse smoothly.
 *
 * @param props - The props for configuring the Collapse component.
 * @returns A `React.ReactElement` representing the collapse component.
 */
export function Collapse({
  isOpened = false,
  className,
  transitionDuration = 400,
  testId,
  onExpand,
  onExpandEnd,
  onCollapse,
  onCollapseEnd,
  children
}: CollapseProps): React.ReactElement {
  // Reference to the content element that will be collapsed or expanded
  const contentRef = useRef<HTMLDivElement>(null);

  // A flag to track if the component is mounting for the first time
  const isMounted = useRef(false);

  // State to manage inline styles, particularly height and overflow, for the collapse animation
  const [inlineStyle, setInlineStyle] = useState<React.CSSProperties>({});

  /**
   * Updates the inline styles for height and overflow based on the given height.
   * If height is undefined, styles are reset to allow natural height.
   *
   * @param {number | undefined} height - The height to apply or undefined to reset styles.
   */
  const updateInlineStyle = useCallback(
    (height: number | undefined) => {
      setInlineStyle(
        height === undefined
          ? {}
          : {
              height: height,
              overflow: "hidden",
              transition: `height ${transitionDuration}ms ease`
            }
      );
    },
    [transitionDuration]
  );

  /**
   * Handles the transition end event to reset styles after the animation completes.
   * This also triggers the appropriate callbacks when expansion or collapse finishes.
   */
  const onHandleTransitionEnd = () => {
    if (!contentRef.current) {
      return;
    }

    if (isOpened) {
      // Expand finished, remove inline styles for natural height.
      updateInlineStyle(undefined);

      // Call the onExpandEnd callback
      onExpandEnd?.();
    } else {
      // Collapse finished, execute collapse callback.
      onCollapseEnd?.();
    }

    // Cleanup overflow style to allow natural flow.
    contentRef.current.style.removeProperty("overflow");
  };

  useEffect(() => {
    // If the content reference is not yet attached to the DOM, exit early
    if (!contentRef.current) {
      return;
    }

    // Set the overflow to "hidden" to prevent content from overflowing during transition
    contentRef.current.style.overflow = "hidden";

    // Get the natural scroll height of the content, which is the height the element will expand to
    const { scrollHeight } = contentRef.current;

    // If it's the initial mount, handle it differently to avoid animation on first render
    if (!isMounted.current) {
      // On initial mount, set the state instantly based on isOpened without animation
      updateInlineStyle(isOpened ? undefined : 0);

      // Mark initial mount as complete
      isMounted.current = true;

      // Cleanup overflow style to allow natural flow.
      contentRef.current.style.removeProperty("overflow");

      return;
    }

    if (isOpened) {
      // Trigger onExpand callback when expanding
      onExpand?.();

      // Animate the opening: set height to 0, then to scrollHeight
      updateInlineStyle(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Expand to full height
          updateInlineStyle(scrollHeight);
        });
      });
    } else {
      // Trigger onCollapse callback when collapsing
      onCollapse?.();

      // Animate the closing: set height to scrollHeight, then collapse to 0
      updateInlineStyle(scrollHeight);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Collapse to height 0
          updateInlineStyle(0);
        });
      });
    }
  }, [isOpened, onCollapse, onExpand, updateInlineStyle]);

  return (
    <div
      className={className}
      style={inlineStyle}
      onTransitionEnd={onHandleTransitionEnd}
      aria-expanded={isOpened}
      aria-hidden={!isOpened}
      data-testid={testId}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
