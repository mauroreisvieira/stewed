import React, { forwardRef } from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Change the visual style of the input. */
  skin?: "default" | "error" | "success";
  /** Slot to display before the input value. */
  leftSlot?: React.ReactNode;
  /** Slot to display after the input value. */
  rightSlot?: React.ReactNode;
}

export const Input = forwardRef(
  (
    { skin, className, disabled, leftSlot, rightSlot, ...otherProps }: InputProps,
    ref: React.Ref<HTMLInputElement>,
  ): React.ReactElement => {
    const rootClassName = "input";
    const cssClasses = {
      root: classNames(
        styles[rootClassName],
        disabled && `${styles[rootClassName]}--disabled`,
        skin !== "default" && styles[`${rootClassName}--${skin}`],
        className,
      ),
      input: classNames(styles[`${rootClassName}__input`]),
      left: classNames(styles[`${rootClassName}__left`]),
      right: classNames(styles[`${rootClassName}__right`]),
    };

    return (
      <div className={cssClasses.root}>
        {leftSlot && <span className={cssClasses.left}>{leftSlot}</span>}
        <input ref={ref} className={cssClasses.input} disabled={disabled} {...otherProps} />
        {rightSlot && <span className={cssClasses.right}>{rightSlot}</span>}
      </div>
    );
  },
);
