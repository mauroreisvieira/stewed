import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { type Color, components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface TextFieldProps extends React.ComponentPropsWithRef<"input"> {
  /**
   * Change the visual appearance of the text field.
   * @default outline
   */
  appearance?: "outline" | "ghost";
  /**
   * Change the visual style of the input.
   * @default default
   */
  skin?: "default" | Extract<Color, "critical" | "success">;
  /** Adjust horizontal alignment of value in input. */
  alignment?: "start" | "center" | "end";
  /** Maximum number of characters allowed in the input. */
  maxChars?: number;
  /** Slot to display before the input value. */
  leftSlot?: React.ReactNode;
  /** Slot to display after the input value. */
  rightSlot?: React.ReactNode;
}

/**
 * A component that renders a text field for entering and editing single-line text.
 *
 * @example
 * ```tsx
 * <TextField name="name" value="Benjamin Martinez" />
 * ```
 *
 * @param {TextFieldProps} props - The props for the TextField component.
 * @returns {React.ReactElement} - The rendered TextField component.
 */
export function TextField({
  appearance = "outline",
  skin = "default",
  alignment,
  maxChars,
  className,
  disabled,
  leftSlot,
  rightSlot,
  ...props
}: TextFieldProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.TextField, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [disabled && "disabled", alignment, appearance, skin],
      extraClasses: className,
    }),
    input: getElement(["input"]),
    left: getElement(["left"]),
    right: getElement(["right"]),
  };

  return (
    <div className={cssClasses.root}>
      {leftSlot && <span className={cssClasses.left}>{leftSlot}</span>}
      <input className={cssClasses.input} size={maxChars} disabled={disabled} {...props} />
      {rightSlot && <span className={cssClasses.right}>{rightSlot}</span>}
    </div>
  );
}
