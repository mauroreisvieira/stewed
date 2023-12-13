import React, { forwardRef } from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Specifies the visual style of the switch.
   * @default primary
   */
  skin?: "primary" | "error";
  /**
   * Specifies the size of the switch.
   * @default md
   */
  size?: "sm" | "md" | "lg";
  /** Content to be rendered within the switch, usually used for labels. */
  children?: React.ReactNode;
}

/**
 * This component displays an switch component.
 * Switch component communicate an action a user can take.
 *
 * @example
 * ```tsx
 * <Switch skin="secondary">Label</Switch>
 * ```
 *
 * @remarks This component props extended from React.InputHTMLAttributes<HTMLInputElement>.
 *
 * @param {SwitchProps} props - The props for the Switch component.
 * @returns {React.ReactElement} - The rendered Switch component.
 */
export const Switch = forwardRef(function UnwrappedSwitch(
  { skin = "primary", size = "md", className, disabled, children, ...otherProps }: SwitchProps,
  ref: React.Ref<HTMLInputElement>,
): React.ReactElement {
  const rootClassName = "switch";
  const cssClasses = {
    root: classNames(
      styles[rootClassName],
      disabled && styles[`${rootClassName}--disabled`],
      styles[`${rootClassName}--${size}`],
      styles[`${rootClassName}--${skin}`],
      className,
    ),
    input: styles[`${rootClassName}__input`],
    control: styles[`${rootClassName}__control`],
    text: styles[`${rootClassName}__text`],
  };

  return (
    <label className={cssClasses.root}>
      <input
        ref={ref}
        type="checkbox"
        disabled={disabled}
        className={cssClasses.input}
        {...otherProps}
      />
      <span className={cssClasses.control} />
      {children && <span className={cssClasses.text}>{children}</span>}
    </label>
  );
});