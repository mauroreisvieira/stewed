import React, { forwardRef } from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  skin?: "primary" | "error";
  size?: "sm" | "md" | "lg";
}

export const Checkbox = forwardRef(
  (
    { skin = "primary", size = "md", className, disabled, ...otherProps }: CheckboxProps,
    ref: React.Ref<HTMLInputElement>,
  ): React.ReactElement => {
    const rootClassName = "checkbox";
    const cssClasses = {
      root: classNames(
        styles[rootClassName],
        disabled && styles[`${rootClassName}--disabled`],
        styles[`${rootClassName}--${size}`],
        styles[`${rootClassName}--${skin}`],
        className,
      ),
      control: styles[`${rootClassName}__control`],
      svg: styles[`${rootClassName}__svg`],
      background: styles[`${rootClassName}__background`],
    };

    return (
      <div className={cssClasses.root}>
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          className={cssClasses.control}
          {...otherProps}
        />
        <span className={cssClasses.background}>
          <svg className={cssClasses.svg} viewBox="0 0 20 20" focusable="false" aria-hidden="true">
            <path d="M14.723 6.237a.94.94 0 0 1 .053 1.277l-5.366 6.193a.834.834 0 0 1-.611.293.83.83 0 0 1-.622-.264l-2.927-3.097a.94.94 0 0 1 0-1.278.82.82 0 0 1 1.207 0l2.297 2.43 4.763-5.498a.821.821 0 0 1 1.206-.056Z" />
          </svg>
        </span>
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";