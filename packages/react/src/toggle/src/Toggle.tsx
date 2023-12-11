import React from "react";
// Compound Component
import { ToggleGroup } from "./ToggleGroup";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Changes the size of the toggle, giving it more or less padding.
   * @default md
   */
  size?: "md" | "lg";
  /** Indicates whether the toggle is selected. */
  selected?: boolean;
  /** Allows the button to grow to the width of its container. */
  fullWidth?: boolean;
  /** The content to display inside the toggle. */
  children?: React.ReactNode;
}

/**
 * This component displays a toggle button that allows users to switch between
 * different states with customizable sizes.
 *
 * @example
 * ```tsx
 * <Toggle size="sm" onClick={() => console.log("Toggled!")}>
 *   Click me
 * </Toggle>
 * ```
 *
 * @param {ToggleProps} props - The props for the Toggle component.
 * @returns {React.ReactElement} - The rendered Toggle component.
 */
export function Toggle({
  size = "md",
  fullWidth,
  className,
  selected,
  disabled,
  children,
  ...props
}: ToggleProps): React.ReactElement {
  // Root class name for styling
  const rootName = "toggle";

  // CSS classes based on component props and styles
  const cssClasses = {
    root: classNames(
      styles[rootName],
      styles[`${rootName}--${size}`],
            fullWidth && styles[`${rootName}--fullWidth`],
      selected && styles[`${rootName}--selected`],
      disabled && styles[`${rootName}--disabled`],
      className,
    ),
  };

  return (
    <button disabled={disabled} className={cssClasses.root} {...props}>
      {children}
    </button>
  );
}

// Compound component composition
Toggle.Group = ToggleGroup;
