import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components, Duration, Timing } from "@stewed/tokens";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

type TAnimation =
  | "zoom-in"
  | "zoom-out"
  | "zoom-in-soft"
  | "zoom-out-soft"
  | "fade-in"
  | "fade-out"
  | "slide-in-top"
  | "slide-in-right"
  | "slide-in-bottom"
  | "slide-in-left"
  | "slide-out-top"
  | "slide-out-right"
  | "slide-out-bottom"
  | "slide-out-left";

interface ChildProps {
  /** Additional class name(s) to apply to the child element. */
  className?: string;
  /** Callback triggered when a CSS transition on the element ends. */
  onTransitionEnd?: () => void;
  /** Callback triggered when a CSS animation on the element ends. */
  onAnimationEnd?: () => void;
}

export interface MotionProps {
  /** The animation type. */
  animation?: TAnimation;
  /**
   * The duration of the animation.
   * @default quickly
   */
  duration?: Duration;
  /**
   * The timing function for the animation. Defines the speed curve of the animation.
   * @default ease-in
   */
  timing?: Timing;
  /** Callback function that is called when the animation completes. */
  onDone?: () => void;
  /** The child element to which the animation will be applied. */
  children: React.ReactElement;
}

/**
 * Component that provides animation capabilities to its child element.
 * It allows configuration of animation duration, timing function, and type, as well as handling completion via a callback function.
 *
 * @example
 * ```tsx
 * <Motion animation="slide-in-right">
 *   <div />
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
  children
}: MotionProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Motion, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [animation, timing, duration] })
  };

  // Cloning the child element to inject className and onTransitionEnd and onAnimationEnd
  if (React.isValidElement<ChildProps>(children)) {
    return React.cloneElement(children, {
      className: classNames(cssClasses.root, children.props.className),
      onTransitionEnd: () => {
        children.props.onTransitionEnd?.();
        onDone?.();
      },
      onAnimationEnd: () => {
        children.props.onAnimationEnd?.();
        onDone?.();
      }
    });
  }

  // If `children` is not a valid React element, handle it appropriately
  return children;
}
