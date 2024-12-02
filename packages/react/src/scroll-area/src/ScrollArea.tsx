import React, { useCallback, useEffect, useRef, useState } from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface ScrollAreaProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Whether the scroll area should have an inset shadow.
   * This shadow will appear when the content is overflowing, providing a visual cue for scrollable content.
   *
   * @default true
   */
  insetShadow?: boolean;
}

/**
 * ScrollArea component provides a container with scrollable content.
 *
 * @remarks This component props extended from React.ComponentPropsWithoutRef<"div">.
 *
 * @param {ScrollAreaProps} props - The props for the ScrollArea component.
 * @returns {React.ReactElement} The rendered scrollable area component.
 */
export function ScrollArea({
  insetShadow = true,
  className,
  children,
  ...props
}: ScrollAreaProps): React.ReactElement {
  // Ref for the scroll container to track scroll position
  const scrollRef = useRef<HTMLDivElement>(null);

  // States to control visibility of the top and bottom shadows
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.ScrollArea, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [
        insetShadow && showTopShadow && !showBottomShadow && "top-shadow",
        insetShadow && showBottomShadow && !showTopShadow && "bottom-shadow",
        insetShadow && showTopShadow && showBottomShadow && "both-shadow",
      ],
      extraClasses: className,
    }),
  };

  // Function to handle scroll and update shadow visibility
  const onChangeShadowVisibility = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    // Check if content is overflowing
    const isOverflowing = scrollHeight > clientHeight;

    // Allow a small tolerance of 1px when checking for bottom shadow visibility
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // Set top shadow visibility based on scroll position
    setShowTopShadow(isOverflowing && scrollTop > 0);
    setShowBottomShadow(isOverflowing && !isAtBottom);
  }, []);

  // Adding scroll and resize event listeners on mount
  useEffect(() => {
    const element = scrollRef.current;

    if (!element) return;

    // Create a new AbortController to manage aborting ongoing operations if needed.
    const controller = new AbortController();

    // Add the scroll event listener
    element.addEventListener("scroll", onChangeShadowVisibility, { signal: controller.signal });

    // Create and observe the ResizeObserver for content changes
    const resizeObserver = new ResizeObserver(onChangeShadowVisibility);
    resizeObserver.observe(element);

    return () => {
      controller.abort();
      resizeObserver.disconnect();
    };
  }, [onChangeShadowVisibility]);

  return (
    <div ref={scrollRef} className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}
