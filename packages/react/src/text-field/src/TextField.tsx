import React, { forwardRef } from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface TextField extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Change the visual style of the input. */
  skin?: "default" | "error" | "success";
  /** Slot to display before the input value. */
  leftSlot?: React.ReactNode;
  /** Slot to display after the input value. */
  rightSlot?: React.ReactNode;
}

export const TextField = forwardRef(
  (
    { skin, className, disabled, leftSlot, rightSlot, ...props }: TextField,
    ref: React.Ref<HTMLInputElement>,
  ): React.ReactElement => {
    const rootName = "text-field";
    const cssClasses = {
      root: classNames(
        styles[rootName],
        disabled && styles[`${rootName}--disabled`],
        skin !== "default" && styles[`${rootName}--${skin}`],
        className,
      ),
      input: classNames(styles[`${rootName}__input`]),
      left: classNames(styles[`${rootName}__left`]),
      right: classNames(styles[`${rootName}__right`]),
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
