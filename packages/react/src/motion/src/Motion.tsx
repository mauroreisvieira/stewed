import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components, Duration, Timing } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";
import { classNames } from "@stewed/utilities";

const animations = {
  zoom: ["zoom-in", "zoom-out", "zoom-in-soft", "zoom-out-soft"],
  fade: ["fade-in", "fade-out"],
  slide: [
    "slide-in-top",
    "slide-in-right",
    "slide-in-bottom",
    "slide-in-left",
    "slide-out-top",
    "slide-out-right",
    "slide-out-bottom",
    "slide-out-left",
  ],
} as const;

// Combine all animation types into a single union type
type TAnimation = (typeof animations)[keyof typeof animations][number];

export interface MotionProps {
  duration?: Duration;
  timing?: Timing;
  animation?: TAnimation;
  onDone?: () => void;
  children: React.ReactElement;
}

/**
 * A React component that applies motion/animation effects to its children.
 *
 * @example
 * ```tsx
 * <Motion animation="slide-in-right">
 *   <img src="your-image.jpg" alt="Your Image" />
 * </Motion>
 * ```
 *
 * @param {MotionProps} props - The props for the Motion component.
 * @returns {React.ReactElement} - The rendered Motion component.
 */
export function Motion({
  animation,
  timing = "ease-in",
  duration = "quickly",
  onDone,
  children,
}: MotionProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Motion, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [animation, timing, duration] }),
  };

  // Cloning the child element to inject className and onTransitionEnd and onAnimationEnd
  return React.cloneElement(children, {
    className: classNames(children.props.className, cssClasses.root),
    onTransitionEnd: () => {
      children?.props?.onTransitionEnd?.();
      onDone?.();
    },
    onAnimationEnd: () => {
      children?.props?.onAnimationEnd?.();
      onDone?.();
    },
  });
}
