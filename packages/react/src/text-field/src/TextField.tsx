import React, { forwardRef } from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface TextField extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Change the visual style of the input.
   * @default default
   */
  skin?: "default" | "success" | "critical";
  /** Slot to display before the input value. */
  leftSlot?: React.ReactNode;
  /** Slot to display after the input value. */
  rightSlot?: React.ReactNode;
}

export const TextField = forwardRef(
  (
    { skin = "default", className, disabled, leftSlot, rightSlot, ...props }: TextField,
    ref: React.Ref<HTMLInputElement>,
  ): React.ReactElement => {
    // Importing useBem to handle BEM class names
    const { getBlock, getElement } = useBem({ block: components.TextField, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [disabled && "disabled", skin !== "default" && skin],
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
