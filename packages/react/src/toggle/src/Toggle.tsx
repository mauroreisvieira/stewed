import React from "react";
// Compound Component
import { ToggleGroup } from "./ToggleGroup";
// Hooks
import { useBem } from "../../../../hooks/index";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Changes the size of the toggle, giving it more or less padding.
   * @default md
   */
  size?: "sm" | "md" | "lg";
  /**
   * Indicates whether the toggle is selected.
   * @default false
   */
  selected?: boolean;
  /** Slot for icon to display before the toggle text. */
  leftSlot?: React.ReactNode;
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
  className,
  selected = false,
  disabled,
  children,
  leftSlot,
  ...props
}: ToggleProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Toggle, styles });

  // Generating CSS classes based on component props and styles

  // CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [size, selected && "selected", disabled && "disabled"],
      extraClasses: className,
    }),
    left: getElement(["left"]),
    text: getElement(["text"]),
  };

  return (
    <button disabled={disabled} className={cssClasses.root} {...props}>
      {leftSlot && <span className={cssClasses.left}>{leftSlot}</span>}
      {children && <span className={cssClasses.text}>{children}</span>}
    </button>
  );
}

// Compound component composition
Toggle.Group = ToggleGroup;
