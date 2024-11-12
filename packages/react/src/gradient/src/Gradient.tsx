import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components, type Palette } from "@stewed/tokens";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface GradientProps {
  /** The starting color of the gradient, defined by a palette. */
  from?: Palette;
  /** The ending color of the gradient, defined by a palette. */
  to?: Palette;
  /**
   * If true, applies the gradient as a clipped background to the text within the component.
   * @default false
   */
  clipText?: boolean;
  /** The child element to which the gradient effect or animation will be applied. */
  children: React.ReactElement;
}

/**
 * A React component that manages the color stops in background gradients for its children.
 * It allows you to define and control the gradient transitions, providing flexible styling for backgrounds within your components.
 *
 * @example
 * ```tsx
 * <Gradient from="red-700" to="red-100">
 *   <div />
 * </Gradient>
 * ```
 *
 * @param {GradientProps} props - The props for the Gradient component.
 * @returns {React.ReactElement} - The rendered Gradient component.
 */
export function Gradient({ from, to, clipText, children }: GradientProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Gradient, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [from && `from-${from}`, to && `to-${to}`, clipText && "clip-text"],
    }),
  };

  // Cloning the child element to inject `className`
  return React.cloneElement(children, {
    className: classNames(children.props.className, cssClasses.root),
  });
}
