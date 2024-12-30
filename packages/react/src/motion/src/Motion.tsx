import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components, Duration, Timing } from "@stewed/tokens";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

/** Represents the animation options or states for a component or application. */
type TAnimation =
  | "scale-in"
  | "scale-out"
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

/** Interface representing the props for a child component. */
interface ChildProps {
  /** Additional class name(s) to apply to the child element. */
  className?: string;
  /** Callback triggered when a CSS transition on the element ends. */
  onTransitionEnd?: () => void;
  /** Callback triggered when a CSS animation on the element ends. */
  onAnimationEnd?: () => void;
}

/**
 * Represents the properties for motion or animation settings in a component.
 * Use this interface to configure animations, transitions, and motion effects.
 */
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
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   * @default false
   */
  asChild?: boolean;
  /** The child element to which the animation will be applied. */
  children?: React.ReactNode | ((props: ChildProps) => React.ReactElement);
}

/**
 * Component that provides animation capabilities to its child element.
 * It allows configuration of animation duration, timing function, and type, as well as handling completion via a callback function.
 *
 * @example
 * ```tsx
 * <Motion animation="slide-in-right" asChild>
 *   <div />
 * </Motion>
 * ```
 *
 * @see {@link MotionProps} for more details on the available props.
 *
 * @param props - The props for the Motion component.
 * @returns The rendered Motion component.
 */
export function Motion({
  animation,
  timing = "ease-in",
  duration = "quickly",
  onDone,
  asChild = false,
  children
}: MotionProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Motion, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [animation, timing, duration] })
  };

  const props: ChildProps = {
    className: cssClasses.root,
    /** Callback function executed when the transition ends. */
    onTransitionEnd: (): void => {
      onDone?.();
    },
    /** Callback function executed when the animation ends. */
    onAnimationEnd: (): void => {
      onDone?.();
    }
  };

  if (typeof children === "function") {
    return children(props);
  }

  // Cloning the child element to inject className and onTransitionEnd and onAnimationEnd
  if (asChild && React.isValidElement<ChildProps>(children)) {
    return React.cloneElement(children, {
      className: classNames(props.className, children.props.className),
      /** Callback function executed when the transition ends. */
      onTransitionEnd: (): void => {
        children.props.onTransitionEnd?.();
        props.onTransitionEnd?.();
      },
      /** Callback function executed when the animation ends. */
      onAnimationEnd: (): void => {
        children.props.onAnimationEnd?.();
        props.onAnimationEnd?.();
      }
    });
  }

  return <div {...props}>{children}</div>;
}
