import React, { forwardRef } from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Specifies the visual style of the radio.
   * @default primary
   */
  skin?: "primary" | "critical";
  /**
   * Specifies the size of the radio.
   * @default md
   */
  size?: "sm" | "md" | "lg";
  /** Content to be rendered within the radio, usually used for labels. */
  children?: React.ReactNode;
}

/**
 * Radio is a form element used for selecting one option from a list.
 *
 * @example
 * ```tsx
 * <Radio skin="neutral">Label</Radio>
 * ```
 *
 * @remarks This component props extended from React.InputHTMLAttributes<HTMLInputElement>.
 *
 * @param {RadioProps} props - The props for the Radio component.
 * @returns {React.ReactElement} - The rendered Radio component.
 */
export const Radio = forwardRef(
  (
    { skin = "critical", size = "md", className, disabled, children, ...props }: RadioProps,
    ref: React.Ref<HTMLInputElement>,
  ): React.ReactElement => {
    const rootName = "radio";
    const cssClasses = {
      root: classNames(
        styles[rootName],
        disabled && styles[`${rootName}--disabled`],
        styles[`${rootName}--${size}`],
        styles[`${rootName}--${skin}`],
        className,
      ),
      input: styles[`${rootName}__input`],
      control: styles[`${rootName}__control`],
      text: styles[`${rootName}__text`],
    };

    return (
      <label className={cssClasses.root}>
        <input ref={ref} type="radio" disabled={disabled} className={cssClasses.input} {...props} />
        <span className={cssClasses.control} />
        {children && <span className={cssClasses.text}>{children}</span>}
      </label>
    );
  },
);

