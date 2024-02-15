import React, { forwardRef } from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { type Color, components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Change the visual style of the input.
   * @default default
   */
  skin?: "default" | Extract<Color, "critical" | "success">;
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
 * <TextField name="username" value="mauroreisvieira" />
 * ```
 *
 * @param {TextFieldProps} props - The props for the TextField component.
 * @returns {React.ReactElement} - The rendered TextField component.
 */
export const TextField = forwardRef(
  (
    { skin = "default", className, disabled, leftSlot, rightSlot, ...props }: TextFieldProps,
    ref: React.Ref<HTMLInputElement>,
  ): React.ReactElement => {
    // Importing useBem to handle BEM class names
    const { getBlock, getElement } = useBem({ block: components.TextField, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [disabled && "disabled", skin],
        extraClasses: className,
      }),
      input: getElement(["input"]),
      left: getElement(["left"]),
      right: getElement(["right"]),
    };

    return (
      <div className={cssClasses.root}>
        {leftSlot && <span className={cssClasses.left}>{leftSlot}</span>}
        <input ref={ref} className={cssClasses.input} disabled={disabled} {...props} />
        {rightSlot && <span className={cssClasses.right}>{rightSlot}</span>}
      </div>
    );
  },
);
